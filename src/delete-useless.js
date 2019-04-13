import fs from 'fs-extra'
import iconv  from 'iconv-lite'
import cheerio from 'cheerio'

const whiteList = [

    "upenn",
    "Pennsylvania",
    "宾夕法尼亚",
    "宾大",
    "拱顶石",
    "教友派",
    "里程碑",
    "贵格",
    "煤炭",
    "滨州",
    ];
    //fs.readJsonSync("./list.txt")
console.log(whiteList);

class Deleter{
    constructor(){
        this.maxId = 513721;
        this.minId = 438410;
    }
    
    run(){
        for(var id= this.maxId;id>=this.minId;--id){
            this.judgement(id);
        }
    }

    judgement(id){
        var path = `./thread/thread-${id}-1-1.html`;
        if(!fs.pathExistsSync(path)){
            return;
        }

        var text = this.getContent(id);

        var isPass = false;
        whiteList.forEach(keyword=>{
            if(text.indexOf(keyword)>-1){
                isPass = true;
            }
        })

        if(!isPass){
            fs.removeSync(path)
        }

    }

    getContent(id){
        var path = `./thread/thread-${id}-1-1.html`;
        var raw = fs.readFileSync(path);
        var text = iconv.decode(raw,'gb2312');

        const $ = cheerio.load(text)
        return $('.pcb').first().text();

    }

}

const deleter = new Deleter();

deleter.run();

