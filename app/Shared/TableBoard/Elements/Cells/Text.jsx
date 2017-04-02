/**
 * Text representing a table's td value with type text.
 * @module TableBoard/Elements/Table/Cells/Text
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';
import classNames from 'classnames';

import Checkbox from '../../../Elements/Checkbox';

export default class Text extends React.Component {
    constructor(props) {
        super(props);
        this.checkboxTrigger = this.checkboxTrigger.bind(this);
        this.expandTrigger = this.expandTrigger.bind(this);
    }
    render() {
        const {value, expansion, isExpand, test, selectable} = this.props,
            contentClass = classNames('test-table-cel-wrap', {
                'cont-with-checkbox': selectable
            }),
            buttonClass = classNames('expand-btn', {
                'expand': isExpand
            });
        const content = value === '' ? '-' : (
                <span className={contentClass}>{value}</span>
            ),
            expandButton = expansion ? (
                <button className={buttonClass} onClick={this.expandTrigger}>
                    <span className={isExpand ? 'sc-icon-down-arrow' : 'sc-icon-right-arrow'}></span>
                </button>
            ) : null,
            checkbox = selectable ? (
                <Checkbox id="selected" onChange={this.checkboxTrigger} value={test.isSelected} />
            ) : null;
        return (
            <span className={(expansion || selectable) ? 'expand-cell-wrap' : ''}>
                {expandButton}
                {checkbox}
                {content}
            </span>
        );
    }
    checkboxTrigger(id, value) {
        this.props.selectTrigger(false, value, this.props.test.id);
    }
    expandTrigger() {
        if (this.props.expansion) {
            this.props.expandTrigger();
        }
    }
}

Text.propTypes = {
    value: React.PropTypes.string,
    expandTrigger: React.PropTypes.func,
    expansion: React.PropTypes.bool,
    isExpand: React.PropTypes.bool,
    selectable: React.PropTypes.bool,
    selectTrigger: React.PropTypes.func,
    test: React.PropTypes.object
};
