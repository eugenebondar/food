/**
 * @module Stores/BaseStore
 * @version 1.0.0
 *
 * @author Yevhen Bondar.
 * @copyright (c) Softserve.
 */

import EventEmitter from 'eventemitter3';
import Reflux from 'reflux';

function BaseStore(listenables) {
    this.subscriptions = [];
    this.emitter = new EventEmitter();
    this.eventLabel = 'change';

    if (listenables) {
        const arr = [].concat(listenables);
        arr.forEach(this.listenToMany, this);
    }
}

BaseStore.prototype = Object.getPrototypeOf(Reflux.createStore({}));

export default BaseStore;
