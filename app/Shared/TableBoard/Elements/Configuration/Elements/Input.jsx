/**
 * Table Configuration PopUp Input
 * @module TableConfigurationPopUp Input
 * @version 1.0.0
 * @requires React
 *
 * @author Andrii Siusko
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';

export default class Input extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    render() {
        return (
            <input
                type="checkbox"
                onChange={this.handleClick}
                checked={this.props.inputData.selected}
            />
        );
    }
    handleClick(e) {
        this.props.changeHandler(this.props.numberOfList, e.target.checked, this.props.extraColumn);
    }
}

Input.propTypes = {
    numberOfList: React.PropTypes.number,
    inputData: React.PropTypes.object,
    changeHandler: React.PropTypes.func,
    extraColumn: React.PropTypes.bool
};
