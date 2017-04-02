/**
 * Input representing a table's td value with type input.
 * @module TableBoard/Elements/Table/Cells/Input
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';
import classNames from 'classnames';

export default class Input extends React.Component {
    constructor(props) {
        super(props);
        this.expandTrigger = this.expandTrigger.bind(this);
    }
    render() {
        const {value, expansion, isExpand} = this.props,
            buttonClass = classNames('expand-btn', {
                'expand': isExpand
            }),
            content = <input type="text" value={value}/>,
            button = expansion ? (
                <button className={buttonClass} onClick={this.expandTrigger}>
                    <span className={isExpand ? 'sc-icon-down-arrow' : 'sc-icon-right-arrow'}></span>
                </button>
            ) : null;
        return (
            <span className={expansion ? 'expand-cell-wrap' : ''}>
                {button}
                {content}
            </span>
        );
    }
    expandTrigger() {
        const {expansion, expandTrigger} = this.props;
        if (expansion) {
            expandTrigger();
        }
    }
}

Input.propTypes = {
    value: React.PropTypes.string,
    expandTrigger: React.PropTypes.func,
    expansion: React.PropTypes.bool,
    isExpand: React.PropTypes.bool
};
