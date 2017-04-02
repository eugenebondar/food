/**
 * Shared.
 * @module Shared/BaseComponent
 * @version 1.0.0
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import {Component} from 'react';
import ListenerMethods from 'reflux-core/lib/ListenerMethods';

/**
 * Base component which all stateful components should extend.
 * Provides `listenTo` method for listening to Reflux listenables, replacing
 * `Reflux.listenTo` mixin factory with same signature
 * @link https://github.com/reflux/refluxjs#using-refluxlistento
 * @example
 * ```
 * class ExampleComponent extends BaseComponent {
 *     constructor(props) {
 *         super(props);
 *         this.listenTo(Store, this._handleStoreChange);
 *     }
 * }
 * ```
 */
class BaseComponent extends Component {
    constructor(props) {
        super(props);

        this._isMounted = false;
        this._methodsAreBound = false;
        this._listenStack = [];
    }

    componentDidMount() {
        this._isMounted = true;

        if (!this._listenStack.length) {
            return;
        }

        this._bindMethods();

        this._listenStack.forEach(({method, args}) => {
            this[method].apply(this, args);
        });
    }

    componentWillUnmount() {
        this._isMounted = false;

        if (this._methodsAreBound) {
            this.stopListeningToAll();
        }
    }

    /**
     * Listen to a Reflux listenable
     * @param {Function|object} listenable An Action or Store that should be listened to.
     * @param {Function|string} callback The callback to register as event handler
     * @param {Function|string} defaultCallback The callback to register as default handler
     */
    listenTo(...args) {
        if (!this._isMounted) {
            this._listenStack.push({
                method: '_listenTo',
                args
            });

            return;
        }

        this._bindMethods();
        this._listenTo.apply(this, args);
    }

    /**
     * Listen to many Reflux listenables
     * @param {object} listenables An object of listenables
     */
    listenToMany(listenables) {
        if (!this._isMounted) {
            this._listenStack.push({
                method: '_listenToMany',
                args: [listenables]
            });
        }

        this._bindMethods();
        this._listenToMany(listenables);
    }

    _bindMethods() {
        if (this._methodsAreBound) {
            return;
        }

        let methodName;
        for (const key in ListenerMethods) {
            // We have overriden `listenTo` and `listenToMany` above, so make special cases here
            methodName = (key === 'listenTo' || key === 'listenToMany') ? `_${key}`: key;

            if (this[methodName] !== ListenerMethods[key]) {
                if (this[methodName]) {
                    throw new Error(`Can\'t have other property ${methodName} when extending BaseComponent!`);
                }
                this[methodName] = ListenerMethods[key];
            }
        }

        this._methodsAreBound = true;
    }
}

export default BaseComponent;
