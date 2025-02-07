/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2013 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Angle input field.
 * @author fraser@google.com (Neil Fraser)
 */
import './field_angle.css';

('use strict');

goog.provide('Blockly.FieldAngle');

goog.require('Blockly.DropDownDiv');
goog.require('Blockly.FieldTextInput');
goog.require('goog.math');
goog.require('goog.userAgent');

/**
 * Class for an editable angle field.
 * @param {string} text The initial content of the field.
 * @param {Function=} opt_validator An optional function that is called
 *     to validate any constraints on what the user entered.  Takes the new
 *     text as an argument and returns the accepted text or null to abort
 *     the change.
 * @extends {Blockly.FieldTextInput}
 * @constructor
 */
Blockly.FieldAngle = function (text, opt_validator) {
  // Add degree symbol: "360°" (LTR) or "°360" (RTL)
  this.symbol_ = Blockly.utils.createSvgElement('tspan', {}, null);
  this.symbol_.appendChild(document.createTextNode('\u00B0'));

  Blockly.FieldAngle.superClass_.constructor.call(this, text, opt_validator);
  // this.addArgType('angle');
};
goog.inherits(Blockly.FieldAngle, Blockly.FieldTextInput);

/**
 * Round angles to the nearest 15 degrees when using mouse.
 * Set to 0 to disable rounding.
 */
Blockly.FieldAngle.ROUND = 1;

/**
 * Half the width of protractor image.
 */
Blockly.FieldAngle.PANEL_HALF = 150 / 2;
Blockly.FieldAngle.HALF = 110 / 2;
Blockly.FieldAngle.CLOCK_CURSOR_RADIUS = 14;

Blockly.FieldAngle.CLOCK_ARROW_TFX = -120;
Blockly.FieldAngle.CLOCK_ARROW_TFY = -66;
Blockly.FieldAngle.clockArrowX = 0;
Blockly.FieldAngle.clockArrowY = 0;

/* The following two settings work together to set the behaviour of the angle
 * picker.  While many combinations are possible, two modes are typical:
 * Math mode.
 *   0 deg is right, 90 is up.  This is the style used by protractors.
 *   Blockly.FieldAngle.CLOCKWISE = false;
 *   Blockly.FieldAngle.OFFSET = 0;
 * Compass mode.
 *   0 deg is up, 90 is right.  This is the style used by maps.
 *   Blockly.FieldAngle.CLOCKWISE = true;
 *   Blockly.FieldAngle.OFFSET = 90;
 */

/**
 * Angle increases clockwise (true) or counterclockwise (false).
 */
Blockly.FieldAngle.CLOCKWISE = true;

/**
 * Offset the location of 0 degrees (and all angles) by a constant.
 * Usually either 0 (0 = right) or 90 (0 = up).
 */
Blockly.FieldAngle.OFFSET = 0;

/**
 * Maximum allowed angle before wrapping.
 * Usually either 360 (for 0 to 359.9) or 180 (for -179.9 to 180).
 */
Blockly.FieldAngle.WRAP = 180;

/**
 * Radius of protractor circle.  Slightly smaller than protractor size since
 * otherwise SVG crops off half the border at the edges.
 */
Blockly.FieldAngle.RADIUS = Blockly.FieldAngle.HALF - 1;

/**
 * Clean up this FieldAngle, as well as the inherited FieldTextInput.
 * @return {!Function} Closure to call on destruction of the WidgetDiv.
 * @private
 */
Blockly.FieldAngle.prototype.dispose_ = function () {
  const thisField = this;
  return function () {
    Blockly.FieldAngle.superClass_.dispose_.call(thisField)();
    thisField.gauge_ = null;

    if (thisField.clickWrapper_) {
      Blockly.unbindEvent_(thisField.clickWrapper_);
    }
    if (thisField.downWrapper1_) {
      Blockly.unbindEvent_(thisField.downWrapper1_);
    }
    if (thisField.downWrapper2_) {
      Blockly.unbindEvent_(thisField.downWrapper2_);
    }
    if (thisField.moveWrapper1_) {
      Blockly.unbindEvent_(thisField.moveWrapper1_);
    }
    if (thisField.upWrapper1_) {
      Blockly.unbindEvent_(thisField.upWrapper1_);
    }
  };
};

/**
 * Show the inline free-text editor on top of the text.
 * @private
 */
Blockly.FieldAngle.prototype.showEditor_ = function () {
  const noFocus = goog.userAgent.MOBILE || goog.userAgent.ANDROID || goog.userAgent.IPAD;
  // Mobile browsers have issues with in-line textareas (focus & keyboards).
  Blockly.FieldAngle.superClass_.showEditor_.call(this, noFocus);
  // If there is an existing drop-down someone else owns, hide it immediately and clear it.
  Blockly.DropDownDiv.hideWithoutAnimation();
  Blockly.DropDownDiv.clearContent();
  const div = Blockly.DropDownDiv.getContentDiv();

  const svg = Blockly.utils.createSvgElement(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      'xmlns:html': 'http://www.w3.org/1999/xhtml',
      'xmlns:xlink': 'http://www.w3.org/1999/xlink',
      version: '1.1',
      height: `${Blockly.FieldAngle.PANEL_HALF * 2}px`,
      width: `${Blockly.FieldAngle.PANEL_HALF * 2}px`
    },
    div
  );

  const circle = Blockly.utils.createSvgElement(
    'circle',
    {
      cx: Blockly.FieldAngle.PANEL_HALF,
      cy: Blockly.FieldAngle.PANEL_HALF,
      r: Blockly.FieldAngle.RADIUS,
      class: 'angle-blocklyAngleCircle'
    },
    svg
  );

  const dot = Blockly.utils.createSvgElement(
    'circle',
    {
      cx: Blockly.FieldAngle.PANEL_HALF,
      cy: Blockly.FieldAngle.PANEL_HALF,
      r: 2,
      class: 'angle-blocklyCenterPoint'
    },
    svg
  );

  this.gauge_ = Blockly.utils.createSvgElement(
    'path',
    {
      class: 'angle-blocklyAngleGauge'
    },
    svg
  );

  const baseline = Blockly.utils.createSvgElement(
    'line',
    {
      x1: Blockly.FieldAngle.PANEL_HALF,
      y1: Blockly.FieldAngle.PANEL_HALF,
      x2: Blockly.FieldAngle.PANEL_HALF + Blockly.FieldAngle.RADIUS - 10,
      y2: Blockly.FieldAngle.PANEL_HALF,
      class: 'easycode-blocklyAngleBaseLine'
    },
    svg
  );

  // this.line_ = Blockly.utils.createSvgElement('line',{
  //   'x1': Blockly.FieldAngle.PANEL_HALF,
  //   'y1': Blockly.FieldAngle.PANEL_HALF,
  //   'class': 'angle-blocklyAngleLine'
  // }, svg);

  // Draw markers around the edge.
  for (let angle = 0; angle < 360; angle += 15) {
    Blockly.utils.createSvgElement(
      'line',
      {
        x1: Blockly.FieldAngle.PANEL_HALF + Blockly.FieldAngle.RADIUS,
        y1: Blockly.FieldAngle.PANEL_HALF,
        x2:
          Blockly.FieldAngle.PANEL_HALF
          + Blockly.FieldAngle.RADIUS
          - (angle % 45 == 0 ? 10 : 5),
        y2: Blockly.FieldAngle.PANEL_HALF,
        class:
          angle == 0 || angle == 90 || angle == 180 || angle == 270
            ? 'angle-blocklyAngleHeavyMarks'
            : 'angle-blocklyAngleMarks',
        transform: `rotate(${angle},${Blockly.FieldAngle.PANEL_HALF},${Blockly.FieldAngle.PANEL_HALF})`
      },
      svg
    );
  }

  const { CLOCK_ARROW_TFX } = Blockly.FieldAngle;
  const { CLOCK_ARROW_TFY } = Blockly.FieldAngle;
  this.clockArrowX = Blockly.FieldAngle.PANEL_HALF
    + Blockly.FieldAngle.RADIUS
    - Blockly.FieldAngle.CLOCK_CURSOR_RADIUS;
  this.clockArrowY = Blockly.FieldAngle.PANEL_HALF - Blockly.FieldAngle.CLOCK_CURSOR_RADIUS;

  this.clockCursor = Blockly.utils.createSvgElement(
    'circle',
    {
      cx: this.clockArrowX + Blockly.FieldAngle.CLOCK_CURSOR_RADIUS,
      cy: this.clockArrowY + Blockly.FieldAngle.CLOCK_CURSOR_RADIUS,
      r: Blockly.FieldAngle.CLOCK_CURSOR_RADIUS,
      class: 'angle-blocklyAngleDotbg'
    },
    svg
  );

  const position = `rotate(0 ${Blockly.FieldAngle.PANEL_HALF} ${
    Blockly.FieldAngle.PANEL_HALF
  }) translate(${CLOCK_ARROW_TFX + this.clockArrowX} ${CLOCK_ARROW_TFY
    + this.clockArrowY})`;
  this.clockArrow = Blockly.utils.createSvgElement(
    'path',
    {
      d:
        'M140.253,81.334c-2.555,1.187-8.344,3.711-11.584,4.974-1.242.484-.667-0.68-0.383-1.039,1.172-1.482,2.54-3.555,2.684-5.577,0.13-1.821-.869-3.537-1.728-4.871-0.495-.767-0.179-1.1.628-0.649,3.023,1.7,8.071,4.639,10.447,5.9C141.064,80.464,140.915,81.027,140.253,81.334Z',
      class: 'angle-blocklyAngleDot',
      transform: position
    },
    svg
  );

  // Blockly.DropDownDiv.setColour('#fff', '#fff');
  Blockly.DropDownDiv.showPositionedByBlock(this, this.sourceBlock_);

  this.clickWrapper_ = Blockly.bindEvent_(svg, 'click', this, () => {
    Blockly.WidgetDiv.hide();
    Blockly.DropDownDiv.hide();
  });

  this.downWrapper1_ = Blockly.bindEvent_(
    this.clockCursor,
    'mousedown',
    this,
    this.onMouseDown
  );
  this.downWrapper2_ = Blockly.bindEvent_(
    this.clockArrow,
    'mousedown',
    this,
    this.onMouseDown
  );

  this.moveWrapper1_ = Blockly.bindEvent_(
    svg,
    'mousemove',
    this,
    this.onMouseMove
  );
  this.upWrapper1_ = Blockly.bindEvent_(
    document,
    'mouseup',
    this,
    this.onMouseUp
  );
  // this.moveWrapper2_ =
  //     Blockly.bindEvent_(this.gauge_, 'mousemove', this,
  //     this.onMouseMove);

  this.updateGraph_();
};

Blockly.FieldAngle.prototype.onMouseDown = function (e) {
  this.mouseDown = true;
};

Blockly.FieldAngle.prototype.onMouseUp = function (e) {
  this.mouseDown = false;
};

/**
 * Set the angle to match the mouse's position.
 * @param {!Event} e Mouse move event.
 */
Blockly.FieldAngle.prototype.onMouseMove = function (e) {
  if (!this.mouseDown) return;
  const bBox = this.gauge_.ownerSVGElement.getBoundingClientRect();
  const dx = e.clientX - bBox.left - Blockly.FieldAngle.PANEL_HALF;
  const dy = e.clientY - bBox.top - Blockly.FieldAngle.PANEL_HALF;
  let angle = Math.atan(-dy / dx);
  if (isNaN(angle)) {
    // This shouldn't happen, but let's not let this error propogate further.
    return;
  }
  angle = goog.math.toDegrees(angle);
  // 0: East, 90: North, 180: West, 270: South.
  if (dx < 0) {
    angle += 180;
  } else if (dy > 0) {
    angle += 360;
  }
  if (Blockly.FieldAngle.CLOCKWISE) {
    angle = Blockly.FieldAngle.OFFSET + 360 - angle;
  } else {
    angle -= Blockly.FieldAngle.OFFSET;
  }
  if (Blockly.FieldAngle.ROUND) {
    angle = Math.round(angle / Blockly.FieldAngle.ROUND) * Blockly.FieldAngle.ROUND;
  }
  angle = this.callValidator(angle);
  if (Blockly.FieldTextInput && Blockly.FieldTextInput.htmlInput_) {
    Blockly.FieldTextInput.htmlInput_.value = angle;
    this.setValue(angle);
    this.validate_();
    this.resizeEditor_();
  }
};

/**
 * Insert a degree symbol.
 * @param {?string} text New text.
 */
Blockly.FieldAngle.prototype.setText = function (text) {
  Blockly.FieldAngle.superClass_.setText.call(this, text);
  if (!this.textElement_) {
    // Not rendered yet.
    return;
  }
  this.updateGraph_();
  // Insert degree symbol.
  if (this.sourceBlock_.RTL) {
    this.textElement_.insertBefore(this.symbol_, this.textElement_.firstChild);
  } else {
    this.textElement_.appendChild(this.symbol_);
  }
  // Cached width is obsolete.  Clear it.
  this.size_.width = 0;
};

/**
 * Redraw the graph with the current angle.
 * @private
 */
Blockly.FieldAngle.prototype.updateGraph_ = function () {
  if (!this.gauge_) {
    return;
  }
  const angleDegrees = Number(this.getText()) + Blockly.FieldAngle.OFFSET;
  let angleRadians = goog.math.toRadians(angleDegrees);
  const path = [
    'M ',
    Blockly.FieldAngle.PANEL_HALF,
    ',',
    Blockly.FieldAngle.PANEL_HALF
  ];
  let x2 = Blockly.FieldAngle.PANEL_HALF;
  let y2 = Blockly.FieldAngle.PANEL_HALF;
  if (!isNaN(angleRadians)) {
    const angle1 = goog.math.toRadians(Blockly.FieldAngle.OFFSET);
    const x1 = Math.cos(angle1) * Blockly.FieldAngle.RADIUS;
    const y1 = Math.sin(angle1) * -Blockly.FieldAngle.RADIUS;
    if (Blockly.FieldAngle.CLOCKWISE) {
      angleRadians = 2 * angle1 - angleRadians;
    }
    x2 += Math.cos(angleRadians) * Blockly.FieldAngle.RADIUS;
    y2 -= Math.sin(angleRadians) * Blockly.FieldAngle.RADIUS;
    // Don't ask how the flag calculations work.  They just do.
    let largeFlag = Math.abs(Math.floor((angleRadians - angle1) / Math.PI) % 2);
    if (Blockly.FieldAngle.CLOCKWISE) {
      largeFlag = 1 - largeFlag;
    }
    let sweepFlag = Number(Blockly.FieldAngle.CLOCKWISE);
    const value = angleDegrees % 360;
    // console.log(angleDegrees, value);
    if (value < 0) {
      largeFlag = 0;
      sweepFlag = 0;
    }
    path.push(
      ' l ',
      x1,
      ',',
      y1,
      ' A ',
      Blockly.FieldAngle.RADIUS,
      ',',
      Blockly.FieldAngle.RADIUS,
      ' 0 ',
      largeFlag,
      ' ',
      sweepFlag,
      ' ',
      x2,
      ',',
      y2,
      ' z'
    );
  }
  this.gauge_.setAttribute('d', path.join(''));

  this.clockCursor.setAttribute(
    'transform',
    `rotate(${angleDegrees}, ${Blockly.FieldAngle.PANEL_HALF}, ${Blockly.FieldAngle.PANEL_HALF})`
  );
  this.clockArrow.setAttribute(
    'transform',
    `rotate(${angleDegrees} ${Blockly.FieldAngle.PANEL_HALF} ${
      Blockly.FieldAngle.PANEL_HALF
    }) translate(${Blockly.FieldAngle.CLOCK_ARROW_TFX
      + this.clockArrowX} ${Blockly.FieldAngle.CLOCK_ARROW_TFY
      + this.clockArrowY})`
  );
};

/**
 * Ensure that only an angle may be entered.
 * @param {string} text The user's text.
 * @return {?string} A string representing a valid angle, or null if invalid.
 */
Blockly.FieldAngle.prototype.classValidator = function (text) {
  if (text === null) {
    return null;
  }
  let n = parseFloat(text || 0);
  if (isNaN(n)) {
    return null;
  }
  n %= 360;
  if (n < 0) {
    n += 360;
  }
  if (n > Blockly.FieldAngle.WRAP) {
    n -= 360;
  }
  return String(n);
};
