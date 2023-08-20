import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

// 定义JSON格式自定义模块
let blockname="b_text_set"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "对话 [ 说话人姓名 %1 部门 %2 说话内容 %3 ]等点击",
    "args0": [
      {
        "type": "input_value",
        "name": "val1",
        "check": "String"
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
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "",
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
    const value_val1 = javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);
    const value_val2 = javascriptGenerator.valueToCode(block, 'val2', javascriptGenerator.ORDER_ATOMIC);
    const value_val3 = javascriptGenerator.valueToCode(block, 'val3', javascriptGenerator.ORDER_ATOMIC);
    if(value_val1.length==0||value_val2.length==0||value_val3.length==0){
      // 如果该字符串参数空内没有任何变量，忽略掉本代码块
      return ``
    }

    return `stagelist.push(\`t '\${${value_val1}}' '\${${value_val2}}' '\${${value_val3}}'\`);`
}

