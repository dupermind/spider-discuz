import puppeteer from 'puppeteer'
import fs from 'fs-extra'


const chromePath = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"

var pagePath = "https://www.1point3acres.com/bbs/forum-71-1.html"

var pageByIndex = index=> `https://www.1point3acres.com/bbs/forum-71-${index}.html`

function resolveAfterSomeSeconds(x) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 1000 * x);
    });
}

class BlockFetcher{
    async start(){
        this.browser = await puppeteer.launch({
            headless: false,
            executablePath: chromePath
        });
        this.page = await this.browser.newPage();
        await this.page.goto(pagePath);
        await this.page.screenshot({
            path: 'test.png'
        });
        const dimensions = await this.page.evaluate(() => {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight,
                deviceScaleFactor: window.devicePixelRatio
            };
        });
        console.log('Dimensions:', dimensions);
        return this.page;
    }


    async getList(index){
        var url = pageByIndex(index);
        await this.page.goto(url);

        const urlList = await this.page.evaluate(()=>{
            var res = []
            document.querySelectorAll('.icn a')
                    .forEach(item=>res.push(item.href))
            return res;
        })
        console.log(urlList);
        await resolveAfterSomeSeconds(3)
        console.log("next")
        return urlList
    }

    async getTotal(start,end){
        var totalList = [];
        for(var i=start;i<=end;i++){
           const list = await fetcher.getList(i)
           totalList = totalList.concat(list);
        }
        console.log(totalList.length)
        return totalList
    }
    async end(){
        await browser.close();
    }
}

const fetcher = new BlockFetcher();

fetcher.start()
        .then(page=>{
           return fetcher.getTotal(1,110);
        })
        .then(list=>{
            fs.writeJsonSync('./list.json',list)
            return fetcher.end()
        })
        .then(()=>{
            console.log("结束")
        })