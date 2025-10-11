import plugin from '../../lib/plugins/plugin.js';
import fs from 'node:fs'

export class GetVersion extends plugin {
    constructor() {
      super({
        name: 'GetVersion',
        dsc: '获取当前运行的云崽分支',
        event: 'message',
        priority: 100,
        rule: [
          {
            reg: '^/getver',
            fnc: 'getyunver'
          }
        ]
      });
    }

    async getyunver(e){
        let p = JSON.parse(fs.readFileSync('package.json', 'utf8'))
        const n = p.name.replace(/(^\w|-\w)/g, s => s.toUpperCase())
        e.reply(`当前云崽分支：${n}`)
    }
}