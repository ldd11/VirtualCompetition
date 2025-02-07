
Blockly.Blocks.variablesSet = {
    init: function() {
        this.jsonInit({
            type: 'variablesSet',
            message0: Blockly.Msg.PROCESSING_VARIABLES_SET,
            args0: [
                {
                    "type": "field_variable",
                    "name": "varName",
                    "variable": "%{BKY_VARIABLES_DEFAULT_NAME}",
                    "variableTypes": ["Variable", ""],
                    "defaultType": 'Variable',
                },
                {
                    type: 'input_value',
                    name: 'value',
                    check: ['Number','Boolean', 'String']
                }
            ],
            inputsInline: true,
            previousStatement: null,
            nextStatement: null,
            colour: Blockly.Msg.VIRTUALHARDWARE_HEX_VARIABLES,
        });
    },
};

Blockly.Blocks.variablesGet = {
    init: function() {
        this.jsonInit({
            type: 'variablesGet',
            message0: Blockly.Msg.PROCESSING_VARIABLES_GETGLOBAL,
            args0: [
                {
                    "type": "field_variable",
                    "name": "varName",
                    "variable": Blockly.Msg.VARIABLES_DEFAULT_NAME,
                    "variableTypes": ["Variable", ""],
                    "defaultType": 'Variable',
                }
            ],
            inputsInline: true,
            output: null,
            colour:  Blockly.Msg.VAL_1,
        })
    },
};

Blockly.Blocks.listsGet = {
    init: function() {
        this.jsonInit({
            type: 'listsGet',
            message0: Blockly.Msg.PROCESSING_LISTS_GETGLOBAL,
            args0: [
                {
                    "type": "field_variable",
                    "name": "lists",
                    "variable": Blockly.Msg.VARIABLES_DEFAULT_NAME,
                    "variableTypes": ["Array"],
                    "defaultType": 'Array',
                }
            ],
            inputsInline: true,
            output: null,
            colour: Blockly.Msg.VAL_1
        });
    },
};

Blockly.Blocks.easy_text_number = {
    init: function() {
        this.jsonInit({
            type: 'easy_text_number',
            message0: "%1",
            args0: [{
                type: "field_input",
                name: "text_number",
            }],
            output: [
                "Boolean",
                "Number",
                "String"
            ],
            inputsInline: true,
            colour: Blockly.Msg.VIRTUALHARDWARE_HEX_VARIABLES
        });
    }
};

Blockly.Blocks.listsAppend = {
    init: function() {
        this.jsonInit({
            type: 'listsAppend',
            message0: Blockly.Msg.PROCESSING_LISTS_APPEND,
            args0: [
                {
                    type: 'input_value',
                    name: 'value',
                },
                {
                  type: 'input_value',
                  name: 'lists',
                  check: 'Array'
                },
            ],
            inputsInline: true,
            previousStatement: null,
            nextStatement: null,
            colour: Blockly.Msg.VIRTUALHARDWARE_HEX_VARIABLES,
        });
    },
};

Blockly.Blocks.listsRemoveNthElement = {
    init: function() {
        this.jsonInit({
            type: 'listsRemoveNthElement',
            message0: Blockly.Msg.PROCESSING_LISTS_REMOVENTHELEMENT,
            args0: [
                {
                  type: 'input_value',
                  name: 'lists',
                  check: 'Array'
                },
                {
                    type: 'input_value',
                    name: 'nth'
                }
            ],
            inputsInline: true,
            previousStatement: null,
            nextStatement: null,
            colour: Blockly.Msg.VIRTUALHARDWARE_HEX_VARIABLES,
        });
    },
};

Blockly.Blocks.listsRemoveAll = {
    init: function() {
        this.jsonInit({
            type: 'listsRemoveAll',
            message0: Blockly.Msg.PROCESSING_LISTS_REMOVEALL,
            args0: [
                {
                  type: 'input_value',
                  name: 'lists',
                  check: 'Array'
                }
            ],
            inputsInline: true,
            previousStatement: null,
            nextStatement: null,
            colour: Blockly.Msg.VIRTUALHARDWARE_HEX_VARIABLES,
        });
    },
};

Blockly.Blocks.listsInsertElementBeforeNthElement = {
    init: function() {
        this.jsonInit({
            type: 'listsInsertElementBeforeNthElement',
            message0: Blockly.Msg.PROCESSING_LISTS_INSERTELEMENTBEFORENTHELEMENT,
            args0: [
                {
                  type: 'input_value',
                  name: 'lists',
                  check: 'Array'
                },
                {
                    type: 'input_value',
                    name: 'nth'
                },
                {
                    type: 'input_value',
                    name: 'value'
                }
            ],
            inputsInline: true,
            previousStatement: null,
            nextStatement: null,
            colour: Blockly.Msg.VIRTUALHARDWARE_HEX_VARIABLES,
        });
    },
};

Blockly.Blocks.listsReplaceNthElement = {
    init: function() {
        this.jsonInit({
            type: 'listsReplaceNthElement',
            message0: Blockly.Msg.PROCESSING_LISTS_REPLACENTHELEMENT,
            args0: [
                {
                  type: 'input_value',
                  name: 'lists',
                  check: 'Array'
                },
                {
                    type: 'input_value',
                    name: 'nth'
                },
                {
                    type: 'input_value',
                    name: 'value'
                }
            ],
            inputsInline: true,
            previousStatement: null,
            nextStatement: null,
            colour: Blockly.Msg.VIRTUALHARDWARE_HEX_VARIABLES,
        });
    },
};

Blockly.Blocks.listsNthElement = {
    init: function() {
        this.jsonInit({
            type: 'listsNthElement',
            message0: Blockly.Msg.PROCESSING_LISTS_NTHELEMENT,
            args0: [
                {
                  type: 'input_value',
                  name: 'lists',
                  check: 'Array'
                },
                {
                    type: 'input_value',
                    name: 'nth'
                }
            ],
            inputsInline: true,
            output: null,
            colour: Blockly.Msg.VIRTUALHARDWARE_HEX_VARIABLES,
        });
    },
};

Blockly.Blocks.listsFirstPosOfElementAppears = {
    init: function() {
        this.jsonInit({
            type: 'listsFirstPosOfElementAppears',
            message0: Blockly.Msg.PROCESSING_LISTS_FIRSTPOSOFELEMENTAPPEARS,
            args0: [
                {
                  type: 'input_value',
                  name: 'lists',
                  check: 'Array'
                },
                {
                    type: 'input_value',
                    name: 'value'
                }
            ],
            inputsInline: true,
            output: null,
            colour: Blockly.Msg.VIRTUALHARDWARE_HEX_VARIABLES,
        });
    },
};

Blockly.Blocks.listsElementsNum = {
    init: function() {
        this.jsonInit({
            type: 'listsElementsNum',
            message0: Blockly.Msg.PROCESSING_LISTS_ELEMENTSNUM,
            args0: [
                {
                  type: 'input_value',
                  name: 'lists',
                  check: 'Array'
                },
            ],
            inputsInline: true,
            output: null,
            colour: Blockly.Msg.VIRTUALHARDWARE_HEX_VARIABLES,
        });
    },
};

Blockly.Blocks.listsContainsElement = {
    init: function() {
        this.jsonInit({
            type: 'listsContainsElement',
            message0: Blockly.Msg.PROCESSING_LISTS_CONTAINSELEMENT,
            args0: [
                {
                  type: 'input_value',
                  name: 'lists',
                  check: 'Array'
                },
                {
                    type: 'input_value',
                    name: 'value'
                }
            ],
            inputsInline: true,
            output: 'Boolean',
            colour: Blockly.Msg.VIRTUALHARDWARE_HEX_VARIABLES,
        });
    },
};
