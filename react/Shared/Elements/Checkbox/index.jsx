/**
 * Input.
 * @module Shared/Elements/Input
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';

export default class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onClickLabel = this.onClickLabel.bind(this);
    }
    render() {
        const {value, label} = this.props;
        const input = (
            <input type="checkbox"
                   onChange={this.handleChange}
                   onClick={this.onClick}
                   checked={value}
            />
        );
        if (label) {
            return (
                <div className="checkbox-label-wrap">
                    {input}
                    <span onClick={this.onClickLabel}>{label}</span>
                </div>
            );
        }
        return input;
    }
    onClick(e) {
        const {onClick} = this.props;
        if ('undefined' !== typeof onClick) {
            onClick(e);
        }
    }
    handleChange(e) {
        const {onChange, id, data} = this.props,
            value = e.target.checked;
        onChange(id, value, 'checkbox', data);
    }
    onClickLabel() {
        const {onChange, value, id, data} = this.props;
        onChange(id, !value, 'checkbox', data);
    }
}

Checkbox.propTypes = {
    id: React.PropTypes.string,
    label: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onClick: React.PropTypes.func,
    value: React.PropTypes.bool,
    data: React.PropTypes.any
};

Checkbox.defaultProps = {
    value: false,
    data: null,
    label: null
};

