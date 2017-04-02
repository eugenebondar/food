/**
 * CheckboxFilter.
 * @module Dashboard/Elements/Filters/CheckboxFilter
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';

import Checkbox from '../Elements/Checkbox';

export default class CheckboxFilter extends React.Component {
    constructor(props) {
        super(props);
        this.getFilterValue = this.getFilterValue.bind(this);
        this.updateValue = this.updateValue.bind(this);
    }
    render() {
        const checkboxList = this.getFilterValue(this.props.filter).sort(function(a, b) {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            return 0;
        }).map((item, i) => {
            return (
                <li key={i}>
                    <Checkbox id={item.value} onChange={this.updateValue} label={item.name} value={item.bool} />
                </li>
            );
        });
        return (
            <div className="checkbox-filter">
                <span>{this.props.title}</span>
                <ul>{checkboxList}</ul>
            </div>
        );
    }
    getFilterValue(filter) {
        return filter.map(function(item) {
            return {
                name: item.name,
                bool: this.props.value.indexOf(item.value) >= 0,
                value: item.value
            };
        }.bind(this));
    }
    updateValue(key, bool) {
        let {value, filter, updateFilter, id} = this.props;
        const index = value.indexOf(key),
            i = filter.findIndex(function(item) {
                return item.value === key;
            });
        if (index >= 0 && !bool) {
            value.splice(index, 1);
        } else {
            value.push(filter[i].value);
        }
        updateFilter(id, value);
    }
}

CheckboxFilter.propTypes = {
    filter: React.PropTypes.array,
    title: React.PropTypes.string,
    id: React.PropTypes.string,
    updateFilter: React.PropTypes.func,
    value: React.PropTypes.array
};
