/**
 * Text representing a table's td value with type status.
 * @module TableBoard/Elements/Table/Cells/Status
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';
import classNames from 'classnames';

import StatusLabel from '../../../StatusLabel';

export default class Status extends React.Component {
    constructor(props) {
        super(props);
        this.checkForClickable = this.checkForClickable.bind(this);
        this.openChangeStatusPopup = this.openChangeStatusPopup.bind(this);
        this.expandTrigger = this.expandTrigger.bind(this);
    }
    render() {
        const {value, expansion, isExpand} = this.props,
            buttonClass = classNames('expand-btn', {
                'expand': isExpand
            }),
            popupButtonClass = classNames('sc-txt-primary test-table-cel-wrap status__label', {
                'pointer': this.checkForClickable()
            });
        const content = value === '' ? '-' : (
                <span
                    onClick={this.openChangeStatusPopup}
                    className={popupButtonClass}
                >
                    <StatusLabel value={value} />
                    {value}
                </span>
            ),
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
    checkForClickable() {
        const {value, isService, test} = this.props;
        return (isService && value !== 'Needs configuration' && value !== 'needs_configuration' && !test.expired);
    }
    openChangeStatusPopup() {
        if (this.checkForClickable()) {
            const {openChangeStatusPopup, value} = this.props;
            openChangeStatusPopup(value);
        }
    }
    expandTrigger() {
        const {expansion, expandTrigger} = this.props;
        if (expansion) {
            expandTrigger();
        }
    }
}

Status.propTypes = {
    value: React.PropTypes.string,
    expandTrigger: React.PropTypes.func,
    openChangeStatusPopup: React.PropTypes.func,
    isService: React.PropTypes.bool,
    expansion: React.PropTypes.bool,
    isExpand: React.PropTypes.bool,
    test: React.PropTypes.object
};
