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

import Store from '../../Stores/Store';

import {Actions} from '../../Actions';

import BaseComponent from '../../Shared/BaseComponent';
import Table from './Components/Table/Table';

import './Table.less';

export default class Roles extends BaseComponent {
    constructor(props) {
        super(props);
        this.listenTo(Store, this._listenStore);
        this.state = {
            foodList: null
        };

        this.fetchFoodList = this.fetchFoodList.bind(this);
        this.actionsTrigger = this.actionsTrigger.bind(this);
    }
    componentWillMount() {
        this.fetchFoodList();
    }
    render() {
        const {foodList} = this.state;
        return (
            <main className="main">
                <div className="site">
                    {foodList ? (
                        <div>
                            <Table foodList={foodList} />
                        </div>
                    ) : null}
                </div>
            </main>
        );
    }
    /**
     * Trigger roles table's actions.
     * @param {String} [type] role's type.
     * @param {String} [id] role's id that was passed.
     */
    actionsTrigger(type, id) {
        switch (type) {
            case 'editRole':
                this.openAddEditRolePopup(true, id);
                break;
            case 'deleteRole':
                this.confirmDeleteRole(id);
                break;
        }
    }
    /**
     * Fetch roles list.
     * Invoke Table's action - fetchFoodList
     */
    fetchFoodList() {
        Actions.fetchFoodList();
    }
    /**
     * Listener for Store.
     * @param {String} [event] - event name.
     * @param {*} [data] - event data.
     */
    _listenStore(event, data) {
        switch (event) {
            case 'foodList':
                this.setState({foodList: data});
                break;
        }
    }
}
