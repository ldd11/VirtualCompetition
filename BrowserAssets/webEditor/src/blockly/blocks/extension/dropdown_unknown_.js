
const { Blockly } = window;

function checkDropdownsHasUnknown(block) {
  console.log('[dropdown_unknown] check:', block.type, block);

  const dropdowns = block.inputList
    .map(input => input.fieldRow)
    .reduce((acc, cur) => acc.concat(cur), [])
    .filter(field => field instanceof Blockly.FieldDropdown);

  console.log('[dropdown_unknown]', dropdowns.length, dropdowns);

  // check if any dropdown have a unknown option: ?
  // if yes, append a clickable button next to the block(using html, not dummyInput)
  // if no, remove the button
  return dropdowns.some((dropdown) => {
    const options = dropdown.getOptions();
    return options.some(option => option[0] === '?');
  });
}

class BlocklyButtonField extends Blockly.Field {
  constructor(text, onClick, displayText) {
    super(text);
    this.onClick = onClick;
    this.displayText = displayText;
    this.isButtonClicked = false;
  }

  init() {
    super.init();

    // debugger;
    // this.updateWidth();

    this.borderRect_ && this.borderRect_.setAttribute('width', 0),
    this.size_.width = 0;

    // get current button`s svg element
    const button = this.fieldGroup_.querySelector('rect');
    const textElement = this.fieldGroup_.querySelector('text');

    button.setAttribute('transform', 'translate(20, 0)');
    textElement.setAttribute('transform', 'translate(20, 0)');

    button.setAttribute('display', 'none');
    textElement.setAttribute('display', 'none');

    button.setAttribute('width', 0);
    button.setAttribute('height', 0);
    textElement.setAttribute('width', 0);
    textElement.setAttribute('height', 0);

    this.button = Blockly.utils.createSvgElement('rect', {
      rx: 4,
      ry: 4,
      x: 0,
      y: 0,
      // width should be dynamic, depends on the length of displayText
      width: 100,
      height: 16,
      style: 'fill:#ddd;stroke:#000;cursor:pointer;'
    }, null);


    this.textElement = Blockly.utils.createSvgElement('text', {
      class: 'blocklyText',
      x: 5,
      y: 8,
      style: 'font-size: 10pt; font-family: sans-serif; cursor: default;'
    },
    null);
    this.textElement.textContent = this.displayText;

    this.iconElement = Blockly.utils.createSvgElement('image', {
      class: 'blocklyIcon',
      x: 0,
      y: 0,
      height: 16,
      width: 16,
      style: 'cursor: default;'
    },
    null);


    this.textgroup = Blockly.utils.createSvgElement('g', {}, null);
    this.textgroup.appendChild(this.textElement);
    this.textgroup.appendChild(this.iconElement);


    this.textElement.setAttribute('y', 8);
    this.group = Blockly.utils.createSvgElement('g', {}, null);
    this.group.appendChild(this.button);
    this.group.appendChild(this.textgroup);
    this.mouseDownWrapper_ = Blockly.bindEvent_(this.button, 'mousedown', this, this.onMouseDown_);
  }

  onMouseDown_(e) {
    Blockly.DropDownDiv.hideWithoutAnimation();
    if (this.onClick) {
      this.onClick(e);
      this.isButtonClicked = !this.isButtonClicked;
      if (this.isButtonClicked) {
        this.button.setAttribute('style', 'fill:#aaa;stroke:#ccc;cursor:pointer;');
        // just show the icon element
        this.textElement.setAttribute('display', 'none');
        this.iconElement.setAttribute('display', 'block');
        this.button.setAttribute('width', 16);

        // test code
        setTimeout(() => {
          // set the unknown dropdown to the "!"
          const dropdowns = this.sourceBlock_.inputList
            .map(input => input.fieldRow)
            .reduce((acc, cur) => acc.concat(cur), [])
            .filter(field => field instanceof Blockly.FieldDropdown);

          dropdowns.forEach((dropdown) => {
            const options = dropdown.getOptions();
            const index = options.findIndex(option => option[0] === '?');
            if (index > -1) {
              options[index][0] = '!';
              dropdown.setValue('!');
            }
          });
        }, 1000);
      } else {
        this.button.setAttribute('style', 'fill:#ddd;stroke:#ccc;cursor:pointer;');
        // just show the text element
        this.textElement.setAttribute('display', 'block');
        this.textElement.textContent = this.displayText;
        this.iconElement.setAttribute('display', 'none');
        this.button.setAttribute('width', 100);
      }
    }
  }

  getSvgRoot() {
    const root = super.getSvgRoot();
    const x = -20;
    const y = 0;
    this.group.setAttribute('transform', `translate(${-x},${-y})`);
    root.appendChild(this.group);
    return root;
  }

  dispose() {
    Blockly.unbindEvent_(this.mouseDownWrapper_);
    super.dispose();
  }
}


function getButton(block) {
  block.appendDummyInput('errorTip')
    .appendField(new BlocklyButtonField('', () => {
      console.log('Button clicked');
    }, 'Hello World!'));
}


// define a blockly extension
Blockly.Extensions.register('dropdown_unknown_', function () {
  // get the block
  const block = this;
  if (checkDropdownsHasUnknown(block)) {
    getButton(block);

    // set the dummy input's width to 0
    block.inputList.forEach((input) => {
      if (input.name === 'errorTip') {
        console.log('[dropdown_unknown]==============================', input);
      }
    });
  }

  block.onchange = (e) => {
    if (e instanceof Blockly.Events.Change) {
      const hasErrorTip = block.inputList.some(input => input.name === 'errorTip');
      if (checkDropdownsHasUnknown(block)) {
        console.log('[dropdown_unknown] onchange hasUnknown');
        if (!hasErrorTip) {
          getButton(block);
        } else {
          block.removeInput('errorTip');
        }
      }
    } else {
      console.log('~!!!!!!!!!!!!!');
    //   block.removeInput('errorTip');
    }
  };
});
