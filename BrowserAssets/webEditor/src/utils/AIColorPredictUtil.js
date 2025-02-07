import { EDITOR_CALL } from "@/runtime/constant/index";
import EventUtil from "./EventUtil";

class AIColorPredictUtil {
  dropdownData = [{ name: '无', value: 'empty' }];

  init() {
    const _this = this;
    Blockly.Extensions.register('dynamic_learned_color_extension', function () {
      this.getInput('learned_color').appendField(
        new Blockly.FieldDropdown(() => {
          const result = _this.dropdownData.map(data => [
            data.name,
            data.value
          ]);
          return result;
        }),
        'learned_color'
      );
    });
  }

  setDropdownData(data) {
    const removeData = [];
    const len = this.dropdownData.length;
    for (let i = 0; i < len; i += 1) {
      const target = this.dropdownData[i];
      if (data.find(d => d.value === target.value) === undefined) {
        removeData.push(target);
      }
    }
    // EventUtil.emit(EDITOR_CALL.UPDATE_DROPDOWN, {
    //   fieldName: 'learned_color',
    //   removeData
    // });
    // console.log('set dropdown data', data, removeData);
    this.dropdownData = data;
  }
}

const instance = new AIColorPredictUtil();

export default instance;
