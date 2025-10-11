import plugin from '../../lib/plugins/plugin.js';
import chineseLunar from 'chinese-lunar';
import moment from 'moment';

export class GetTime extends plugin {
    constructor() {
      super({
        name: 'DateNow',
        dsc: '获取现在时间喵',
        event: 'message',
        priority: -100,
        rule: [
          {
            reg: '^#?(现在|当前|目前)?(时间|日期|几点)了?？?$',
            fnc: 'datenow'
          }
        ]
      });
    }
  
    async datenow(e){
        const HeavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
        const EarthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
        function getHeavenlyStemsAndEarthlyBranches(year) {
            const heavenlyStem = HeavenlyStems[(year - 4) % 10];
            const earthlyBranch = EarthlyBranches[(year - 4) % 12];
            return heavenlyStem + earthlyBranch + '年';
        }
        function toChineseDay(day) {
            const chineseNums = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];
            return chineseNums[day - 1];
        }
        function toChineseMonth(month) {
            const ChineseMonths = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
            return ChineseMonths[month - 1]
        }
        function toChineseDateDay(day7){
            const ChineseDateDay = ['星期一','星期二','星期三','星期四','星期五','星期六','星期日']
            return ChineseDateDay[day7 === 0 ? 6 : day7 - 1]
        }
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const day = today.getDate();
        const day7 = toChineseDateDay(today.getDay());
        const lunarDate = chineseLunar.solarToLunar(today);
        const lunarYearStemBranch = getHeavenlyStemsAndEarthlyBranches(lunarDate.year);
        const lunarMonth = toChineseMonth(month);
        const lunarDay = toChineseDay(lunarDate.day-1);
        var time = moment(Date.now()).format('HH:mm:ss')
        var sendmsg = `📅今天是${year}年${month + 1}月${day}日，${day7}\n📅农历${lunarYearStemBranch}${lunarMonth}${lunarDay}\n🕒时间是${time}\n⚠️以上时间仅供参考\n✅️若要准确对时可拨打国家授时中心\n☎电话029-83895117`
        e.reply(sendmsg,true)
    }
}