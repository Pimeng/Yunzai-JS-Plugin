import plugin from '../../lib/plugins/plugin.js';
import fs from 'node:fs'

let packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))

export class PhigrosUpdatePlugin extends plugin {
    constructor() {
      super({
        name: 'GetVersion',
        dsc: '简单获取当前运行的云崽版本',
        event: 'message',
        priority: 100,
        rule: [
          {
            reg: '^/getver', // 命令
            fnc: 'getyunver'
          }
        ]
      });
    }
  
    async getyunver(e){
        let name = 'Yunzai-Bot'
        if (packageJson.name === 'miao-yunzai') {
            name = 'Miao-Yunzai'
          } else if (packageJson.name === 'trss-yunzai') {
            name = 'TRSS-Yunzai'
          } 
          else if (packageJson.name === 'a-yunzai') {
            name = 'A-Yunzai'
          }
        e.reply(`当前云崽版本：${name}`)
    }

}