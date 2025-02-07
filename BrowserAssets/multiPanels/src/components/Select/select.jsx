import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { EventMsg } from '@/utils/EventMsg';
import EventUtil from '@/utils/EventUtil';

const prefixCls = 'tge';

const DEFAULT_PLACEHOLDER_STRING = '请选择';
class Select extends React.Component {
  static defaultProps = {
    options: [],
    value: undefined,
    placeholder: undefined
  };

  static propTypes = {
    options: PropTypes.array,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    placeholder: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      selected: this.parseValue(props.value, props.options) || {
        label: typeof props.placeholder === 'undefined' ? DEFAULT_PLACEHOLDER_STRING : props.placeholder,
        value: ''
      },
      isOpen: false
    };
    this.mounted = true;
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.fireChangeEvent = this.fireChangeEvent.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick, false);
    EventUtil.on(EventMsg.SWITCH_HOVER, this.handleSwitchHover);
  }

  handleSwitchHover = (data) => {
    if (!data.isHover) {
      // 鼠标离开页面区域
      this.setState({
        isOpen: false,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { options, value } = this.props;
    if (nextProps.options !== options || nextProps.value !== value) {
      if (nextProps.value === null || nextProps.value === undefined) {
        this.setState({
          selected: {
            label: typeof nextProps.placeholder === 'undefined' ? DEFAULT_PLACEHOLDER_STRING : nextProps.placeholder,
            value: ''
          }
        });
      } else {
        const selected = this.parseValue(nextProps.value, nextProps.options);
        if (selected && selected !== this.state.selected) {
          this.setState({
            selected
          });
        }
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    document.removeEventListener('click', this.handleDocumentClick, false);
    EventUtil.off(EventMsg.SWITCH_HOVER, this.handleSwitchHover);
  }

  handleMouseDown = (event) => {
    const { onFocus, disabled } = this.props;
    const { isOpen } = this.state;
    if (onFocus && typeof onFocus === 'function') {
      onFocus(isOpen);
    }
    if (event.type === 'mousedown' && event.button !== 0) return;
    event.stopPropagation();
    event.preventDefault();

    if (!disabled) {
      this.setState({
        isOpen: !isOpen
      }, () => {
        if (!isOpen && this.selected) {
          this.ul.scrollTop = this.selected.offsetTop;
        }
      });
    }
  }

  handleDocumentClick = (event) => {
    if (this.mounted) {
      if (!ReactDOM.findDOMNode(this).contains(event.target)) {
        if (this.state.isOpen) {
          this.setState({
            isOpen: false
          });
        }
      }
    }
  }

  fireChangeEvent = (newState) => {
    const { selected } = this.state;
    const { onChange } = this.props;
    if (newState.selected !== selected && onChange) {
      onChange(newState.selected);
    }
  }

  setValue = (value, label) => {
    const newState = {
      selected: {
        value,
        label
      },
      isOpen: false
    };
    this.fireChangeEvent(newState);
    this.setState(newState);
  }

  isValueSelected = () => typeof this.state.selected === 'string' || this.state.selected.value !== ''

  parseValue(value, options) {
    let option;

    if (typeof value === 'string') {
      for (let i = 0, num = options.length; i < num; i++) {
        if (options[i].type === 'group') {
          const match = options[i].items.filter(item => item.value === value);
          if (match.length) {
            option = match[0];
          }
        } else if (typeof options[i].value !== 'undefined' && options[i].value === value) {
          option = options[i];
        }
      }
    }
    return option || value;
  }

  buildMenu() {
    const { options } = this.props;
    const ops = options.map(option => this.renderOption(option));

    return ops.length ? ops : <div className={`${prefixCls}-select-noresult`}>No options found</div>;
  }

  renderOption(option) {
    const { selected } = this.state;
    let value = option.value;
    if (typeof value === 'undefined') {
      value = option.label || option;
    }
    const label = option.label || option.value || option;

    const classes = {
      [`${prefixCls}-dropdown-item`]: true,
      [option.className]: !!option.className,
      selected: value === selected.value || value === selected
    };

    const optionClass = classNames(classes);

    return (
      <li
        key={option.key}
        className={optionClass}
        onMouseDown={this.setValue.bind(this, value, label)}
        onClick={this.setValue.bind(this, value, label)}
        ref={el => classes.selected && (this.selected = el)}
      >
        <div className={`${prefixCls}-dropdown-item-text`}>{label}</div>
      </li>
    );
  }


  render() {
    const {
      disabled, controlClassName, placeholderClassName, menuClassName, arrowClassName, className, ...other
    } = this.props;
    const { selected, isOpen } = this.state;
    const disabledClass = disabled ? 'disabled' : '';
    const placeHolderValue = typeof selected === 'string' ? selected : selected.label;
    const dropdownClass = classNames({
      [`${prefixCls}-select`]: true,
      [className]: !!className,
      expand: isOpen,
      [disabledClass]: !!disabledClass
    });
    const controlClass = classNames({
      [`${prefixCls}-select-input`]: true,
      [controlClassName]: !!controlClassName
    });
    const placeholderClass = classNames({
      [`${prefixCls}-select-placeholder`]: true,
      [placeholderClassName]: !!placeholderClassName,
      selected: this.isValueSelected()
    });
    const menuClass = classNames({
      [`${prefixCls}-dropdown-list`]: true,
      [menuClassName]: !!menuClassName
    });
    const arrowClass = classNames({
      [`${prefixCls}-select-input-icon`]: true,
      [arrowClassName]: !!arrowClassName
    });

    const value = (
      <div className={placeholderClass}>
        {placeHolderValue}
      </div>
    );
    const menu = isOpen ? (
      <div className={`${prefixCls}-dropdown`}>
        <div className={`${prefixCls}-dropdown-bd`}>
          <ul className={menuClass} ref={el => this.ul = el}>
            {this.buildMenu()}
          </ul>
        </div>
      </div>
    ) : null;

    return (
      <div className={dropdownClass} {...other}>
        <div className={controlClass} onMouseDown={this.handleMouseDown}>
          <span className={`${prefixCls}-select-input-left`} />{value}<span className={`${prefixCls}-select-input-right`} />
          <i className={arrowClass} />
        </div>
        {menu}
      </div>
    );
  }
}

export default Select;
