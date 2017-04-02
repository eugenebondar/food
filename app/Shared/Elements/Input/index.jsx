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

export default class Input extends React.Component {
    constructor(props) {
        super(props);
        this.onBlur = this.onBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }
    render() {
        const {value, className, type, placeholder, isDisabled} = this.props,
            val = value ? value : '';
        return (
            <input className={'sc-form-ele ' + className}
                   type={type}
                   placeholder={placeholder}
                   onChange={this.handleChange}
                   onBlur={this.onBlur}
                   onKeyPress={this.onKeyPress}
                   value={val}
                   autoComplete={(type === 'password' ? 'off' : 'on')}
                   disabled={isDisabled}
            />
        );
    }
    onBlur(e) {
        const {onBlur, id} = this.props;
        if ('undefined' !== typeof onBlur) {
            onBlur(e.target.value, id);
        }
    }
    onKeyPress(e) {
        const {onKeyPress} = this.props;
        if ('undefined' !== typeof onKeyPress) {
            onKeyPress(e.charCode);
        }
    }
    handleChange(e) {
        const {onChange, validationType, updateValue, id} = this.props;
        if ('undefined' !== typeof onChange) {
            onChange();
        }
        let value = e.target.value;
        switch (validationType) {
            case 'number':
                value = value.replace(/[^0-9]/gim,'');
                break;
            case 'phone':
                value = value.replace(/[^0-9|#|(|)| |\-|+]/gim,'');
                break;
        }
        updateValue(value, id);
    }
}

Input.propTypes = {
    id: React.PropTypes.string,
    updateValue: React.PropTypes.func,
    value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
    ]),
    onChange: React.PropTypes.func,
    validationType: React.PropTypes.string,
    className: React.PropTypes.string,
    type: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onKeyPress: React.PropTypes.func,
    isDisabled: React.PropTypes.bool
};

Input.defaultProps = {
    validationType: 'text',
    type: 'text',
    className: '',
    placeholder: ''
};
