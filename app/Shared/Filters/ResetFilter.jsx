/**
 * ResetFilter.
 * @module Dashboard/Elements/Filters/ResetFilter
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';

export default class ResetFilter extends React.Component {
    constructor(props) {
        super(props);
        this.resetFilters = this.resetFilters.bind(this);
    }
    render() {
        return (
            <div className="reset-filter">
                <button onClick={this.resetFilters}>
                    <span className="sc-icon-filter" />
                    Reset Filters
                </button>
            </div>
        );
    }
    resetFilters() {
        this.props.resetFilters();
    }
}

ResetFilter.propTypes = {
    resetFilters: React.PropTypes.func
};
