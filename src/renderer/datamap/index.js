import studentsjson from "./rawjson/students.json";
import soundsjson from "./rawjson/sound.json"





// 封装人物名字和素材对应表
export const students_datamap=[]
for(let stu of studentsjson.students){
    if(stu.sprName.startsWith("CH")||stu.sprName.startsWith("NP")){
        // 中文名，素材名
        // CH和NP开头的文件名不转小写
        students_datamap.push([
            stu.zhName.replace(/ /g,"").toLowerCase(),
            stu.sprName.replace(/ /g,"")
        ])
    }else{
        // 其他文件名全转小写
        students_datamap.push([
            stu.zhName.replace(/ /g,"").toLowerCase(),
            stu.sprName.replace(/ /g,"").toLowerCase()
        ])
    }

}

// 音效
export const sounds_datamap=soundsjson.sounds