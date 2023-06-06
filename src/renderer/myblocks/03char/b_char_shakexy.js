import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import myCharer from 'renderer/models/charcmd';
import { wrapStr } from 'renderer/utils/DataTool';

// 定义JSON格式自定义模块
let blockname="b_char_shakexy"
// 带有映射的学生名
const jsondesc = {
    "type": `${blockname}`,
    "message0": "人物昵称 %1 随机方向 抖动%2秒，幅度 %3 频率 %4",
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
        "value": 0.5,
        "max": 1000,
        "precision": 0.1,
      },
      {
        "type": "field_number",
        "name": "num2",
        "min": -1000,
        "value": 20,
        "max": 1000,
        "precision": 0.1,
      },
      {
        "type": "field_number",
        "name": "num3",
        "min": -1000,
        "value": 6,
        "max": 1000,
        "precision": 0.1,
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
    const nickname = javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);
    
    const spendtime = block.getFieldValue('num1');
    const distance = block.getFieldValue('num2');
    const frequency = block.getFieldValue('num3');

    return `stagelist.push(\`${myCharer.shakerandom(wrapStr(nickname),distance,spendtime,frequency)}\`);`
}

