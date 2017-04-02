/**
 * DropdownFilter.
 * @module Dashboard/Elements/Filters/DropdownFilter
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';

import SelectComponent from '../Elements/Select/';

export default class DropdownFilter extends React.Component {
    constructor(props) {
        super(props);
        this.updateValue = this.updateValue.bind(this);
    }
    render() {
        const {filter, value, title} = this.props,
            options = [{value: '', name: 'Select Category' }].concat(filter.sort(function(a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            }));
        return (
            <div className="checkbox-filter">
                <span>{title}</span>
                <SelectComponent
                    className=" select-component"
                    id="filter"
                    updateValue={this.updateValue}
                    options={options}
                    value={value.length > 0 ? value[0] : ''}
                />
            </div>
        );
    }
    updateValue(key, value) {
        const {updateFilter, id} = this.props,
            val = value === '' ? [] : [value];
        updateFilter(id, val);
    }
}

DropdownFilter.propTypes = {
    filter: React.PropTypes.array,
    title: React.PropTypes.string,
    id: React.PropTypes.string,
    updateFilter: React.PropTypes.func,
    value: React.PropTypes.array
};
