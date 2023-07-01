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

    // 生成页面的截图
    const screenshotPath = path.join(__dirname, 'screenshot.png');
    await page.screenshot({ path: screenshotPath });

    // 关闭浏览器
    await browser.close();

    console.log('截图已生成:', screenshotPath);
}

generateImage();
