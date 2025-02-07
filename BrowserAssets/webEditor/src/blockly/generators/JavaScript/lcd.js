import { generateComment } from "./blocklyUtil";

const { Blockly } = window;

Blockly.JavaScript.setLCDBackground = function (block) {
    const id = block.getFieldValue('LCD');
    const color = block.getFieldValue('color');
    return `${generateComment(block)}SetBackgroundColor("${id}", "${color}");\n`;
};

Blockly.JavaScript.LCDClear = function (block) {
    const id = block.getFieldValue('LCD');
    return `${generateComment(block)}ClearDisplayScreen("${id}");\n`;
};

Blockly.JavaScript.setLCDFont = function (block) {
    const id = block.getFieldValue('LCD');
    const fontSize = block.getFieldValue('font_size');
    const fontColor = block.getFieldValue('color');

    return `${generateComment(block)}SetFontSizeAndColor("${id}", "${fontSize}", "${fontColor}");\n`
};

Blockly.JavaScript.rotateLCDFont = function (block) {
    const id = block.getFieldValue('LCD');
    const angle = block.getFieldValue('angle');

    return `${generateComment(block)}RotateFont("${id}",  GetInt(${angle}));\n`;
};

Blockly.JavaScript.LCDPrint = function (block) {
    const id = block.getFieldValue('LCD');
    const content = Blockly.JavaScript.valueToCode(
        block,
        'content',
        Blockly.JavaScript.ORDER_FUNCTION_CALL
    );

    return `${generateComment(block)}LCDPrint("${id}", GetString(${content}));\n`;
};

Blockly.JavaScript.LCDPrintln = function (block) {
    const id = block.getFieldValue('LCD');
    const content = Blockly.JavaScript.valueToCode(
        block,
        'content',
        Blockly.JavaScript.ORDER_FUNCTION_CALL
    );

    return `${generateComment(block)}LCDPrintln("${id}", GetString(${content}));\n`;
};