# discuz-spider
discuz论坛爬虫

## 快速开始
0. 安装puppeteer中的问题。
报错：
```
ERROR: Failed to download Chromium r515411! Set "PUPPETEER_SKIP_CHROMIUM_DOWNLOA
D" env variable to skip download.
```

原因：无法连接Chromium官网，下载最新浏览器。
解决方案：

* 使用`yarn add puppeteer --ignore-scripts`跳过Chromium下载
* 并手动安装Chrome浏览器。
* 程序中指明Chrome浏览器路径。代码如下：
```
 const browser = await puppeteer.launch({
                        executablePath: './chromium/chrome.exe',// 修改为Chrome安装路径
                        headless: false
                    });
```

1. 在website-config.json 中配置爬虫，如：
```
{
    "download": {
        "startId": 30146,
        "endId": 433722,
        "sleepSecond":2,
        "distDirectory":"./save-directory/thread"
    }
}
```
字段含义：

|字段名|含义|
|:--|--:|
|startId|开始下载帖子id|
|endId|终止下载帖子id|
|sleepSecond|休眠时间（秒）|
|distDirectory|下载文件存储目录|

2. 启动应用， 使用 `yarn babel app.js` 或`yarn start`执行爬虫程序。

## 单元测试

使用mocha测试框架，chai断言（assertion）库。

测试命令样例：`yarn test test/download-worker.test.js`

## 运行日志

使用[log4js](https://www.npmjs.com/package/log4js)做日志框架。
