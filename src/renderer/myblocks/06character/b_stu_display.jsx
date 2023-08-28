import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
import { students_datamap } from '../../datamap';

// 定义JSON格式自定义模块

// 带有映射的学生名
const jsondesc = {
    "type": "b_stu_display",
    "message0": "人物代号 %1 显示 %2",
    "args0": [
      {
        "type": "input_value",
        "name": "val1",
        "check": "String"
      },
      {
        "type": "field_dropdown",
        "name": "drop1",
        "options": [
            ["逐渐出现","show"],
            ["逐渐隐藏","hide"],
            ["直接出现","showD"],
            ["直接隐藏","hideD"],
        ]
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120,
    "tooltip": "人物默认亮度为0，请优先使用逐渐出现",
    "helpUrl": ""
  }

// 注入自定义模块
Blockly.Blocks['b_stu_display'] = {
    init: function () {
        this.jsonInit(jsondesc);
    }
}

// 为自定义块添加js语言生成器
javascriptGenerator['b_stu_display'] = function (block) {
    const value_val1 = javascriptGenerator.valueToCode(block, 'val1', javascriptGenerator.ORDER_ATOMIC);
    if(value_val1.length==0){
      // 如果该字符串参数空内没有任何变量，忽略掉本代码块
      return ``
    }
    const dropdown_drop1 = block.getFieldValue('drop1');

    return `stagelist.push(\`\${${value_val1}} ${dropdown_drop1}\`);`

    
}

