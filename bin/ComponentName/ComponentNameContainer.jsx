import { Component } from 'reflux';
import React from 'react';
import ComponentNameStore from './ComponentNameStore';
import ComponentName from './ComponentName';
import ComponentNameActions from './ComponentNameActions';

export default class ComponentNameContainer extends Component {
    constructor() {
        super();

        this.store = ComponentNameStore;

        this.mapStoreToState(ComponentNameStore, () => {
            //todo implement logic here or remove it
        });
    }

    componentDidMount() {
        ComponentNameActions.init();
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        ComponentNameActions.destroy();
    }

    render() {
        return <ComponentName
            {...this.state}
        />;
    }
}
