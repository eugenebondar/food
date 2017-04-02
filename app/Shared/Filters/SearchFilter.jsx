/**
 * SearchFilter.
 * @module Dashboard/Elements/Filters/SearchFilter
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';

import InputComponent from '../Elements/Input';

export default class SearchFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: this.props.filter
        };
        this.onKeyPress = this.onKeyPress.bind(this);
        this.updateValue = this.updateValue.bind(this);
        this.changeTrigger = this.changeTrigger.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.filter !== nextProps.filter) {
            this.setState({filter: nextProps.filter});
        }
    }
    render() {
        return (
            <div className={this.props.isDisabled ? 'search-filter  disabled-filter' : 'search-filter'}>
                <InputComponent
                    isDisabled={this.props.isDisabled}
                    id='filter'
                    onKeyPress={this.onKeyPress}
                    updateValue={this.updateValue}
                    value={this.state.filter}
                />
                <span className='sc-icon-magnifier' onClick={this.changeTrigger} />
            </div>
        );
    }
    onKeyPress(charCode) {
        if (charCode === 13) this.changeTrigger();
    }
    updateValue(key, newValue) {
        this.setState({filter: newValue});
    }
    changeTrigger() {
        this.props.updateFilter('search_by_name', this.state.filter);
    }
}

SearchFilter.propTypes = {
    filter: React.PropTypes.string,
    id: React.PropTypes.string,
    isDisabled: React.PropTypes.bool,
    updateFilter: React.PropTypes.func
};
