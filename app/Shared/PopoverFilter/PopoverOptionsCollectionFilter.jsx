import React from 'react';

import PopoverFilter from './PopoverFilter';
import PopoverFilterSection from './PopoverFilterSection';
import PopoverFilterSectionItem from './PopoverFilterSectionItem';

import './PopoverOptionsCollectionFilter.less';

const PopoverOptionsCollectionFilter = React.createClass({
    displayName: __filename,
    propTypes: {
        updateFilter: React.PropTypes.func,
        filter: React.PropTypes.object,
        isDisabled: React.PropTypes.bool,
        filterOptionsBySection: React.PropTypes.arrayOf(React.PropTypes.shape({
            title: React.PropTypes.string,
            name: React.PropTypes.string,
            options: React.PropTypes.arrayOf(React.PropTypes.shape({
                name: React.PropTypes.string,
                value: React.PropTypes.string
            }))
        }))
    },
    render() {
        return (
            <PopoverFilter onChange={this.updateFilter} disabled={this.props.isDisabled} className="ssl-portal-popover-filter">
                {this.props.filterOptionsBySection.map(sectionFilterOptions=>(
                    <PopoverFilterSection
                        key={sectionFilterOptions.name}
                        label={sectionFilterOptions.title}
                        name={sectionFilterOptions.name}>
                        {sectionFilterOptions.options.map(option =>
                            <PopoverFilterSectionItem
                                key={option.name}
                                label={option.name}
                                value={option.value}
                                checked={this.props.filter[sectionFilterOptions.name].includes(option.value)}
                            />
                        )}
                    </PopoverFilterSection>
                ))}
            </PopoverFilter>
        );
    },
    /**
     * @param {string} name
     * @param {Map<boolean,string>} mapKeysValues
     */
    updateFilter(name, mapKeysValues) {
        const selectedOptionsNames = [...mapKeysValues]
            .filter( ([name, isChecked]) => isChecked )
            .map( ([name, isChecked]) => name );

        this.props.updateFilter(name, selectedOptionsNames);
    }
});

export default PopoverOptionsCollectionFilter;
