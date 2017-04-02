/**
 * Store
 * @module Stores/store
 * @version 1.0.0
 * @requires Reflux
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import BaseStore from './BaseStore';
import List from './list';

import {Actions} from '../Actions';


/**
 * @classdesc Class representing a Roles Store.
 * @class
 */

class Store extends BaseStore {
    constructor() {
        super([Actions]);
    }

    fetchFoodList() {
        this.trigger('foodList', List);
    }

    fetchRoles() {
        // RolesAPI.fetchRoles().then(json => {
        //     this.trigger('roles', json.roles);
        // });
    }

}

export default new Store();
