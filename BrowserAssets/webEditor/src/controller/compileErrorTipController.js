import { EDITOR_CALL } from "@/runtime/constant/index";
import EventUtil from "@/utils/EventUtil";
import CompileErrorTipPng from "@/assets/images/compileErrorTip.png";

class CompileErrorTipController {
  reset = () => {
    this.blockIds = [];
    this.realTipBlocksAndSvgElements = [];
    this.svgElement = null;
  };

  init = () => {
    this.initEvent();
    this.reset();
  };

  initEvent = () => {
    EventUtil.on(EDITOR_CALL.UPDATE_COMPILE_ERROR_INFO, this.updateCompileErrorInfo);
    EventUtil.on(EDITOR_CALL.CENTER_ON_ERROR_BLOCK, this.centerOnErrorBlock);
    EventUtil.on(EDITOR_CALL.REMOVE_COMPILE_ERROR_TIPS, this.removeCompileErrorTips);
  };

  uninit = () => {
    this.uninitEvent();
    this.reset();
  };

  uninitEvent = () => {
    EventUtil.off(EDITOR_CALL.UPDATE_COMPILE_ERROR_INFO, this.updateCompileErrorInfo);
    EventUtil.off(EDITOR_CALL.CENTER_ON_ERROR_BLOCK, this.centerOnErrorBlock);
    EventUtil.off(EDITOR_CALL.REMOVE_COMPILE_ERROR_TIPS, this.removeCompileErrorTips);
  };

  updateCompileErrorInfo = (data) => {
    if (!data) {
      return;
    }

    this.blockIds = [];
    for (let i = 0; i < data.length; i++) {
      const blockId = data[i].blockId;
      this.blockIds.push(blockId);
    }
    console.log("blockIds: ", this.blockIds);

    this.refreshCompileErrorTips();
  };

  centerOnErrorBlock = () => {
    if (this.realTipBlocksAndSvgElements.length <= 0) {
      return;
    }

    const realTipBlock = this.realTipBlocksAndSvgElements[0].block;
    if (realTipBlock) {
      Blockly.mainWorkspace.centerOnBlock(realTipBlock.id);
    }
  };

  removeCompileErrorTips = () => {
    for (let i = 0; i < this.realTipBlocksAndSvgElements.length; i++) {
      const realTipBlockAndSvgElement = this.realTipBlocksAndSvgElements[i];
      const realTipBlock = realTipBlockAndSvgElement.block;
      const svgElement = realTipBlockAndSvgElement.svg;
      if (realTipBlock) {
        realTipBlock.getSvgRoot().removeChild(svgElement);
      }
    }

    this.realTipBlocksAndSvgElements = [];
  };

  // 通过blockId查找并返回实际显示tip的积木Id（处理父积木折叠情况）
  getRealTipBlockIdByBlockId = (blockId) => {
    var block = Blockly.mainWorkspace.getBlockById(blockId);

    if (!block) {
      return null;
    }

    var parentBlocks = [];
    var currentBlock = block;
    var parentBlock = currentBlock.getParent();
    while (parentBlock) {
      if (parentBlock.nextConnection) {
        var targetBlock = parentBlock.nextConnection.targetBlock();
        if (targetBlock !== currentBlock) {
          parentBlocks.push(parentBlock);
        }
      } else {
        parentBlocks.push(parentBlock);
      }
      currentBlock = parentBlock;
      parentBlock = currentBlock.getParent();
    }

    for (let i = parentBlocks.length - 1; i >= 0; i--) {
      if (parentBlocks[i].isCollapsed()) {
        return parentBlocks[i].id;
      }
    }

    return blockId;
  };

  refreshCompileErrorTips = () => {
    this.removeCompileErrorTips();

    const realTipBlockIds = [];
    for (let j = 0; j < this.blockIds.length; j++) {
      var realTipBlockId = this.getRealTipBlockIdByBlockId(this.blockIds[j]);
      if (realTipBlockIds.indexOf(realTipBlockId) === -1) {
        realTipBlockIds.push(realTipBlockId);
      }
    }

    for (let k = 0; k < realTipBlockIds.length; k++) {
      const realTipBlock = Blockly.mainWorkspace.getBlockById(realTipBlockIds[k]);
      if (realTipBlock) {
        const svgElement = this.getSvgElement();
        svgElement.setAttribute("x", realTipBlock.width + 20);
        svgElement.setAttribute("y", 5);
        realTipBlock.getSvgRoot().appendChild(svgElement);
        this.realTipBlocksAndSvgElements.push({block: realTipBlock, svg: svgElement});
      }
    }
  };

  getSvgElement = () => {
    if (!this.svgElement) {
      const svgNS = "http://www.w3.org/2000/svg";

      this.svgElement = document.createElementNS(svgNS, "svg");
      this.svgElement.setAttribute("xmlns", svgNS);
      this.svgElement.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
      this.svgElement.setAttribute("width", "360");
      this.svgElement.setAttribute("height", "34");
      this.svgElement.setAttribute("viewBox", "0 0 360 34");

      const imageElement = document.createElementNS(svgNS, "image");
      imageElement.setAttribute("href", CompileErrorTipPng);
      imageElement.setAttribute("x", "0");
      imageElement.setAttribute("y", "0");
      imageElement.setAttribute("width", "360");
      imageElement.setAttribute("height", "34");
      this.svgElement.appendChild(imageElement);
    }

    return this.svgElement.cloneNode(true);
  };
}

export default CompileErrorTipController;
