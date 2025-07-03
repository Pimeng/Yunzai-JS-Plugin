import plugin from '../../lib/plugins/plugin.js'
import common from '../../lib/common/common.js'
import axios from 'axios'

export class ExpressQueryHelper extends plugin {
  constructor () {
    super({
      name: '快递查询',
      dsc: '查询快递物流信息',
      event: 'message',
      priority: -500,
      rule: [
        {
          reg: '^#?快递查询\\s+\\S+(?:\\s+\\d{4})?$',
          fnc: 'queryExpress'
        }
      ]
    })
  }

  async queryExpress(e) {
    // 屏蔽群聊
    if (e.isGroup) {
      e.group.recallMsg(e.seq)
      e.reply('喵喵喵，只能在私聊查哦，不能在群里边查！（炸毛）\nBot正在尝试撤回你的消息！如果不成功请手动撤回喵喵喵！')
      return false
    }
    // 查询逻辑开始
    e.reply("正在查询哦喵")
    common.sleep(500) // 睡一会先qwq
    const match = e.msg.match(/^#?快递查询\s+(\S+)(?:\s+(\d{4}))?$/)
    const [_, postid, phoneLast4] = match || []
    if (!postid) return e.reply('喵喵喵，你的快递单号呢？')
    // 自己去整一个API去，欸嘿
    const apiUrl = `https://example.com`
    // 请求API
    try {
      const response = await axios.get(apiUrl)
      const res = response.data
      if (res.code !== 200) {
        if (res.message && res.message.includes('后4位不能为空')) {
          return e.reply('喵喵喵，这个快递公司需要你的手机号后四位哦，请补充喵。\n格式：#快递查询 单号 1234')
        } else if (res.message && res.message.includes('所有API调用失败')) {
          e.reply('喵喵喵，查不到呢，怎么会事呢¿')
          logger.error("[快递查询]API错误：" + res.message)
          return false
        }
        return e.reply(res.message || '喵喵喵，查不到呢，怎么会事呢¿')
      }
      if (!res.data || !Array.isArray(res.data.trackingDetails) || res.data.trackingDetails.length === 0) {
        return e.reply('喵喵喵，查不到呢，你的单号/手机号后四位对不对¿')
      }
      // 整理物流节点，合并转发
      let botinfo = {
        nickname: e.bot.nickname,
        user_id: e.bot.uin
      }
      let msgList = res.data.trackingDetails.map(item => ({
        ...botinfo,
        message: `时间: ${item.time}\n地点: ${item.location}\n状态: ${item.shipmentStatus}\n物流信息: \n${item.description}`
      }))
      // 回复
      e.reply(await Bot[e.bot.uin].makeForwardMsg(msgList))
    } catch (error) {
      // 抓一下错误，扔到日志
      logger.error("[快递查询]未知错误：" + error)
      e.reply('喵喵喵，查询失败了，怎么会事呢¿\n这次好像是一个不寻常的错误，请反馈给插件作者')
    }
  }
}
