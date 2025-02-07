const { Blockly } = window;

Blockly.JavaScript.list_dataset_num = function (block) {
  const datasetId = block.getFieldValue('dateSetData');
  const datasetName = block.getField('dateSetData').getText();
  const coordinate = block.getFieldValue('coordinate');
  return [
    `GetDataSetRowOrColNum("${datasetId}", "${datasetName}", "${coordinate}")`,
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ];
};

Blockly.JavaScript.list_dataset_getdata = function (block) {
  const datasetId = block.getFieldValue('dateSetData');
  const number = Blockly.JavaScript.valueToCode(
    block,
    'number',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  const coordinate = block.getFieldValue('coordinate');
  return [`GetDataSetTargetList("${datasetId}", GetInt(${number}) - 1, "${coordinate}")`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.list_dataset_getonedata = function (block) {
  const datasetId = block.getFieldValue('dateSetData');
  const row = Blockly.JavaScript.valueToCode(
    block,
    'row',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  const col = Blockly.JavaScript.valueToCode(
    block,
    'col',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 1;
  return [`GetDataSetTargetCell("${datasetId}", GetInt(${row}) - 1, GetInt(${col}) - 1)`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
