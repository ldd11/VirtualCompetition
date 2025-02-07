import FeatureManager from '@/blockly/toolbox/FeatureManager';

import { generateComment } from "./blocklyUtil";

const { Blockly } = window;

Blockly.JavaScript.funcMain = function (block) {
  const insideCodes = Blockly.JavaScript.statementToCode(block, 'DO');
  const runtimeClass = FeatureManager.getRobotRuntimeName();
  return `${generateComment(block)}using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace TGE
{
  public class UserCode : ${runtimeClass}
  {
    // Insert Variables and Lists Above
    private object function_result = null;
    private void Start()
    {
      InitRuntime();
      
      try
      {
        // Insert Init Code Above
      }
      catch (Exception e)
      {
        // Catch Exception
      }

      StartCoroutine(RunBlockLogic());
    }

    private IEnumerator RunBlockLogic()
    {
      Reset();
      ${insideCodes}
      yield return null;
    }
    
    // Insert Custom Code Above
  }
}`;
};

Blockly.JavaScript.onRecvBroadcast = function (block) {
  const functionName = Blockly.JavaScript.variableDB_.getDistinctName(
    'OnRecvBroadcastFunction',
    Blockly.Variables.NAME_TYPE
  );
  const msg = Blockly.JavaScript.valueToCode(
    block,
    'msg',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 'Hi';
  const insideCodes = Blockly.JavaScript.statementToCode(block, 'DO');
  return `${generateComment(block)}OnRecvBroadcast(GetString(${msg}), ${functionName});
    private IEnumerator ${functionName}()
    {
      ${generateComment(block)}
      if (false)
      {
        yield return null;
      }

      if (IsUseDeterministicPhysics())
      {
        yield return SkipOneFixedUpdateAndDoNothing();
      }

      ${insideCodes}
    }\n`;
};

Blockly.JavaScript.sendBroadcast = function (block) {
  const msg = Blockly.JavaScript.valueToCode(
    block,
    'msg',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 'Hi';
  return `${generateComment(block)}yield return SendBroadcast(GetString(${msg}));\n`;
};

Blockly.JavaScript.print = function (block) {
  const msg = Blockly.JavaScript.valueToCode(
    block,
    'msg',
    Blockly.JavaScript.ORDER_FUNCTION_CALL
  ) || 'Hi';
  return `${generateComment(block)}Debug.Log(${msg});\n`;
};
