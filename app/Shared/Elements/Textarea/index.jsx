/**
 * TextArea.
 * @module Shared/Elements/TextArea
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';

export default class Textarea extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    render() {
        const value = this.props.value ? this.props.value : '';
        return (
            <textarea
                className="sc-form-ele"
                type="text"
                onChange={this.handleChange}
                onClick={this.handleChange}
                value={value}
            />
        );
    }
    handleChange(e) {
        if ('undefined' !== typeof this.props.onChange) {
            this.props.onChange();
        }
        const value = e.target.value;
        this.props.updateValue(this.props.id, value, 'textarea');
    }
}

Textarea.propTypes = {
    id: React.PropTypes.string,
    updateValue: React.PropTypes.func,
    onChange: React.PropTypes.func,
    value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
    ])
};
