/**
 * Action representing action component.
 * @module TableBoard/Elements/Table/Actions/Action
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';

export default class Action extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    render() {
        return this.props.action ?
            (<li onClick={this.onClick}><span className={this.props.action.icon} />{this.props.action.title}</li>) :
            null;
    }
    onClick(e) {
        this.props.actionsTrigger(this.props.action.value, e);
    }
}

Action.propTypes = {
    action: React.PropTypes.object,
    actionsTrigger: React.PropTypes.func
};
