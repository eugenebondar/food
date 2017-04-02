/**
 * TableTH representing a table's TH cell component.
 * @module TableBoard/Elements/Table/TableTH
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';
import Translate from 'counterpart';

import Checkbox from '../../../Elements/Checkbox';

export default class TableTH extends React.Component {
    constructor(props) {
        super(props);
        this.checkboxTrigger = this.checkboxTrigger.bind(this);
        this.sort = this.sort.bind(this);
    }
    render() {
        const {sortConfig, selectable, sortable, isAllSelected, name} = this.props;
        let className = '';
        if (sortable && 'undefined' !== typeof sortConfig) {
            className = 'sc-icon-dropdown-arrow sorting-icon';
            if (sortConfig.value) {
                className = 'sorting-icon sorting-icon-selected ';
                className += (sortConfig.order === 'asc' ? 'sc-icon-up-arrow' : 'sc-icon-down-arrow');
            }
        }
        const checkbox = selectable ? (
            <Checkbox
                id="selected"
                onClick={this.prevent}
                onChange={this.checkboxTrigger}
                value={isAllSelected}
            />
        ) : null;
        return this.props.type !== 'hidden' ? (
            <th className={(sortable ? 'sortable-th ' : '')+(selectable ? 'expand-cell expand-cell' : '')}
                onClick={this.sort}
            >
                {checkbox}
                <span className={selectable ? 'expand-cell expand-cell-wrap' : ''}>
                    <span className={className} />{ Translate(name) }
                </span>
            </th>
        ): null;
    }
    prevent(e) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }
    checkboxTrigger(id, value) {
        this.props.selectTrigger(true, value);
    }
    sort() {
        const {sortable, sortConfig, updateSortableStatus} = this.props;
        if (sortable) {
            let newValue = {
                sort_order: 'asc',
                sort_field: sortConfig.key
            };
            if (sortConfig.value) {
                if (sortConfig.order === 'asc') {
                    newValue.sort_order = 'desc';
                } else if (sortConfig.order === 'desc') {
                    newValue.sort_order = newValue.sort_field = '';
                }
            }
            updateSortableStatus(newValue);
        }
    }
}

TableTH.propTypes = {
    name: React.PropTypes.string,
    source: React.PropTypes.string,
    type: React.PropTypes.string,
    sortable: React.PropTypes.bool,
    sortConfig: React.PropTypes.object,
    sortDataByColumn: React.PropTypes.func,
    updateSortableStatus: React.PropTypes.func,
    sortDataByColumnValue: React.PropTypes.string,
    sortIndex: React.PropTypes.number,
    selectable: React.PropTypes.bool,
    isAllSelected: React.PropTypes.bool,
    selectTrigger: React.PropTypes.func
};
