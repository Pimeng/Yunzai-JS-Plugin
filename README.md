# yunzai-simpleplugin
# 云崽单JS插件

## 目录
 - [CheckPhira.js](https://gitee.com/pimeng/yunzai-simpleplugin#CheckPhira)
 - [Getver.js](https://gitee.com/pimeng/yunzai-simpleplugin#GetVer)
 - [BMI计算器](https://gitee.com/pimeng/yunzai-simpleplugin#BMI计算器)

### 介绍
自用简单JS插件

## CheckPhira   

### 介绍
因为近期Phira服务器频频炸服，群友需要，故诞生了本插件

### 食用方法
下载插件并放到Yunzai/plugins/example目录下即可<br>
或者在云崽根目录下运行这个指令   
``` 
curl -o "./plugins/example/Checkphira.js" "https://gitee.com/pimeng/yunzai-simpleplugin/raw/master/checkphira.js"
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
curl -o "./plugins/example/Getver.js" "https://gitee.com/pimeng/yunzai-simpleplugin/raw/master/getver.js"
```


***

## BMI计算器
### 介绍   

闲出屁写的一个插件

### 食用方法
下载插件并放到Yunzai/plugins/example目录下即可<br>
或者在云崽根目录下运行这个指令   
``` 
curl -o "./plugins/example/BMICalculator.js" "https://gitee.com/pimeng/yunzai-simpleplugin/raw/master/BMICalculator.js"
```

