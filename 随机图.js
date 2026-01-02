import plugin from "../../lib/plugins/plugin.js";
import fs from 'fs/promises';
import path from 'path';
import { randomInt } from 'crypto';

let cachedImageList = null;
let lastUpdateTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

async function getImageList(photoDir) {
    const now = Date.now();
    
    // 如果缓存存在且未过期，直接返回缓存
    if (cachedImageList && (now - lastUpdateTime < CACHE_DURATION)) {
        console.log(`使用缓存图片列表，共 ${cachedImageList.length} 张图片`);
        return cachedImageList;
    }
    
    console.log('重新读取图片目录...');
    
    try {
        const files = await fs.readdir(photoDir);
        
        // 过滤出常见的图片文件
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
        cachedImageList = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return imageExtensions.includes(ext);
        });
        
        lastUpdateTime = now;
        console.log(`更新图片列表成功，找到 ${cachedImageList.length} 张图片`);
        
        return cachedImageList;
        
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('图片目录不存在:', photoDir);
            throw new Error('图片目录不存在，请检查data/photo目录');
        } else {
            console.error('读取图片目录失败:', error);
            throw new Error('读取图片目录失败: ' + error.message);
        }
    }
}

export class photoRandom extends plugin {
    constructor() {
        super({
            name: '随机图片',
            dsc: '随机发送图片目录中的一张图片',
            event: 'message',
            priority: 5000, // 优先级，数字越小越高
            rule: [
                {
                    reg: '^来张图$',
                    fnc: 'randomPhoto'
                }
            ]
        })
    }
    
    async randomPhoto(e) {
        try {
            // 获取图片目录路径
            const photoDir = path.join(process.cwd(), 'data', 'photo'); // Yunzai/data/photo
            
            // 获取图片列表
            const imageList = await getImageList(photoDir);
            
            if (imageList.length === 0) {
                await e.reply('图片目录中没有找到图片文件');
                return true;
            }
            
            // 使用crypto的randomInt函数生成更可靠的随机数
            const randomIndex = randomInt(0, imageList.length);
            
            const randomImage = imageList[randomIndex];
            const imagePath = path.join(photoDir, randomImage);
            
            // 发送图片
            await e.reply([segment.image(imagePath)]);
            
            // 调试信息
            console.log(`随机选择了图片: ${randomImage}, 索引: ${randomIndex}, 总图片数: ${imageList.length}`);
            
            return true;
            
        } catch (error) {
            console.error('随机图片插件出错:', error);
            await e.reply('获取图片时出现错误: ' + error.message);
            return true;
        }
    }
}