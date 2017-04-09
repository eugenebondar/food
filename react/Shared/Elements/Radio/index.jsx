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

import Radio from './Radio';

export default class RadioComponent extends React.Component {
    constructor(props) {
        super(props);
        this.checkValue = this.checkValue.bind(this);
        this.onChange = this.onChange.bind(this);
        this.setDefault = this.setDefault.bind(this);
    }
    componentWillMount() {
        this.setDefault(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.setDefault(nextProps);
    }
    render() {
        const {radio, value, id} = this.props,
            radioButtons = radio.map((item, i) => {
                return (
                    <Radio
                        key={i}
                        name={id}
                        title={item.title}
                        value={item.value}
                        currentValue={value}
                        onChange={this.onChange}
                    />
                );
            });
        return (
            <div className="radio-input__wrap">
                {radioButtons}
            </div>
        );
    }
    checkValue(source) {
        const {radio, value} = source;
        return radio.findIndex(function(item) {
            return item.value === value;
        });
    }
    onChange(value) {
        const {updateValue, id} = this.props;
        updateValue(id, value, 'radio');
    }
    setDefault(source) {
        const {radio, id, updateValue} = source;
        if ((this.checkValue(source) < 0) && radio.length > 0) {
            const value = radio[0].value;
            updateValue(id, value, 'radio');
        }
    }
}

RadioComponent.propTypes = {
    id: React.PropTypes.string,
    updateValue: React.PropTypes.func,
    radio: React.PropTypes.array,
    onChange: React.PropTypes.func,
    value: React.PropTypes.any
};
