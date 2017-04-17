/**
 * Radio.
 * @module Shared/Elements/Radio
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';

export default class Radio extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    render() {
        const {name, value, currentValue, title} = this.props;
        return (
            <div className="input-radio__item">
                <input
                    type="radio"
                    name={name}
                    value={value}
                    checked={currentValue === value}
                    onChange={this.onChange}
                />
                <span onClick={this.onClick}>{title}</span>
            </div>
        );
    }
    onChange(e) {
        const {onChange, value} = this.props,
            checked = e.target.checked;
        if (checked) {
            onChange(value);
        }
    }
    onClick() {
        const {onChange, value} = this.props;
        onChange(value);
    }
}

Radio.propTypes = {
    radio: React.PropTypes.array,
    onChange: React.PropTypes.func,
    value: React.PropTypes.any,
    title: React.PropTypes.string,
    currentValue: React.PropTypes.any,
    name: React.PropTypes.string
};
