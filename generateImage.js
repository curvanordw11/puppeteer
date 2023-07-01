const path = require('path');
const puppeteer = require('puppeteer');

async function generateImage() {
    // 启动 Puppeteer
    const browser = await puppeteer.launch();

    // 创建一个新页面
    const page = await browser.newPage();

    // 构建文件路径
    const filePath = path.join(__dirname, 'index.html');

    // 导航到本地 HTML 文件
    const fileUrl = `file://${filePath}`;
    await page.goto(fileUrl, { waitUntil: 'load' }); // 使用 waitUntil: 'load' 等待页面完全加载

    // 设置页面视口大小，间接调整生成图片的分辨率
    await page.setViewport({ width: 1000, height: 800 });

    // 模拟高分辨率设备，增加生成图片的清晰度
    await page.emulate({
        viewport: {
            width: 1000,
            height: 800,
            deviceScaleFactor: 10
        },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36'
    });



    // 等待一段时间，确保页面中的元素加载完成
    await page.waitForTimeout(2000);

    // 生成页面的截图
    const screenshotPath = path.join(__dirname, 'screenshot.png');
    await page.screenshot({ path: screenshotPath});

    // 关闭浏览器
    await browser.close();

    console.log('截图已生成:', screenshotPath);
}

generateImage();
