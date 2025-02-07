import { cloneDeep } from "lodash";
import { generateComment } from "../JavaScript/blocklyUtil";

const { Blockly } = window;

Blockly.FreeBuild = cloneDeep(Blockly.JavaScript);

// override
Blockly.FreeBuild.funcMain = function (block) {
  const insideCodes = Blockly.JavaScript.statementToCode(block, 'DO');
  return `${generateComment(block)}using System;
using System.Collections;
using System.Collections.Generic;
using SimpleJSON;
using UnityEngine;

namespace TGE
{
  public class RobotRuntime : FreeBuildRunTime
  {
    // Insert Variables and Lists Above
    private object function_result = null;
    private void Start() {

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

    private IEnumerator RunBlockLogic() {
      Reset();
      ${insideCodes}
      yield return null;
    }
    
    // Insert Custom Code Above
  }
}`;
};
