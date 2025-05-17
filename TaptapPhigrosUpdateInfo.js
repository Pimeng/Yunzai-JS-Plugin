import plugin from '../../lib/plugins/plugin.js';
import axios from 'axios';
import { parse } from 'node-html-parser';

export class TapTapUpdate extends plugin {
    constructor() {
      super({
        name: 'TapTapUpdateChecker',
        dsc: '检查TapTap应用的最新更新信息',
        event: 'message',
        priority: 100,
        rule: [
          {
            reg: '^#?/?(Phigros|Pgr|屁股肉|屁股肉丝|phigros)(更新信息|updateinfo)$',
            fnc: 'getUpdateInfo'
          }
        ]
      });
    }

    async getUpdateInfo(e) {
            try {
                const apiUrl = 'https://phiupdateinfo.pmya.xyz/'; // 搞了个反代，这样就无需抓包力
                const response = await axios.get(apiUrl);
    
                if (response.data.success) {
                    const data = response.data.data.list[0];
                    const versionLabel = data.version_label;
                    const updateDate = new Date(data.update_date * 1000).toLocaleDateString();
                    let updateText = data.whatsnew.text;
    
                    // 解析HTML文本，移除HTML标签
                    updateText = parse(updateText).text;
                    e.reply(`Phigros\n最新版本: ${versionLabel}\n更新日期: ${updateDate}\n更新内容:\n${updateText}`);
                } else {
                    e.reply('获取更新信息失败，请稍后再试。');
                }
            } catch (error) {
                console.error('Error fetching update information:', error);
                e.reply('获取更新信息时出错，请稍后再试。');
            }
        }
}
