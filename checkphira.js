import plugin from '../../lib/plugins/plugin.js'
import common from "../../lib/common/common.js"

// Last edit by Pimeng 2024-09-28
// 本插件使用 WTFPL 开源许可证

//在这里填写你的mp服务器地址
let mpadd = 'http://example.com:11451</room';

//简单定义一下外部变量
let phira = '未知错误';
let mp = '未知错误';

export class example extends plugin {
    constructor () {
        super({
            name: '分析服务器为什么连不上',
            dsc: '服务器分析',
            event: 'message',
            priority: 5000,
            rule: [{
                    reg: "#pingphira",
                    fnc: 'finder'
                }]
        })
    }

async finder(e) {
    var replyMsg = '\n正在处理哦~\n请稍后（大约5秒后给你回复~）'
    e.reply([segment.at(e.user_id), ` ${replyMsg}`]);

    // 此处为phira服务器的处理fetch
    logger.mark('开始处理Phira服务器返回消息')
    fetch('https://api.phira.cn/chart/26551')  
    .then(response => {  
    if (!response.ok) {  
        throw new Error(response.status);
        phira = response.status;
        logger.error('[Phira服务器]连接出现问题了！错误码：',phira);
    }  
    return response.json();  
    })  
    .then(data => {
        if (data.composer === "wotaku"){
        phira = 'ok';
    } 
        logger.mark('[成功]Phira服务器状态：' + phira);
    })
    .catch(error => {
        console.error(error);
        phira = error;
        logger.error('[出错啦]Phira服务器连接错误：' + phira);
        e.reply('连接到Phira服务器出错啦，错误信息：',response.status);
    });
    
    // 此处为mp服务器的处理fetch
    logger.mark('开始处理Phira-mp服务器返回消息')
    fetch(mpadd)  
    .then(response => {  
    if (!response.ok) {  
        throw new Error(response.status); 
        phira = response.status;
        logger.error('[出错啦]MP服务器连接错误：',response.status);
        e.reply('连接到联机服务器出错啦，错误信息：',response.status);
    }
    return response.json();
    })  
    .then(data => {
        if (data === null || data === undefined) {
        mp = 'Nodata';
    } else {
        mp = 'ok';
    }
        logger.mark('[成功]Phira-mp服务器状态' + mp);
    })
    .catch(error => {
        console.error(error);
        mp = error;
        logger.error('[出错啦]Phira-mp服务器状态：' + mp);
    });
    logger.mark('Phira-mp服务器返回消息处理结束')

    // 开始处理得到的状态信息
    // 定义一个判断当前状态的函数
    function status_judge(){
        // 先又在外面定义变量，不然又tm犯上次的错误了
        let getStatus
        if (phira === 'ok' && mp === 'ok' || phira === 'ok' && mp === 'Nodata'){
            getStatus = '✅️Phira服务器和联机服务器都正常'
        } else if (phira != 'ok'){
            getStatus = '❌️Phira服务器出现问题\n' + phira + '\n请耐心等待服务器恢复'
        } else if (mp != 'ok'){
            getStatus = '❌️联机服务器出现问题\n' + mp + '\n请联系管理员解决'
        }
        var replyMsg = '\n让我看看，目前情况是...\n'+ getStatus
        e.reply([segment.at(e.user_id), ` ${replyMsg}`]);
        }
        await common.sleep(5000); //等待5秒
        status_judge();//运行这个函数
    }
}