import React, { useEffect, useState } from 'react'
import {Tabs, Input,Button, Upload, Divider} from 'antd'

import BcgTab from './tabmenu/BcgTab'
import BgmTab from './tabmenu/BgmTab'
import CoverTab from './tabmenu/CoverTab'
import SoundTab from './tabmenu/SoundTab'
import SETab from './tabmenu/SETab'
import SprTab from './tabmenu/SprTab'
import HelpTab from './tabmenu/HelpTab'
import {Howler} from 'howler'
import { getcnnameof } from 'renderer/datamap'
import { useLocalStorage } from 'renderer/hooks/useLocal'

const {Search} = Input


const itemstyle={height:document.body.clientHeight*0.75+"px",overflow:'auto'}

function SourceGround(props) {

  // 用户自己定义的spr描述, {sprname:desc, ...}, sprname不含后缀
  const [sprdesc,setSprdesc]=useLocalStorage('sprdesc',new Map())
  const [bgmdesc,setBgmdesc]=useLocalStorage('bgmdesc',new Map())
  const [sounddesc,setSounddesc]=useLocalStorage('sounddesc',new Map())

  // console.log("从LocalStorage中读取到的sprdesc",  sprdesc)


  /**
     * 给定五文件类型，构建tab列表
     * bgm,bcg,cover,sound,spr
     */
  const buildItems=(itemlistmap)=>{
    return [
      {
        key: 'bgm',
        label: `背景音乐`,
        children: <BgmTab style={itemstyle} bgmlist={itemlistmap.bgm} bgmdesc={bgmdesc} setBgmdesc={setBgmdesc}/>,
      },
      {
        key: 'bcg',
        label: `背景图`,
        children: <BcgTab style={itemstyle} bcglist={itemlistmap.bcg} />,
      },
      {
        key: 'cover',
        label: `覆盖图`,
        children: <CoverTab style={itemstyle} coverlist={itemlistmap.cover}/>,
      },
      {
        key: 'sound',
        label: `音效`,
        children: <SoundTab style={itemstyle} soundlist={itemlistmap.sound} sounddesc={sounddesc} setSounddesc={setSounddesc} />,
      },
      {
        key: 'sedesc',
        label: `音效速查`,
        children: <SETab style={itemstyle} soundlist={itemlistmap.sound} />,
      },
      {
        key: 'spr',
        label: `人物`,
        children: <SprTab style={itemstyle} sprlist={itemlistmap.spr} sprdesc={sprdesc} setSprdesc={setSprdesc}/>,
      },
      {
        key: 'help',
        label: `帮助`,
        children: <HelpTab style={itemstyle} />,
      },
    ]
  }

  // console.log(props.sourcemap)
  const loadData=props.loadData
  const [needload,setNeedload]=useState(true)
  const [items,setItems] = useState(buildItems({
    "bgm":props.sourcemap.get('bgm'),
    "bcg":props.sourcemap.get("bcg"),
    "cover":props.sourcemap.get("cover"),
    "sound":props.sourcemap.get("sound"),
    "spr":props.sourcemap.get("spr")
  }))

  useEffect(()=>{
    setItems(buildItems({
      "bgm":props.sourcemap.get('bgm'),
      "bcg":props.sourcemap.get("bcg"),
      "cover":props.sourcemap.get("cover"),
      "sound":props.sourcemap.get("sound"),
      "spr":props.sourcemap.get("spr")
    }))
  },[props.sourcemap])

  const onSearch=(word)=>{
    setItems(buildItems({
      "bgm":[],
      "bcg":[],
      "cover":[],
      "sound":[],
      "spr":[],
    }))

    

    const searchword=word.toLowerCase()
    // console.log(searchword)
    let postlist=[[],[],[],[],[]]// 搜索结果
    const prelist=[props.sourcemap.get('bgm'),props.sourcemap.get('bcg'),props.sourcemap.get('cover'),props.sourcemap.get('sound'),props.sourcemap.get('spr')]
    if(word.length!==0){
      // 搜索
      for(let listind in prelist){
        const list=prelist[listind]
        for(let eachfile of list){
          if(eachfile.name.split(".")[0].toLowerCase().indexOf(searchword)!==-1
          ||
          getcnnameof(eachfile.name.split(".")[0]).indexOf(searchword)!==-1
          ||
          (sprdesc[eachfile.name.split(".")[0]]||"").indexOf(searchword)!==-1
          ||
          (bgmdesc[eachfile.name]||"").indexOf(searchword)!==-1
          ||
          (sounddesc[eachfile.name]||"").indexOf(searchword)!==-1
          ){
            postlist[listind].push(eachfile)
          }
        }
      }
    }else{
      postlist=prelist
    }
    setTimeout(()=>{
      setItems(buildItems({
        "bgm":postlist[0],
        "bcg":postlist[1],
        "cover":postlist[2],
        "sound":postlist[3],
        "spr":postlist[4],
      }))
    },500)

  }

  return (
    <div id="sourceground">
      <Search placeholder="搜索关键字(不区分大小写)" allowClear onSearch={onSearch} style={{ width: 300 }} />
      <Divider type='vertical' />
      <Button className="loadprojectbutton" type={needload?'primary':'slash'}><input type="file" multiple="" webkitdirectory="" name="file" accept='*' className="projectfile" onChange={(eve)=>{setNeedload(false);loadData(eve)}}></input>选择Data文件夹</Button>
      <Tabs defaultActiveKey='bgm' animated={false} 
      destroyInactiveTabPane={false}
      items={items} onChange={()=>{Howler.stop()}}/>
    </div>
  )
}

export default SourceGround