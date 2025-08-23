import plugin from "../../lib/plugins/plugin.js";
import pinyin from 'pinyin';
import wanakana from 'wanakana';

export class GayIndexCalculator extends plugin {
    constructor() {
        super({
            name: 'Gay指数计算器',
            dsc: '计算名字的Gay指数 - 仅供娱乐',
            event: 'message',
            priority: 500,
            rule: [
                {
                    reg: '^#?gay指数\\s*(.*)$',
                    fnc: 'calculateGayIndex'
                },
                {
                    reg: '^#?gay指数$',
                    fnc: 'calculateGayIndex'
                }
            ]
        });
    }

    async calculateGayIndex(e) {
        // 获取输入的名字
        let inputName = e.msg.replace(/^#?gay指数\s*/, '').trim();
        
        // 如果没有提供名字，提示用户
        if (!inputName) {
            await e.reply('请输入要计算的名字，例如：#gay指数 张三');
            return true;
        }

        // 模拟计算中的提示
        await e.reply('正在计算中，请稍候...',false,{ recallMsg:5 });

        try {
            // 计算Gay指数
            const result = this.calculateGayIndexValue(inputName);
            
            // 构建回复消息
            let replyMsg = `【Gay指数计算结果】\n`;
            replyMsg += `名字: ${inputName}\n`;
            replyMsg += `Gay指数: ${result.percentage}%\n`;
            replyMsg += `评语: ${result.message}\n`;
            replyMsg += `(仅供娱乐，请勿当真)`;

            // 发送结果
            await e.reply(replyMsg,true);
        } catch (error) {
            console.error('计算Gay指数时出错:', error);
            await e.reply('计算失败，请稍后再试');
        }

        return true;
    }

    calculateGayIndexValue(name) {
        // 归一化处理名字
        const normalizedParts = this.normalizeName(name);
        
        // 获取数值
        const numericValues = this.getNumericValues(normalizedParts);
        
        // 矩阵计算
        const percentage = this.matrixCalculation(numericValues, name);
        
        // 获取结果消息
        const message = this.getResultMessage(percentage, name);
        
        return {
            percentage,
            message
        };
    }

    normalizeName(name) {
        let processedName = name.trim().toLowerCase();
        
        // 中文转拼音 - 修复这里的调用方式
        if (/[\u4e00-\u9fa5]/.test(processedName)) {
            // 使用 pinyin 模块的正确调用方式
            const pinyinResult = pinyin.pinyin(processedName, {
            style: pinyin.STYLE_NORMAL
        });
            processedName = pinyinResult.flat().join('');
        } 
        // 日文转罗马字 - 修复这里的调用方式
        else if (wanakana.isJapanese(processedName)) {
            processedName = wanakana.toRomaji(processedName);
        }
        
        const letters = processedName.replace(/[^a-z]/g, '');
        const numbers = processedName.replace(/[^0-9]/g, '');
        const specials = processedName.replace(/[a-z0-9]/g, '');

        return { letters, numbers, specials };
    }

    getNumericValues(normalizedParts) {
        const letterValues = normalizedParts.letters.split('').map(char => char.charCodeAt(0) - 96);
        const numberSum = normalizedParts.numbers.split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
        const specialSum = normalizedParts.specials.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        
        return { letterValues, numberSum, specialSum };
    }

    matrixCalculation(values, originalName) {
        const { letterValues, numberSum, specialSum } = values;
        if (letterValues.length === 0 && numberSum === 0 && specialSum === 0) return 0;

        const letterSum = letterValues.reduce((acc, val) => acc + val, 0);
        const totalSum = letterSum + numberSum + specialSum;
        const magicConstant = originalName.length * 7;
        let hash = (letterValues.length > 0) ? 
            (letterValues[0] * (letterValues[letterValues.length - 1] || 1)) : 
            (numberSum * 13);
        hash += specialSum * 17;
        
        let result = (totalSum * magicConstant + hash) % 101;
        return result < 0 ? result + 101 : result;
    }

    getResultMessage(percentage, name) {
        const messageTiers = {
            0: [ 
                "0%... 你是直尺成精了吗？", 
                "零！你的世界里连彩虹都是黑白的吗？", 
                "成分过纯，建议去钢铁厂上班。", 
                "比我的银行余额还直，令人敬畏。", 
                "检测不到任何弯的迹象，程序可能出错了。",
                "你直得像一道数学题的辅助线，简单明了。",
                "蚊子见了你都得绕道飞，生怕被你掰直了。",
                "你的生活里是不是只有'异性相吸'这条物理定律？",
                "你就是传说中的'取向'坐标轴原点本人。",
                "你对'柜子'的唯一认知，可能就是装衣服的那个。"
            ],
            10: [ 
                "钢铁直男/女，宇宙都掰不弯你。", 
                "你走过的路，比笔还直。", 
                "身上充满了'直'气，妖魔鬼怪都得退散。", 
                "别说弯了，你连转个弯都费劲。", 
                "堪称异性恋的最后一道防线。",
                "你大脑里的'弯'路，导航都搜不到。",
                "如果取向能发电，你就是个永动机。",
                "你大概就是那种会问'为什么同性恋要叫同志'的人。",
                "你对性别的认知，就像老式电视机一样只有两个频道。",
                "你怕不是直男/女培训班里的课代表？"
            ],
            20: [ 
                "直得有点刻意了，是不是在伪装？", 
                "指数这么低，是不是对同性有什么误解？", 
                "你大概是那种'啊？他俩是gay？'的迟钝类型。", 
                "你的世界简单得像一条直线。", 
                "朋友，恐同即深柜，再测测？",
                "你的雷达可能需要一次固件升级了。",
                "你眼里的同性好友，可能只是单纯的'好哥们/好姐妹'。",
                "你对同性的欣赏，止步于'这人穿搭还不错'。",
                "你的内心毫无波澜，甚至还想吃一碗泡面。",
                "你离真相，就差一副8倍镜的距离。"
            ],
            40: [ 
                "内心可能有点小波动，但无伤大雅。", 
                "偶尔会觉得'同性也挺可爱的嘛'的程度。", 
                "雷达偶尔会收到微弱信号，但很快就忽略了。", 
                "在弯的边缘试探，但又缩回了脚。", 
                "一只脚还在柜外，另一只脚在门槛上摩擦。",
                "你以为你是笔直的，其实你只是个有点弧度的香蕉。",
                "你的柜门开了一条缝，但你以为那是通风口。",
                "看到好看的同性，你会心想：'皮肤真好，用的什么护肤品？'",
                "你已经开始思考，为什么彩虹有那么多颜色。",
                "你的取向就像薛定谔的猫，打开柜子前谁也说不准。"
            ],
            60: [ 
                "有点意思，雷达的指针动了一下。", 
                "已经开始对一些特定类型的同性产生欣赏了。", 
                "你离出柜，就差一个契机。", 
                "嘴上说着不要，身体却很诚实。", 
                "是时候更新一下你的交友软件筛选器了。",
                "你的浏览器历史记录，可能比你更懂你自己。",
                "你以为你在凝视深渊，其实深渊也在给你抛媚眼。",
                "你不是弯，你只是在进行一个优雅的漂移。",
                "朋友已经开始互相打赌你什么时候会官宣了。",
                "你的柜子已经不是柜子了，它是个玻璃展示柜。"
            ],
            75: [ 
                "别装了，你的品味出卖了你！", 
                "Gay达已经开始报警，只是声音比较小。", 
                "你怕不是通讯录里的常驻嘉宾？", 
                "说吧，你的理想型是体育生还是艺术生？", 
                "看到帅哥/美女会心跳加速，不分性别。",
                "你的歌单列表暴露了一切，别解释了。",
                "你不是在找对象，你是在为通讯录纳新。",
                "你选的表情包都比别人弯一点。",
                "别挣扎了，你的磁场已经开始吸引同极了。",
                "你离打开新世界的大门，只差一把钥匙，而钥匙就在你手里。"
            ],
            90: [ 
                "衣柜门都快关不住了吧！", 
                "姬达/Gay达信号强度已爆表！", 
                "下一步是不是就要统治通讯录了？", 
                "你弯得像盘蚊香，还带电的那种。", 
                "别点了，自己人，快开门！",
                "你不是弯，你是圆规成精，自带圆心。",
                "你的柜子已经不是柜子，是任意门，通往新世界。",
                "你走过的路，能让意大利面都自愧不如。",
                "你已经进化了，取向进化成了'好看的'。",
                "别藏了，你身上的彩虹光芒比WiFi信号还强。"
            ],
            100: [ 
                "警报！已无需鉴定，天生的弯！", 
                "你就是彩虹本虹！", 
                "恭喜！你已解锁'通讯录天花板'成就！", 
                "弯得彻底，连影子都是弯的。", 
                "出厂设置就是弯的，别挣扎了。",
                "你不是通讯录，你是通讯录的CEO！",
                "金赛量表在你面前都得新增一个维度。",
                "你一张嘴，方圆十里的gay达都得瘫痪。",
                "别算了，快去楼下彩虹旗那儿报到！"
            ]
        };
        
        let selectedTier;
        if (percentage === 0) selectedTier = messageTiers[0];
        else if (percentage <= 10) selectedTier = messageTiers[10];
        else if (percentage <= 20) selectedTier = messageTiers[20];
        else if (percentage <= 40) selectedTier = messageTiers[40];
        else if (percentage <= 60) selectedTier = messageTiers[60];
        else if (percentage <= 75) selectedTier = messageTiers[75];
        else if (percentage <= 90) selectedTier = messageTiers[90];
        else selectedTier = messageTiers[100];

        const messageIndex = Math.floor(Math.random() * selectedTier.length);
        return selectedTier[messageIndex];
    }
}