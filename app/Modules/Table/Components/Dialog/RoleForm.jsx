/**
 * AddEditRole
 * @module Roles/Components/Popups/AddEditRole
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';
import Translate from 'counterpart';

import Checkbox from '../../../../Shared/Elements/Checkbox';
import SelectComponent from '../../../../Shared/Elements/Select';
import InputComponent from '../../../../Shared/Elements/Input';

export default class RoleForm extends React.Component {
    constructor(props) {
        super(props);

        this.getValidationError = this.getValidationError.bind(this);
        this.getValidationClass = this.getValidationClass.bind(this);
        this.changeRoleType = this.changeRoleType.bind(this);
        this.updatePermission = this.updatePermission.bind(this);
    }
    render() {
        const {fields, permissionsValues, permissionsList, updateValue} = this.props,
            {getTranslate, getValidationError, getValidationClass} = this,
            permissionsSource = fields.role_type !== '' ? (
                permissionsList[fields.role_type]
            ) : [],
            permissions = permissionsSource.map((item, i) => {
                return (
                    <li key={i}>
                        <Checkbox
                            onChange={this.updatePermission}
                            label={getTranslate(item)}
                            value={permissionsValues[item]}
                            id={item}
                        />
                    </li>
                );
            }),
            require = <span className="sc-error required-star">*</span>;
        return (
            <div className="roles-dialog">
                <div className={'form__field' + (getValidationClass('name'))}>
                    <label>
                        {getTranslate('name')}
                        : {require}
                    </label>
                    <div className="form__input">
                        <InputComponent
                            id="name"
                            updateValue={updateValue}
                            value={fields.name}
                        />
                        {getValidationError('name')}
                    </div>
                </div>
                <div className="form__field">
                    <label>
                        {getTranslate('roleType')}
                        : {require}
                    </label>
                    <div className="form__input">
                        <SelectComponent
                            id="role_type"
                            updateValue={this.changeRoleType}
                            options={['customer', 'staff']}
                            value={fields.role_type}
                        />
                    </div>
                </div>
                <div className="form__field">
                    <label>
                        {getTranslate('permissions')}
                        : {require}
                    </label>
                    <div className="form__input">
                        <ul className="permission-list">
                            {permissions}
                        </ul>
                        {getValidationError('permissions')}
                    </div>
                </div>
            </div>
        );
    }
    /**
     * Check validation and get error for pass key if it needs.
     * @return {JSX}
     */
    getValidationError(key) {
        const validation = this.props.validation;
        return (validation && 'undefined' !== typeof validation[key]) ? (
            <div className="validation__error-message sc-error">
                {validation[key].charAt(0).toUpperCase() + validation[key].substr(1)}
            </div>
        ) : null;
    }
    /**
     * Check validation and get error class for pass key if it needs.
     * @return {String} error class
     */
    getValidationClass(key) {
        const validation = this.props.validation;
        return (validation && !!validation[key]) ? ' error-input' : '';
    }
    changeRoleType(key, value) {
        let permissionsList = this.props.permissionsList[value],
            permissionsValue = {},
            fields = this.props.fields;
        fields[key] = value;
        fields.permissions = [];
        for (let key in permissionsList) {
            permissionsValue[key] = false;
        }
        this.props.changeRoleType(fields, permissionsValue);
    }
    updatePermission(key, value) {
        let {permissionsValues, fields} = this.props,
            permissions = fields.permissions;
        permissionsValues[key] = value;
        if (value) {
            permissions.push(key);
            let k = [];
            switch (key) {
                case 'edit_all_tests':
                    k = ['view_all_tests'];
                    break;
                case 'import_external_runs':
                    k = ['view_external_runs'];
                    break;
                case 'manage_all_users':
                    k = ['view_all_users'];
                    break;
                case 'manage_companies':
                    k = ['view_companies'];
                    break;
                case 'manage_classifications':
                    k = ['view_classifications', 'view_categories'];
                    break;
                case 'edit_company_tests':
                    k = ['view_company_tests'];
                    break;
                case 'manage_company_users':
                    k = ['view_company_users'];
                    break;
                case 'manage_categories':
                    k = ['view_categories'];
                    break;
            }
            if ('undefined' !== typeof k) {
                k.forEach((p) => {
                    permissions.indexOf(p) < 0 ? permissions.push(p) : null;
                    permissionsValues[p] = true;
                });
            }
        } else {
            let index = permissions.indexOf(key);
            permissions.splice(index, 1);
        }
        this.props.updatePermission(fields, permissionsValues);
    }
    /**
     * Get translation by passed key.
     * @param {String} [type] passed key.
     * @return {String} translation.
     */
    getTranslate(key) {
        return Translate('roles.'+key);
    }
}

RoleForm.propTypes = {
    fields:           React.PropTypes.object.isRequired,
    permissionsValues: React.PropTypes.object.isRequired,
    permissionsList:    React.PropTypes.object,
    updateValue:      React.PropTypes.func,
    updatePermission:  React.PropTypes.func,
    changeRoleType:  React.PropTypes.func,
    validation:  React.PropTypes.object
};
