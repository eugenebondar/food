/**
 * Text representing a table's td value with type blank.
 * @module TableBoard/Elements/Table/Cells/Blank
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';
import classNames from 'classnames';

import Checkbox from '../../../Elements/Checkbox';
import LinkComponent from '../../../Elements/Link';

export default class Blank extends React.Component {
    constructor(props) {
        super(props);
        this.checkboxTrigger = this.checkboxTrigger.bind(this);
        this.expandTrigger = this.expandTrigger.bind(this);
    }
    render() {
        const {value, isExpand, selectable, expansion, test} = this.props,
            contentClass = classNames('test-table-cel-wrap', {
                'cont-with-checkbox': selectable
            }),
            buttonClass = classNames('expand-btn', {
                'expand': isExpand
            });
        const content = value === '' ? '-' : (
                <LinkComponent className={contentClass} blank="_blank" value={value} />
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
        const {selectTrigger, test} = this.props;
        selectTrigger(false, value, test.id);
    }
    expandTrigger() {
        const {expansion, expandTrigger} = this.props;
        if (expansion) {
            expandTrigger();
        }
    }
}

Blank.propTypes = {
    test: React.PropTypes.object,
    link: React.PropTypes.object,
    value: React.PropTypes.string,
    expandTrigger: React.PropTypes.func,
    selectTrigger: React.PropTypes.func,
    expansion: React.PropTypes.bool,
    selectable: React.PropTypes.bool,
    isExpand: React.PropTypes.bool
};
