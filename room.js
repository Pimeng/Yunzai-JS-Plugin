import plugin from '../../lib/plugins/plugin.js';
import fs from 'node:fs';
import path from 'node:path';
import axios from 'axios';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class GetRooms extends plugin {
  constructor() {
    super({
      name: 'GetRooms',
      dsc: '获取房间图片',
      event: 'message',
      priority: 100,
      rule: [
        {
          reg: '^/(room|查房间)',
          fnc: 'QueryRooms'
        }
      ]
    });
  }

  async QueryRooms(e) {
           e.reply("正在查询，请等一下哦！\n//·/w\·\\\\",false,{ recallMsg: 3 })
            try {
                const response = await axios.get('http://127.0.0.1:520/room', { responseType: 'arraybuffer' });
                const statusCode = response.status;

                if (statusCode === 200) {
                    // 保存文件为png格式
                    const filePath = path.join(__dirname, '../../temp/autophira-rooms/temp_room.png');
                    fs.writeFileSync(filePath, response.data);

                    e.reply({
                       type: 'image',
                       file: filePath,
                    });
                } else if (statusCode === 114) {
                    e.reply('现在没有可用的房间哦QwQ');
                } else {
                    e.reply(`服务器返回了未知的状态码：${statusCode}`);
                }
            } catch (error) {
                logger.error('[房间查询]访问服务器时出错：', error);
                e.reply('无法连接至联机服务器，请联系Easy查看日志解决问题。');
            }
    }
}