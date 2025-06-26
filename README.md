# 云崽单JS插件 yunzai-simpleplugin

## 目录
- [CheckPhira.js](https://gitee.com/pimeng/yunzai-jsplugin#CheckPhira)
- [Getver.js](https://gitee.com/pimeng/yunzai-jsplugin#GetVer)
- [BMI计算器](https://gitee.com/pimeng/yunzai-jsplugin#BMI%E8%AE%A1%E7%AE%97%E5%99%A8)
- [DateNow](https://gitee.com/pimeng/yunzai-jsplugin#DateNow)
- [Phigros版本更新信息](https://gitee.com/pimeng/yunzai-jsplugin#Phigros版本更新信息)
### 介绍
自用简单JS插件

## CheckPhira   

### 介绍
因为近期Phira服务器频频炸服，群友需要，故诞生了本插件

### 食用方法
下载插件并放到Yunzai/plugins/example目录下即可<br>
或者在云崽根目录下运行这个指令   
``` 
curl -o "./plugins/example/Checkphira.js" "https://gitee.com/pimeng/yunzai-jsplugin/raw/master/checkphira.js"
```
注意，本插件需要添加“axios”作为外部库，可以使用下面指令来添加
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
``` bash
curl -o "./plugins/example/DateNow.js" "https://gitee.com/pimeng/yunzai-jsplugin/raw/master/DateNow.js"
```
注意，本插件需要添加“chinese-lunar”和“moment”作为外部库，可以使用下面指令来添加
``` bash
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
``` bash
cd plugins/example # 进入目录
pnpm add axios node-html-parser
```
   
下载插件并放到Yunzai/plugins/example目录下即可<br>
或者在云崽根目录下运行这个指令   
   
``` bash
curl -o "./plugins/example/TaptapPhigrosUpdateInfo.js" "https://gitee.com/pimeng/yunzai-jsplugin/raw/master/TaptapPhigrosUpdateInfo.js"
```