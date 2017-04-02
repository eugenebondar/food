/**
 * Select.
 * @module Shared/Elements/Select
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';
import classNames from 'classnames';
import underscore from 'underscore';
import {Dropdown, DropdownButton, DropdownOption} from 'apoc-react';

export default class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {key: 0};
        this.onChange = this.onChange.bind(this);
        this.checkDefaultValue = this.checkDefaultValue.bind(this);
    }
    componentWillMount() {
        this.checkDefaultValue();
    }
    componentWillReceiveProps(nextProps) {
        if (!underscore.isEqual(nextProps.options, this.props.options)) {
            this.setState({key: ++this.state.key});
        }
        this.checkDefaultValue();
    }
    render() {
        const {value, isDisabled, options} = this.props;
        const optionsList = options.map((option, i) => {
            const check = 'undefined' !== typeof option.value;
            return (
                <DropdownOption
                    key={i}
                    value={this.toString(check ? option.value : option)}
                    label={check ? option.name : option}
                    isSelected={check ? option.value === value : option === value}
                />
            );
        });
        const labelClasses = classNames(
            'sc-btn sc-btn-primary-outline', {
                'disabled': isDisabled
            }
        );
        return (
            <div>
                <Dropdown
                    key={this.state.key}
                    button={<DropdownButton className={labelClasses} />}
                    onChange={this.onChange}
                    name="dropdown"
                >
                    {optionsList}
                </Dropdown>
            </div>

        );
    }
    checkDefaultValue() {
        const {options, value, id, updateValue} = this.props;
        let isOptionsListHasPassedValue = false;
        options.forEach(option => {
            const optionValue = 'undefined' !== typeof option.value ? option.value : option;
            if (optionValue === value) {
                isOptionsListHasPassedValue = true;
            }
        });
        if (!isOptionsListHasPassedValue) {
            const defaultValue = options[0].value ? options[0].value : options[0];
            updateValue(id, defaultValue, 'select');
        }
    }

    onChange(data) {
        const {id, updateValue} = this.props;
        let value = 'undefined' !== typeof data.value.value ? data.value.value : data.value;
        updateValue(id, this.toCorrectValue(value), 'select');
    }

    toString(val) {
        if (arguments.length === 0) {
            return '';
        } else if (typeof val === 'undefined') {
            return 'undefined';
        } else if (val === null) {
            return 'null';
        } else if (typeof val === 'boolean') {
            return val ? 'true' : 'false';
        } else  {
            return val+'';
        }
    }

    toCorrectValue(val) {
        if (arguments.length === 0) {
            return '';
        } else if (val === 'undefined') {
            return 'undefined';
        } else if (val === 'null') {
            return null;
        } else if (val === 'true' || val === 'true') {
            return val === 'true';
        } else {
            return val;
        }
    }
}

Select.propTypes = {
    id: React.PropTypes.string,
    updateValue: React.PropTypes.func,
    options: React.PropTypes.array,
    onChange: React.PropTypes.func,
    value: React.PropTypes.any,
    isHide: React.PropTypes.bool,
    className: React.PropTypes.string,
    getEvent: React.PropTypes.func,
    reactOnHoverEvent: React.PropTypes.bool,
    closeOnClick: React.PropTypes.bool,
    isDisabled: React.PropTypes.bool
};

Select.defaultProps = {
    className: '',
    closeOnClick: false,
    isHide: false,
    value: '',
    isDisabled: false,
    options: []
};
