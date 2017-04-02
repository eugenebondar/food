/**
 * Text representing a table's td value with type severity.
 * @module TableBoard/Elements/Table/Cells/Severity
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';
import classNames from 'classnames';

export default class Severity extends React.Component {
    constructor(props) {
        super(props);
        this.expandTrigger = this.expandTrigger.bind(this);
        this.getClass = this.getClass.bind(this);
    }
    render() {
        const {value, expansion, isExpand} = this.props,
            buttonClass = classNames('expand-btn', {
                'expand': isExpand
            }),
            wrapperClass = classNames('test-table-cel-wrap', {
                'expand-cell-wrap': expansion
            });
        const content = value === '' ? '-' : <span className={'label ' + (this.getClass())}>{value}</span>,
            button = expansion ? (
                <button className={buttonClass} onClick={this.expandTrigger}>
                    <span className={isExpand ? 'sc-icon-down-arrow' : 'sc-icon-right-arrow'}></span>
                </button>
            ) : null;
        return (
            <span className={wrapperClass}>
                {button}
                {content}
            </span>
        );
    }
    getClass() {
        const severityClass = {
            'Low':'severity--low',
            'Medium':'severity--medium',
            'High':'severity--high',
            'Critical':'severity--critical'
        }[this.props.value];
        return severityClass || 'severity--none';
    }
    expandTrigger() {
        const {expansion, expandTrigger} = this.props;
        if (expansion) {
            expandTrigger();
        }
    }
}

Severity.propTypes = {
    value: React.PropTypes.string,
    expandTrigger: React.PropTypes.func,
    expansion: React.PropTypes.bool,
    isExpand: React.PropTypes.bool
};
