/**
 * TableTR representing a table's row component.
 * @module TableBoard/Elements/Table/TableTR
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';

import TableTD from './TableTD';
import Actions from '../Actions';

export default class TableTR extends React.Component {
    constructor(props) {
        super(props);
        this.getShowFlag = this.getShowFlag.bind(this);
        this.checkAction = this.checkAction.bind(this);
        this.expandTrigger = this.expandTrigger.bind(this);
        this.actionsTrigger = this.actionsTrigger.bind(this);
        this.trigger = this.trigger.bind(this);
    }
    render() {
        const {test, columnConfig, expansion, selectable, selectTrigger, expandId, isService} = this.props;
        const actions = this.getShowFlag();
        const tdList = columnConfig.map((item, i) => {
            let sourceArray = item.source.split('/'), value;
            sourceArray.forEach(function(item, i) {
                value = (i > 0) ? value[item] : test[item];
            }.bind(this));
            if ('undefined' !== typeof value && value !== null) {
                value = 'object' === typeof value ? value : value.toString();
            } else {
                value = '';
            }
            return (
                <TableTD
                    {...item}
                    expansion={expansion && i === 0}
                    selectable={selectable && i === 0}
                    expandTrigger={this.expandTrigger}
                    selectTrigger={selectTrigger}
                    isService={isService}
                    isExpand={expandId === test.id}
                    key={i}
                    value={value}
                    test={this.props.test}
                    trigger={this.trigger}
                />
            );
        });
        const actionsTd = ('undefined' !== typeof actions && (actions[0] !== null || actions.length > 1) && actions.length > 0) ? (
            <Actions actionsTrigger={this.actionsTrigger} actions={actions} />
        ) : null;
        return (
            <tr className={(expandId === test.id ? 'expand-tr ' : ' ')+(test.isSelected ? 'selected-tr' : '')}>
                {tdList}
                {actionsTd}
            </tr>
        );
    }
    getShowFlag() {
        const {actions} = this.props;
        return actions.map(action => {
            if (this.checkAction(action.showActions)) {
                return null;
            } else {
                return action;
            }
        });
    }
    checkAction(value) {
        let showActions = value;
        const {test} = this.props;
        if ('undefined' !== typeof showActions) {
            if ('string' === typeof showActions) {
                if (showActions[0]==='!') {
                    showActions = showActions.substring(1);
                    return 'boolean' === typeof test[showActions] && test[showActions] === true;
                }
                return 'boolean' === typeof test[showActions] && test[showActions] === false;
            } else if (Array.isArray(showActions)) {
                for (let i = 0; i < showActions.length; i++) {
                    if ('boolean' === typeof test[showActions[i]] && test[showActions[i]] === false) return true;
                }
                return false;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    expandTrigger() {
        const {expansion, changeExpandId, test} = this.props;
        if (expansion) {
            changeExpandId(test.id);
        }
    }
    actionsTrigger(type, e) {
        const {actionsTrigger, test} = this.props;
        actionsTrigger(type, test.id, e);
    }
    trigger(e) {
        const {trigger, test} = this.props;
        trigger(e, test.id);
    }
}

TableTR.propTypes = {
    test: React.PropTypes.object,
    actions: React.PropTypes.array,
    columnConfig: React.PropTypes.array,
    expansion: React.PropTypes.bool,
    isService: React.PropTypes.bool,
    getExpansionData: React.PropTypes.func,
    actionsTrigger: React.PropTypes.func,
    changeExpandId: React.PropTypes.func,
    trigger: React.PropTypes.func,
    selectable: React.PropTypes.bool,
    selectTrigger: React.PropTypes.func,
    expandId: React.PropTypes.string
};
