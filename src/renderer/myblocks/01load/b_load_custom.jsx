import { message } from 'antd';
import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

// 定义JSON格式自定义模块
let blockname="b_load_custom"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "人物代号 %1 缩放比例 %2 空闲状态 %3 自定义名称 %4 图片名(含后缀) %5 %6",
    "args0": [
      {
        "type": "input_value",
        "name": "val1",
        "check": "String"
      },
      {
        "type": "field_number",
        "name": "num1",
        "min": 0,
        "value": 2.7,
        "max": 1000,
        "precision": 0.1,
      },
      {
        "type": "input_value",
        "name": "val2",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "val3",
        "check": "String"
      },
      {
        "type": "input_value",
        "name": "val4",
        "check": "String"
      },
      {
        "type": "field_dropdown",
        "name": "drop1",
        "options": [
            ["普通状态","custom"],
            ["通讯状态","customC"]
        ]
      },
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 260,
    "tooltip": "其他素材需要写明文件名后缀",
    "helpUrl": ""
  }

// 注入自定义模块
Blockly.Blocks[blockname] = {
    init: function () {
        this.jsonInit(jsondesc);
    }
}

// 为自定义块添加js语言生成器
javascriptGenerator[blockname] = function (block) {
    const value_val1 = javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC); //学生代号
    if(value_val1.includes(" ")){
      message.destroy()
      message.error("导入时的素材代号不应含有空格")
    }
    const value_val2 = javascriptGenerator.valueToCode(block, 'val2', javascriptGenerator.ORDER_ATOMIC); // idle
    const value_val3 = javascriptGenerator.valueToCode(block, 'val3', javascriptGenerator.ORDER_ATOMIC); // customName
    let value_val4 = javascriptGenerator.valueToCode(block, 'val4', javascriptGenerator.ORDER_ATOMIC);// 图片名列表

    const dropdown_drop1 = block.getFieldValue('drop1');//导入命令

    const number_num1 = block.getFieldValue('num1');//缩放比例

    if(value_val1.length==0||value_val2.length==0||value_val3.length==0||value_val4.length==0){
      // 如果该字符串参数空内没有任何变量，忽略掉本代码块
      return ``
    }

    // 生成逗号图片名
    value_val4=value_val4.split(" ").join(",")


    return `
if(importArea){
    stagelist.push(\`load ${dropdown_drop1} \${${value_val1}} ${number_num1} \${${value_val2}} \${${value_val3}} [\${${value_val4}}]\`);
}
`

}

