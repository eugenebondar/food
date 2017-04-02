/**
 * Roles.
 * @module Roles
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';
import Translate from 'counterpart';
import {ModalDialog} from 'apoc-react';

import {RolesActions} from '../../../../Actions';

import RoleForm from './RoleForm';

export default class RoleDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: this.getDefaultFields(),
            isDisabled: true,
            permissionsValues: this.getDefaultPermissions()
        };
        this.getDefaultFields = this.getDefaultFields.bind(this);
        this.getDefaultPermissions = this.getDefaultPermissions.bind(this);
        this.updateValue = this.updateValue.bind(this);
        this.changeRoleType = this.changeRoleType.bind(this);
        this.updatePermission = this.updatePermission.bind(this);
        this.submit = this.submit.bind(this);
    }
    render() {
        const {permissionsList, rolesConfig, validation, closePopup} = this.props,
            {isDisabled, fields, permissionsValues} = this.state;
        const _title = rolesConfig.isEdit ?
            this.getTranslate('editRole') :
            this.getTranslate('addRole'),
            _button = rolesConfig.isEdit ?
                Translate('general.save') :
                Translate('general.add'),
            _dialogFooter = (
                <div className="modal-btn-wrap">
                    <button className="cancel-btn sc-btn" onClick={closePopup}>
                        {Translate('customers.popup.cancel')}
                    </button>
                    <button
                        className="sc-btn sc-btn-primary"
                        onClick={this.submit}
                        disabled={isDisabled}
                    >
                        {_button}
                    </button>
                </div>
            );
        return (
            <ModalDialog
                isOpen={rolesConfig.isOpen}
                header={_title}
                footer={_dialogFooter}
                onOutsideModalClick={closePopup}
            >
                <RoleForm
                    updateValue={this.updateValue}
                    updatePermission={this.updatePermission}
                    changeRoleType={this.changeRoleType}
                    fields={fields}
                    permissionsValues={permissionsValues}
                    isEdit={rolesConfig.isEdit}
                    permissionsList={permissionsList}
                    validation={validation}
                />
            </ModalDialog>
        );
    }
    /**
     * Get translation by passed key.
     * @param {String} [type] passed key.
     * @return {String} translation.
     */
    getTranslate(key) {
        return Translate('roles.'+key);
    }
    getDefaultFields() {
        const {rolesConfig} = this.props;
        return rolesConfig.isEdit ? rolesConfig.role : {
            name: '',
            role_type: '',
            permissions: []
        };
    }
    getDefaultPermissions() {
        const {rolesConfig, permissionsList} = this.props;
        if (rolesConfig.isEdit) {
            let role = rolesConfig.role,
                role_type = role.role_type,
                permissions = role.permissions,
                list = permissionsList[role_type],
                permissionsValue = {};
            list.forEach(function(item) {
                permissionsValue[item] = permissions.indexOf(item) >= 0;
            });
            return permissionsValue;
        }
        return {};
    }
    /**
     * Update fields by key.
     * @param {String} [key] - field's key
     * @param {String} [value] - new field value
     * @config {Function} set fields state.
     */
    updateValue(key, value) {
        let fields = this.state.fields;
        fields[key] = value;
        this.setState({
            fields: fields,
            isDisabled: false
        });
    }
    changeRoleType(fields, permissionsValues) {
        this.setState({
            fields: fields,
            permissionsValues: permissionsValues
        });
    }
    updatePermission(fields, permissionsValues) {
        this.setState({
            fields: fields,
            isDisabled: false,
            permissionsValues: permissionsValues
        });
    }
    submit() {
        const {rolesConfig} = this.props,
            {fields} = this.state;
        rolesConfig.isEdit ? this.editRole(fields.id, fields) : this.addRole(fields);
    }
    addRole(role) {
        RolesActions.addRole(role);
    }
    editRole(id, role) {
        RolesActions.editRole(id, role);
    }
}

RoleDialog.propTypes = {
    rolesConfig: React.PropTypes.object,
    permissionsList: React.PropTypes.object,
    closePopup: React.PropTypes.func,
    validation: React.PropTypes.object
};
