import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './index.less';

const prefixCls = 'pagination';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
  }

  isPrevEnabled = () => {
    const {
      currentPageIndex,
    } = this.props;
    return currentPageIndex > 0;
  };

  isNextEnabled = () => {
    const {
      totalExerciseItemCount,
      currentPageIndex,
      singlePageExerciseItemCount
    } = this.props;
    return currentPageIndex < (Math.ceil(totalExerciseItemCount / singlePageExerciseItemCount) - 1);
  };

  getCurrentPageExerciseItemIndexes = () => {
    const {
      totalExerciseItemCount,
      currentPageIndex,
      singlePageExerciseItemCount
    } = this.props;

    const currentPageExerciseItemIndexes = [];
    const currentPageExerciseItemIndexStart = singlePageExerciseItemCount * currentPageIndex;
    const currentPageExerciseItemIndexEnd = Math.min(currentPageExerciseItemIndexStart + singlePageExerciseItemCount, totalExerciseItemCount);
    for (let i = currentPageExerciseItemIndexStart; i < currentPageExerciseItemIndexEnd; i++) {
      currentPageExerciseItemIndexes.push(i + 1);
    }
    return currentPageExerciseItemIndexes;
  };

  changeExerciseItemIndex = (exerciseItemIndex) => {
    const {
      changeExerciseItemIndex
    } = this.props;
    changeExerciseItemIndex(exerciseItemIndex);
  };

  changePageIndex = (pageIndex) => {
    const {
      currentPageIndex,
      changePageIndex
    } = this.props;
    if (pageIndex != currentPageIndex) {
      changePageIndex(pageIndex);
    }
  };

  render() {
    const {
      currentExerciseItemIndex,
      currentPageIndex,
    } = this.props;

    return (
      <div className={`${prefixCls}`}>
        <div className={`${prefixCls}-ctrls prev ${this.isPrevEnabled() ? '' : 'disabled'}`} onClick={() => { this.changePageIndex(this.isPrevEnabled() ? (currentPageIndex - 1) : currentPageIndex); }} />
        <div className={`${prefixCls}-list`}>
          {
            this.getCurrentPageExerciseItemIndexes().map((index) => (
              <div className={`${prefixCls}-item ${(index - 1) == currentExerciseItemIndex ? 'active' : ''}`} key={index} onClick={() => { this.changeExerciseItemIndex(index - 1); }}>
                <span className={`${prefixCls}-item-label`}>{index}
                </span>
              </div>
            ))
          }
        </div>
        <div className={`${prefixCls}-ctrls next ${this.isNextEnabled() ? '' : 'disabled'}`} onClick={() => { this.changePageIndex(this.isNextEnabled() ? (currentPageIndex + 1) : currentPageIndex); }} />
      </div>
    );
  }
}

export default Pagination;
