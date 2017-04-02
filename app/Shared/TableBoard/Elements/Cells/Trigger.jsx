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

export default class Trigger extends React.Component {
    constructor(props) {
        super(props);
        this.checkboxTrigger = this.checkboxTrigger.bind(this);
        this.expandTrigger = this.expandTrigger.bind(this);
        this.onClick = this.onClick.bind(this);
    }
    render() {
        const {value, isExpand, expansion, test, selectable} = this.props,
            contentClass = classNames('test-table-cel-wrap', {
                'cont-with-checkbox': selectable
            }),
            buttonClass = classNames('expand-btn', {
                'expand': isExpand
            }),
            content = <a className={contentClass} onClick={this.onClick}>{value}</a>,
            button = expansion ? (
                <button className={buttonClass} onClick={this.expandTrigger}>
                    <span className={isExpand ? 'sc-icon-down-arrow' : 'sc-icon-right-arrow'} />
                </button>
            ) : null,
            checkbox = selectable ? (
                <Checkbox id="selected" onChange={this.checkboxTrigger} value={test.isSelected} />
            ) : null;
        return (
            <span className={expansion ? 'expand-cell-wrap' : ''}>
                {button}
                {checkbox}
                {content}
            </span>
        );
    }
    checkboxTrigger(id, value) {
        const {selectTrigger, test} = this.props;
        selectTrigger(false, value, test.id);
    }
    expandTrigger() {
        const {expansion, expandTrigger} = this.props;
        if (expansion) {
            expandTrigger();
        }
    }
    onClick(e) {
        this.props.trigger(e);
        e.preventDefault();
    }
}

Trigger.propTypes = {
    value: React.PropTypes.string,
    test: React.PropTypes.object,
    expandTrigger: React.PropTypes.func,
    selectTrigger: React.PropTypes.func,
    trigger: React.PropTypes.func,
    expansion: React.PropTypes.bool,
    selectable: React.PropTypes.bool,
    isExpand: React.PropTypes.bool
};
