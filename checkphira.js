import plugin from '../../lib/plugins/plugin.js';
import axios from 'axios';

/**
 * 检查服务器状态（GET 请求）
 * @param {string} url - 服务器地址
 * @param {string} name - 服务器名称
 */
function checkServerStatus(url, name) {
  const start = Date.now();
  return axios.get(url, { timeout: 3000 })
    .then(response => {
      const delay = Date.now() - start;
      if (response.status === 200) {
        return `✅ ${name} 正常运行 (延迟: ${delay}ms)`;
      } else {
        return `❌ ${name} 异常 (状态码: ${response.status}, 延迟: ${delay}ms)`;
      }
    })
    .catch(error => {
      const delay = Date.now() - start;
      let errorMsg = error.code === 'ECONNABORTED' ? '请求超时' : 
                    (error.message || '网络错误');
      return `❌ ${name} 无法连接: ${errorMsg} (${delay}ms)`;
    });
}

/**
 * 获取房间列表（GET 请求）
 */
async function getRoomList() {
  try {
    const url = 'http://example.com:114514/api/rooms';
    const res = await axios.get(url, { timeout: 5000 });
    const rooms = Array.isArray(res.data) ? res.data : [];
    if (rooms.length === 0) {
      return '当前没有房间。';
    }
    return rooms.map(room => {
      let chartInfo = room.current_chart
        ? `【${room.current_chart.name}】（谱面ID：#${room.current_chart.id}）`
        : '未选择';
      let lockedStr = room.locked ? '已锁定' : '未锁定';
      let playersStr = room.players && room.players.length
        ? `玩家列表：\n${room.players.map(p => `- ${p}`).join('\n')}`
        : '玩家列表：无';
      return `房间编号：${room.id}
玩家数量：${room.player_count}
房间状态：${room.state}
轮换模式：${room.mode}
锁定状态：${lockedStr}
${playersStr}
当前谱面：${chartInfo}`;
    }).join('\n\n'); // 多房间之间空一行
  } catch (err) {
    return `获取房间列表失败：${err.message}`;
  }
}

export class CheckPhira extends plugin {
  constructor() {
    super({
      name: '服务器分析',
      dsc: '分析服务器为什么连不上',
      event: 'message',
      priority: -2147483647,
      rule: [{
        reg: /^(\/|#)phira$/,
        fnc: 'check'
      }]
    });
  }

  async check(e) {
    await e.reply([segment.at(e.user_id), "\n正在查询服务器状态，请稍后..."], true);
    
    const servers = [
      { url: 'https://api.phira.cn/chart/', name: 'Phira 服务器' },
      { url: 'http://example.com:31206/api/rooms', name: '联机服务器' }
    ];
    
    // 检查所有服务器状态（GET 请求）
    const results = await Promise.all(
      servers.map(server => checkServerStatus(server.url, server.name))
    );
    
    // 获取房间列表（GET 请求）
    const roomList = await getRoomList();

    const Reply = `\n服务器状态查询结果：
${results.join('\n')}
当前联机服务器：example.com:114514

房间列表：
${roomList}

注：以上结果仅供参考`;

    await e.reply([segment.at(e.user_id), ` ${Reply}`], true);
  }
}