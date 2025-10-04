# 云崽单JS插件 yunzai-simpleplugin

## 目录
- [CheckPhira.js](https://gitee.com/pimeng/yunzai-jsplugin#checkphira)
- [Getver.js](https://gitee.com/pimeng/yunzai-jsplugin#getver)
- [BMI计算器](https://gitee.com/pimeng/yunzai-jsplugin#bmi%E8%AE%A1%E7%AE%97%E5%99%A8)
- [DateNow](https://gitee.com/pimeng/yunzai-jsplugin#datenow)
- [Phigros版本更新信息](https://gitee.com/pimeng/yunzai-jsplugin#phigros%E7%89%88%E6%9C%AC%E6%9B%B4%E6%96%B0%E4%BF%A1%E6%81%AF)
- [快递查询](https://gitee.com/pimeng/yunzai-jsplugin#%E5%BF%AB%E9%80%92%E6%9F%A5%E8%AF%A2)
- [Gay指数](https://gitee.com/pimeng/yunzai-jsplugin#gay%E6%8C%87%E6%95%B0)
- [神人指数分析器](https://gitee.com/pimeng/yunzai-jsplugin#%E7%A5%9E%E4%BA%BA%E6%8C%87%E6%95%B0%E5%88%86%E6%9E%90%E5%99%A8)
- [sendMail](https://gitee.com/pimeng/yunzai-jsplugin#sendmail)

### 介绍
自用简单JS插件

## CheckPhira   

### 介绍
一个可以查询Phira的官方服务器和多人联机服务器的状态的插件

### 食用方法
1. 下载插件并放到Yunzai/plugins/example目录下<br>
> 或者在云崽根目录下运行这个指令   
``` 
curl -o "./plugins/example/Checkphira.js" "https://gitee.com/pimeng/yunzai-jsplugin/raw/master/checkphira.js"
```
2. 将代码中的`mp.tianstudio.top:31205`和`mp.tianstudio.top:31206/api/rooms`更改为自己的服务器的联机地址和查房间的API地址
3. 为插件添加“axios”作为外部库，可以使用下面指令来添加
```
cd plugins/example # 进入目录
pnpm add axios # 添加 axios 库
```

***

## GetVer
### 介绍
十分简单的基于node:fs获取package.json来获取云崽分支信息的插件

### 食用方法
下载插件并放到Yunzai/plugins/example目录下即可<br>
或者在云崽根目录下运行这个指令   
``` 
curl -o "./plugins/example/Getver.js" "https://gitee.com/pimeng/yunzai-jsplugin/raw/master/getver.js"
```

***

## BMI计算器
### 介绍   

闲出屁写的一个插件，就是拿来计算BMI的

### 食用方法
下载插件并放到Yunzai/plugins/example目录下即可<br>
或者在云崽根目录下运行这个指令   
``` 
curl -o "./plugins/example/BMICalculator.js" "https://gitee.com/pimeng/yunzai-jsplugin/raw/master/BMICalculator.js"
```


***

## DateNow
### 介绍   

闲出屁写的一个插件，用来获取现在的时间的插件

### 食用方法
下载插件并放到Yunzai/plugins/example目录下即可<br>
或者在云崽根目录下运行这个指令   
``` console
curl -o "./plugins/example/DateNow.js" "https://gitee.com/pimeng/yunzai-jsplugin/raw/master/DateNow.js"
```
注意，本插件需要添加“chinese-lunar”和“moment”作为外部库，可以使用下面指令来添加
``` console
cd plugins/example # 进入目录
pnpm add chinese-lunar moment
```

***

## Phigros版本更新信息
### 介绍   
   
无用插件+1   
通过抓包获取Phigros的更新日志
   
### 食用方法
   
注意，本插件需要添加“axios”和“node-html-parser”作为外部库，可以使用下面指令来添加
``` console
cd plugins/example # 进入目录
pnpm add axios node-html-parser
```
   
下载插件并放到Yunzai/plugins/example目录下即可<br>
或者在云崽根目录下运行这个指令   
   
``` console
curl -o "./plugins/example/TaptapPhigrosUpdateInfo.js" "https://gitee.com/pimeng/yunzai-jsplugin/raw/master/TaptapPhigrosUpdateInfo.js"
```

## 快递查询
### 介绍   
   
无用插件+1   
莫名其妙抓来一个API，遂拿来用   
什么？你问我API在哪？自己抓一个（   
我好不容易找来的API，可不能泄露（   
   
### 食用方法

注意，本插件需要添加“axios”作为外部库，可以使用下面指令来添加   
``` console
cd plugins/example # 进入目录
pnpm add axios
```
   
下载插件并放到Yunzai/plugins/example目录下即可<br>
或者在云崽根目录下运行这个指令   
``` console
curl -o "./plugins/example/快递查询.js" "https://gitee.com/pimeng/yunzai-jsplugin/raw/master/expressquery.js"
```

## Gay指数
### 介绍   

源自：https://akanyi.github.io/Gaynum/   
由我修改为云崽版   
   
### 食用方法
   
注意，本插件需要添加“pinyin”和“wanakana”作为外部库，可以使用下面指令来添加   
``` console
cd plugins/example # 进入目录
pnpm add -w pinyin wanakana
```

下载插件并放到Yunzai/plugins/example目录下即可<br>
或者在云崽根目录下运行这个指令   
``` console
curl -o "./plugins/example/Gay指数.js" "https://gitee.com/pimeng/yunzai-jsplugin/raw/master/Gay指数.js"
```

## 神人指数分析器
### 介绍   
   
源自可爱大彩兔 & Mr_Onion   
源地址：https://sb.mr-onion-blog.fun/   
由我修改为云崽版   
为了避免违规，我修改为神人  
   
### 食用方法
   
下载插件并放到Yunzai/plugins/example目录下即可<br>
或者在云崽根目录下运行这个指令   
``` console
curl -o "./plugins/example/神人指数分析器.js" "https://gitee.com/pimeng/yunzai-jsplugin/raw/master/神人指数分析器.js"
```

## sendMail
### 介绍   
   
发送邮件依赖
至于拿来干嘛自己知道 
   
### 食用方法
   
注意，本插件需要添加“nodemailer”作为外部库，可以使用下面指令来添加   
``` console
cd plugins/example # 进入目录
pnpm add -w nodemailer
```


下载插件并放到Yunzai/plugins/example目录下即可<br>
或者在云崽根目录下运行这个指令   
``` console
curl -o "./plugins/example/sendMail.js" "https://gitee.com/pimeng/yunzai-jsplugin/raw/master/sendMail.js"
```