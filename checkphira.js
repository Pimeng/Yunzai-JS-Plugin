import plugin from '../../lib/plugins/plugin.js';
import axios from 'axios'; // 引入axios库用于发送HTTP请求

// Edit by Pimeng 2024-10-6 01:36
// 使用 WTFPL 开源协议

const phiraUrl = 'https://api.phira.cn/chart/26551';
const mpUrl = 'http://mp.example.com'; // 替换为你的mp服务器

function checkServerStatus(url, isPhira = false) {
    return axios.get(url, {
        timeout: 5000, // 设置超时时间为5秒
    }).then(response => {
        if (response.status >= 200 && response.status < 300) {
            return `✅服务器正常运行`;
        } else if (isPhira && (response.status === 502 || response.status === 500)) {
            return `❌️服务器故障（状态码：${response.status}）`;
        } else if (response.status >= 500 && response.status < 600) {
            return `服务器返回5xx状态码：${response.status}`;
        } else {
            return `服务器返回非2xx/5xx状态码：${response.status}`; // 理论上这里不会被执行到，因为非5xx的非2xx状态码已经在上面的else if中处理了
        }
    }).catch(error => {
        if (error.code === 'ECONNABORTED') {
            return '请求超时，服务器可能无响应';
        } else {
            return `网络错误：${error.message}`;
        }
    });
}

export class example extends plugin {
    constructor() {
        super({
            name: '服务器分析',
            dsc: '分析服务器为什么连不上',
            event: 'message',
            priority: 5000,
            rule: [{
                reg: "#pingphira",
                fnc: 'finder'
            }]
        });
    }

    async finder(e) {
        var replyMsg = '\n正在检查服务器状态，请稍后...';
        e.reply([segment.at(e.user_id), ` ${replyMsg}`]);
        const [phiraStatus, mpStatus] = await Promise.all([
            checkServerStatus(phiraUrl, true),
            checkServerStatus(mpUrl)
        ]);
        let statusMsg = `Phira服务器状态:\n ${phiraStatus}\n联机服务器状态:\n ${mpStatus}`;
        var Reply = '\n服务器状态检查结果：\n' + statusMsg;
        e.reply([segment.at(e.user_id), ` ${Reply}`]);
    }
}