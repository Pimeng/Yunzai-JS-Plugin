import plugin from '../../lib/plugins/plugin.js';

export class bmiCalculator extends plugin {
  constructor() {
    super({
      name: "BMI计算器",
      dsc: "计算身体质量指数(BMI)",
      event: "message",
      priority: 10,
      rule: [
        {
          reg: "^#BMI\\s*(\\(?\\d+\\.?\\d*\\)?)\\s*(\\(?\\d+\\.?\\d*\\)?)\\s*$",
          fnc: "calculateBMI"
        }
      ]
    });
  }
  
    

  async calculateBMI() {
    // 获取用户输入的身高和体重
    let heightInput = this.e.msg.match(/\d+\.?\d*/g)[0];
    let weightInput = this.e.msg.match(/\d+\.?\d*/g)[1];

    // 转换为数字并处理可能的括号
    let height = parseFloat(heightInput.replace(/[()]/g, ''));
    let weight = parseFloat(weightInput.replace(/[()]/g, ''));

    // 验证输入的有效性
    if (height <= 0 || weight <= 0) {
      await this.reply("身高和体重必须是正数哦~", true);
      return;
    }

    // 检查身高单位（假设用户可能输入厘米或米）
    if (height > 3) { // 如果身高大于3米，假设输入的是厘米，转换为米
      height = height / 100;
    }

    // 计算BMI
    const bmi = weight / (height * height);
    const roundedBMI = bmi.toFixed(1);

    // 获取健康建议
    const advice = this.getBMIAdvice(bmi);
    // 获取Bot昵称
    const botname = Bot.nickname

    // 构造回复消息
    const replyMsg = [
      `🧮 BMI计算结果：`,
      `♿️身高：${height.toFixed(2)}米`,
      `🛐体重：${weight}公斤`,
      `👉BMI：${roundedBMI}`,
      `👉${botname}：${advice}`
    ].join("\n");

    await this.reply(replyMsg, true);
  }

  getBMIAdvice(bmi) {
    if (bmi < 10.5) {
      return "你是竹节虫吗？";
    } else if (bmi >= 10.5 && bmi < 18.5) {
      return "⚠️偏瘦哦\n😫建议适当增加营养摄入和适度运动哦～";
    } else if (bmi >= 18.5 && bmi < 24) {
      return "✅️正常喵\n😋请继续保持健康的生活方式哦～";
    } else if (bmi >= 24 && bmi < 28) {
      return "⚠️超重辣\n🤓建议适当控制饮食并增加运动哦～";
    } else if (bmi >= 28 && bmi < 32) {
      return "⚠️你有点胖哦\n😰建议制定减重计划，咨询专业人士";
    } else if (bmi >= 32 && bmi < 40){
      return "❗️严重肥胖\n😨强烈建议寻求专业医疗建议";
    } else { 
      return "🐔钢管吗？";
    }
  }
}