import debounce from 'lodash/debounce';
import BlockFuncApi from '../../../runtime/BlockFuncApi';
import { JS_UNITY_CMD } from '../../../utils/NativeCall';
import { EDITOR_CALL } from '../../../runtime/constant/index';
import EventUtil from '../../../utils/EventUtil';

const { Blockly, goog } = window;

let caches = {};

function getAllDropdowns(block) {
  return block.inputList
    .map(input => input.fieldRow)
    .reduce((acc, cur) => acc.concat(cur), [])
    .filter(field => field instanceof Blockly.FieldDropdown);
}

function checkDropdownsHasUnknown(block) {
  const dropdowns = getAllDropdowns(block);
  const has = dropdowns.some(dropdown => dropdown.getValue() === '?');
  return has;
}

function callNotifyDropdownUnknowns() {
  if (Object.keys(caches).length === 0) {
    console.log('[dropdown_unknown] no need to call unity');
    return;
  }
  console.log('[dropdown_unknown] call unity:', caches);
  BlockFuncApi.callUnityApi(JS_UNITY_CMD.NotifyDropdownUnknowns, { caches });
  caches = {};
}

const debounced = debounce(callNotifyDropdownUnknowns, 100);

function dropdownUnknownHandler(block, hasUnknown) {
  // 延迟处理，避免频繁调用
  caches[block.id] = hasUnknown;

  debounced();

  // setblocksxml有个非常搞不懂的逻辑，底层用的settimeout(() => {setxml(x)},0)，导致block.svgPath_不一定有值
  setTimeout(() => {
    if (!block.svgPath_) {
      return;
    }

    const hexColour = block.getColour();
    const rgb = goog.color.hexToRgb(hexColour);
    const dropdowns = getAllDropdowns(block);
    if (hasUnknown) {
      block.setDisabled(true);

      block.svgPath_.setAttribute('stroke', '#000');

      dropdowns.forEach((dropdown) => {
        const border = dropdown.borderRect_;
        if (dropdown.getValue() === '?') {
          border.setAttribute('style', 'fill:#00000088;stroke:#f00;');
        } else {
          border.setAttribute('style', 'fill:#00000088;');
        }
      });
    } else {
      block.setDisabled(false);
      const hexDark = goog.color.rgbArrayToHex(goog.color.darken(rgb, 0.2));
      block.svgPath_.setAttribute('stroke', hexDark);
      dropdowns.forEach((dropdown) => {
        const border = dropdown.borderRect_;
        border.setAttribute('style', `fill:${hexColour};stroke:${hexColour};`);
      });
    }
  }, 0);
}

Blockly.Extensions.register('dropdown_unknown', function () {
  // get the block
  const block = this;
  // check block is in flyout
  if (this.workspace.isFlyout) {
    return;
  }

  checkDropdownsHasUnknown(block) && dropdownUnknownHandler(block, true);

  // setOnChange will override the original onChange function, but we still need it
  // onchange is the original onChange function
  const { onchange } = block;
  block.setOnChange((e) => {
    // console.error('[dropdown_unknown] onchange:', block.type, block.id, e);
    onchange && onchange.call(block);

    if (e instanceof Blockly.Events.Change) {
      if (e.blockId === block.id) {
        const has = checkDropdownsHasUnknown(block);
        dropdownUnknownHandler(block, has);
      }
    }
  });

  const handleUnknown = () => {
    dropdownUnknownHandler(block, checkDropdownsHasUnknown(block));
  };

  // dispose will be called when the block is deleted
  // append a dispose function to the original dispose function
  const { dispose } = block;
  block.dispose = () => {
    dispose && dispose.call(block);
    dropdownUnknownHandler(block, false);
    EventUtil.off(EDITOR_CALL.HANDLE_DROPDOWN_UNKNOWN, handleUnknown);
  };


  EventUtil.on(EDITOR_CALL.HANDLE_DROPDOWN_UNKNOWN, handleUnknown);
});
