/**
 * Text representing a table's td value with type array.
 * @module TableBoard/Elements/Table/Cells/Reports
 * @version 1.0.0
 * @requires React
 *
 * @author Andrii Siusko
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';
import {Popover} from 'apoc-react';

export default class Reports extends React.Component {
    render() {
        let {value} = this.props,
            firstItem = {}, linkCounter = 0, FirstItem,
            last_completed_run_list = null, next_run_list = null, DropDown;
        if (value &&
            value.last_completed_run &&
            value.last_completed_run.reports &&
            value.last_completed_run.reports.length) {
            firstItem = value.last_completed_run.reports[0];
            linkCounter += value.last_completed_run.reports.length;
            last_completed_run_list = value.last_completed_run.reports.map((item, i)=> {
                return (
                    <li key={i}>
                        <a className="sc-txt-primary" target="_blank" href={item.file_url}>
                            {item.name}
                        </a>
                    </li>
                );
            });
        }
        if (value &&
            value.next_run &&
            value.next_run.reports &&
            value.next_run.reports.length) {
            firstItem = firstItem.file_url ? firstItem : value.next_run.reports[0];
            linkCounter += value.next_run.reports.length;
            next_run_list = value.next_run.reports.map(function(item, i) {
                return <li key={i}><a className="sc-txt-primary" target="_blank" href={item.file_url}>{item.name}</a></li>;
            });
        }
        FirstItem = firstItem.file_url ? <a className="sc-txt-primary" target="_blank" href={firstItem.file_url}>{firstItem.name}</a> : '-';
        DropDown = (last_completed_run_list || next_run_list) && linkCounter > 1 ? (
            <Popover
                placement="topLeft"
                title={FirstItem}
            >
                <ul>{last_completed_run_list}</ul>
                <ul>{next_run_list}</ul>
            </Popover>
        ) : FirstItem;
        return (
            <div className="td-array-value-wrap">
                {DropDown}
            </div>
        );
    }
}

Reports.propTypes = {
    value: React.PropTypes.any,
    test: React.PropTypes.object,
    link: React.PropTypes.object,
    expandTrigger: React.PropTypes.func,
    expansion: React.PropTypes.bool,
    isExpand: React.PropTypes.bool
};
