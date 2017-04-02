/**
 * Date representing a table's td value with type date.
 * @module TableBoard/Elements/Table/Cells/Date
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';
import classNames from 'classnames';

import DateTimeFormat from '../../../Configuration/DateTimeFormat';
import DateFormats from '../../../../Utils/DateFormats';

export default class Date extends React.Component {
    constructor(props) {
        super(props);
        this.expandTrigger = this.expandTrigger.bind(this);
    }
    render() {
        const {expansion, value, isExpand, dataFormat, source, test} = this.props,
            buttonClass = classNames('expand-btn', {
                'expand': isExpand
            }),
            contentClass = classNames('test-table-cel-wrap', {
                'test-table-expired-cel-wrap': source === 'expiration_date' && test.expired
            }),
            content = <DateTimeFormat dataFormat={dataFormat} className={contentClass} date={value} />,
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

Date.propTypes = {
    value: React.PropTypes.string,
    dataFormat: React.PropTypes.string,
    expandTrigger: React.PropTypes.func,
    expansion: React.PropTypes.bool,
    isExpand: React.PropTypes.bool,
    source: React.PropTypes.string,
    test: React.PropTypes.object
};

Date.defaultProps = {
    dataFormat: DateFormats.fullDate
};

