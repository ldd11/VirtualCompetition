export function keepCursorEnd(obj) {
  // ie11 10 9 firefox safari
  if (window.getSelection) {
    // 解决firefox不获取焦点无法定位问题
    obj.focus();
    // 创建range
    const range = window.getSelection();
    // range 选择obj下所有子内容
    range.selectAllChildren(obj);
    // 光标移至最后
    range.collapseToEnd();
  } else if (document.selection) { // ie10 9 8 7 6 5
    // 创建选择对象
    const range = document.selection.createRange();
    // range定位到obj
    range.moveToElementText(obj);
    // 光标移至最后
    range.collapse(false);
    range.select();
  }
}

export function NewInputDom(target, node) {
  const input = document.createElement('input');
  input.type = 'text';
  input.value = node.data.label;
  input.id = `t-tree_input_${node.value}`;
  input.className = 't-tree__input';
  // input.style.fontSize = window.getComputedStyle(target).fontSize;
  // input.style.fontFamily = window.getComputedStyle(target).fontFamily;
  // input.style.color = window.getComputedStyle(target).color;
  // input.style.backgroundColor = window.getComputedStyle(target).backgroundColor;
  // input.style.textAlign = window.getComputedStyle(target).textAlign;
  // input.style.lineHeight = window.getComputedStyle(target).lineHeight;
  // input.style.boxSizing = 'border-box';

  return input;
}

function scrollIntoView(tTree, dom) {
  // console.log(`execute scrollIntoView ${dom}`);

  // support IE 7 / 8
  if (typeof Element === 'undefined' || typeof HTMLElement === 'undefined') {
    const contRect = tTree.getBoundingClientRect();
    const findMeRect = dom.getBoundingClientRect();
    if (findMeRect.top < contRect.top || findMeRect.bottom > contRect.bottom
      || findMeRect.right > contRect.right || findMeRect.left < contRect.left) {
      dom.scrollIntoView();
    }
    return;
  }
  // CC-BY jocki84@googlemail.com, https://gist.github.com/jocki84/6ffafd003387179a988e
  if (!Element.prototype.scrollIntoViewIfNeeded) {
    Element.prototype.scrollIntoViewIfNeeded = function (centerIfNeeded) {
      function makeRange(start, length) {
        return { start, length, end: start + length };
      }

      function coverRange(inner, outer) {
        if (
          centerIfNeeded === false
          || (outer.start < inner.end && inner.start < outer.end)
        ) {
          return Math.max(
            inner.end - outer.length,
            Math.min(outer.start, inner.start)
          );
        }
        return (inner.start + inner.end - outer.length) / 2;
      }

      function makePoint(x, y) {
        return {
          x,
          y,
          translate: function translate(dX, dY) {
            return makePoint(x + dX, y + dY);
          }
        };
      }

      function absolute(elem, pt) {
        while (elem) {
          pt = pt.translate(elem.offsetLeft, elem.offsetTop);
          elem = elem.offsetParent;
        }
        return pt;
      }

      let target = absolute(this, makePoint(0, 0));
      const extent = makePoint(this.offsetWidth, this.offsetHeight);
      let elem = this.parentNode;
      let origin;

      while (elem instanceof HTMLElement) {
        // Apply desired scroll amount.
        origin = absolute(elem, makePoint(elem.clientLeft, elem.clientTop));
        elem.scrollLeft = coverRange(
          makeRange(target.x - origin.x, extent.x),
          makeRange(elem.scrollLeft, elem.clientWidth)
        );
        elem.scrollTop = coverRange(
          makeRange(target.y - origin.y, extent.y),
          makeRange(elem.scrollTop, elem.clientHeight)
        );

        // Determine actual scroll amount by reading back scroll properties.
        target = target.translate(-elem.scrollLeft, -elem.scrollTop);
        elem = elem.parentNode;
      }
    };
  }
  dom.scrollIntoViewIfNeeded();
}

export function scrollIntoViewById(ids) {
  if (ids && ids.length > 0) {
    // find first item to scroll
    const tTree = document.querySelector('.t-tree');
    let dom = tTree.querySelector(`[data-value="${ids[0]}"]`);
    if (!dom) {
      setTimeout(() => {
        dom = tTree.querySelector(`[data-value="${ids[0]}"]`);
        if (dom) {
          scrollIntoView(tTree, dom);
        } else {
          // console.log('settimeout find target dom');
        }
      }, 500);
      // const list = tTree.lastElementChild;
      // const lastTreeItem = list.lastElementChild;
      // scrollIntoView(lastTreeItem);
      return;
    }
    scrollIntoView(tTree, dom);
  }
}

export function getElementPosition(element) {
  let x = 0;
  let y = 0;
  // while (element) {
  //   x += element.offsetLeft - element.scrollLeft + element.clientLeft;
  //   y += element.offsetTop - element.scrollTop + element.clientTop;
  //   element = element.offsetParent;
  // }
  x = element.getBoundingClientRect().top;
  y = element.getBoundingClientRect().left;
  return { x, y };
}

export function findTreeItemElement(target, className) {
  if (target.classList.contains('t-tree')) return null;
  if (target.classList.contains(className)) {
    return target;
  } else if (target.parentElement) {
    return findTreeItemElement(target.parentElement, className);
  } else {
    return null;
  }
}

export function debounce(func, delay) {
  let timer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

export function throttle(func, delay) {
  let timer = null;
  return function () {
    const context = this;
    const args = arguments;
    if (!timer) { // 如果定时器不存在
      func.apply(context, args); // 立即执行函数
      timer = setTimeout(() => {
        timer = null;
      }, delay);
    }
  };
}
