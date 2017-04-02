import React from 'react';
import FilterList from './FilterList';

export default function FlatListOptionsCollectionFilter({filterOptionsBySection, filter, onChange}) {
    const flatFilterOptions = filterOptionsBySection.map( optionsSection => optionsSection.name)
        .reduce((prev, filterName) => prev.concat(filter[filterName]), [])
        .map(getFilterOptionByValue);

    return (
        <FilterList options={flatFilterOptions} onChange={updateFilterState}/>
    );

    function updateFilterState(newFilterOptions) {
        const values = newFilterOptions.map(filterOption => filterOption.value);
        const newFilter = filterOptionsBySection.reduce((prev, currentSection)=> {
            prev[currentSection.name] = currentSection.options
                .filter(option => values.includes(option.value))
                .map(option => option.value);
            return prev;
        }, {});
        if (onChange) {
            onChange(newFilter);
        }
    }

    function getFilterOptionByValue(value) {
        const option = filterOptionsBySection.reduce((prev, current)=> {
            if (prev) {
                return prev;
            }
            return current.options.find(option=> option.value === value);
        }, null);
        if (!option) {
            throw new Error(`option with value: ${value} could not be found`);
        }
        return option;
    }
}

FlatListOptionsCollectionFilter.propTypes = {
    filter: React.PropTypes.object,
    onChange: React.PropTypes.func,
    filterOptionsBySection: React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string,
        options: React.PropTypes.arrayOf(React.PropTypes.shape({
            name: React.PropTypes.string,
            value: React.PropTypes.string
        }))
    }))
};
