/**
 * Roles Table.
 * @module Roles/Components/RolesTable
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';
import {Accordion, AccordionItem} from 'react-sanfona';
import Translate from 'counterpart';

import TableBoard from '../../../Shared/TableBoard';
import Preloader from '../../../Shared/Preloader';

export default class RolesTable extends React.Component {
    constructor(props) {
        super(props);

        this.addRole = this.addRole.bind(this);
    }
    render() {
        const {actionsTrigger, data} = this.props;
        if (data) {
            let columnConfig = [
                {
                    source: 'name',
                    name: 'tableCell.name',
                    width: '389',
                    sortable: false,
                    type: 'text'
                },{
                    source: 'role_type',
                    name: 'tableCell.roleType',
                    width: '389',
                    sortable: false,
                    type: 'text'
                },{
                    source: 'permissions',
                    name: 'tableCell.permissions',
                    width: '389',
                    sortable: false,
                    type: 'list',
                    translate: 'roles.'
                }],
                actions = [
                    {value: 'editRole', title: Translate('actions.editRole'), icon: 'sc-icon-pencil'},
                    {value: 'deleteRole', title: Translate('actions.deleteRole'), icon: 'sc-icon-trash-closed'}
                ];
            return (
                <div className="categories-panel">
                    <Accordion activeItems={1}>
                        <AccordionItem title={Translate('roles.roles', {length: data.length})} slug={1}>
                            <div className="users-controls-wrap">
                                <button className="sc-btn sc-btn-primary" onClick={this.addRole}>
                                    {Translate('actions.addRole')}
                                </button>
                            </div>
                            <div className="tests-expand-content">
                                <TableBoard
                                    className="categories-table table"
                                    data={data}
                                    columnConfig={columnConfig}
                                    actions={actions}
                                    actionsTrigger={actionsTrigger}
                                    emptyTableTitle={Translate('roles.noRoles')}
                                    updateSortableStatus={this.updateSortableStatus}
                                />
                            </div>
                        </AccordionItem>
                    </Accordion>
                </div>
            );
        }
        return <Preloader />;
    }
    addRole() {
        this.props.addEditRole(false);
    }
}

RolesTable.propTypes = {
    data: React.PropTypes.array,
    addEditRole: React.PropTypes.func,
    actionsTrigger: React.PropTypes.func
};

