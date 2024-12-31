import plugin from '../../lib/plugins/plugin.js';
import axios from 'axios';

/*
* @Tip: 传播该插件时还请保留作者信息
* @Author: Pimeng
* @Time: 2024-12-31 14：00
* @LICENSE: GPL-3.0
* @ContactMe: QQ1470458485 Or pimeng@pimeng.icu
*/

function checkServerStatus(url) {
    return axios.get(url, {
        timeout: 3000,
    }).then(response => {
        if (response.status == 200) {
        return `✅服务器正常运行`;
        } else if (response.status >= 500 && response.status <  600) {
        return `❌️服务器故障（状态码：${response.status}）`;
        }}).catch(error => {
        const errorMessage = error.code === 'ECONNABORTED' || (error.message && error.message.includes('Network Error') && !(error.response && error.response.status))
        ? '请求超时或网络错误，服务器可能无响应。\n可能出现的情况：连接不上联机服务器。'
        : `网络错误：${error.message}`;
        return `⚠️${errorMessage}\n`;
    });
} 

export class CheckPhira extends plugin {
    constructor() {
        super({
            name: '服务器分析',
            dsc: '分析服务器为什么连不上',
            event: 'message',
            priority: 5000,
            rule: [{
                reg: "/phira",
                fnc: 'check'
            }]
        });
    }

    async check(e) {
        e.reply([segment.at(e.user_id), `\n正在查询服务器状态，请稍后...`],true);
        const phiraUrl = 'https://api.phira.cn/chart/';
        const mpUrl = 'http://127.0.0.1:8080/room'; // 这里按照你自己的地址修改哈，实际应该是mp服务器的查房间地址
        const [phiraStatus, mpStatus] = await Promise.all([
            checkServerStatus(phiraUrl),
            checkServerStatus(mpUrl)
        ]);
        var Reply = `\n服务器状态查询结果：\nPhira服务器状态: ${phiraStatus}\n联机服务器状态: ${mpStatus}` + `\n注：以上结果仅供参考，具体还需根据当地情况确认。`;
        await e.reply([segment.at(e.user_id), ` ${Reply}`],true)
    }
}