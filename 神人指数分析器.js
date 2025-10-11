import plugin from "../../lib/plugins/plugin.js"

const specialSettings = [
  {
    "inputContent": "奶龙",
    "fixedScore": 100,
    "specialDisplayContent": "补药给我喂这种东西啊",
    "popupContent": "口区，唐死我了！"
  },
  {
    "inputContent": "金正恩",
    "fixedScore": 0,
    "specialDisplayContent": "将军将军\\o/",
    "popupContent": "\o/"
  },
  {
    "inputContent": "GuyKun",
    "fixedScore": 101,
    "specialDisplayContent": "注意！您的神人指数较高，可能需要自我反思！",
    "popupContent": "口区，唐死我了！"
  }
];


function simpleHash(str) {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // 转换为32位整数
  }
  return Math.abs(hash);
}

// 获取基于哈希的分数
function getScoreFromHash(name) {
  const hash = simpleHash(name);
  return hash % 101; // 返回0-100之间的值
}

export class GodManIndex extends plugin {
  constructor() {
    super({
      name: '神人指数分析器',
      dsc: '分析用户的神人指数',
      event: 'message',
      priority: -99999999999,
      rule: [
        {
          reg: '^#?神人指数\s*([^\n]+)',
          fnc: 'analyze'
        }
      ]
    })
  }

  // 分析神人指数
  async analyze(e) {
    const name = e.msg.match(/^#神人指数\s*([^\n]+)/)[1].trim();

    if (!name) {
      await e.reply('请输入名字，格式：#神人指数 名字\n原制作：可爱大彩兔 & Mr_Onion\n转插件：皮梦');
      return;
    }

    let score = getScoreFromHash(name);
    let specialDisplayContent = null;
    let popupContent = null;

    // 检查特殊设置
    const matchedSetting = specialSettings.find(setting => setting.inputContent === name);
    if (matchedSetting) {
      if (matchedSetting.fixedScore !== undefined) {
        score = matchedSetting.fixedScore;
      }
      if (matchedSetting.specialDisplayContent) {
        specialDisplayContent = matchedSetting.specialDisplayContent;
      }
      if (matchedSetting.popupContent) {
        popupContent = matchedSetting.popupContent;
      }
    }

    // 构建回复消息
    let replyMsg = `神人指数分析结果\n`;
    replyMsg += `名字：${name}\n`;
    replyMsg += `指数：${score}%\n`;

    // 根据分数或特殊设置添加评语
    if (specialDisplayContent) {
      replyMsg += `评语：${specialDisplayContent}\n`;
      if (popupContent) {
        replyMsg += `提示：${popupContent}\n`;
      }
    } else if (score < 10) {
      replyMsg += `评语：天哪！您简直是圣人转世，神人指数几乎为零！\n`;
    } else if (score < 20) {
      replyMsg += `评语：太优秀了！您的神人指数极低，堪称楷模！\n`;
    } else if (score < 40) {
      replyMsg += `评语：不错哦！您的神人指数在正常范围内，继续保持！\n`;
    } else if (score < 60) {
      replyMsg += `评语：嗯，您有着普通人的神人指数，生活需要一点乐趣！\n`;
    } else if (score < 80) {
      replyMsg += `评语：警告！您的神人指数略高，请注意日常言行！\n`;
    } else if (score < 90) {
      replyMsg += `评语：注意！您的神人指数较高，可能需要自我反思！\n`;
    } else {
      replyMsg += `评语：天哪！您的神人指数爆表了！建议重新投胎！\n`;
    }

    replyMsg += `\n✨ 提示：相同的名字总是得到相同的结果`;

    await e.reply(replyMsg);
  }

}