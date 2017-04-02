/**
 * Table Board.
 * @module TableBoard
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';

import SessionUserStore from '../../Stores/SessionUser/SessionUserStore';
import SessionUserActions from '../../Stores/SessionUser/SessionUserActions';

import Table from './Components/Table';
import BaseComponent from '../BaseComponent';

import './TableBoard.less';
import './Popup.less';
import './Grid.less';
import './Label.less';

export default class TableBoard extends BaseComponent {
    constructor(props) {
        super(props);
        this.listenTo(SessionUserStore, this._listenSessionStore);
        this.state = {
            profileColumnsSettings: null
        };
    }
    componentWillMount() {
        SessionUserActions.getUserSettings();
    }
    render() {
        const titleProps = this.props.title,
            title = (titleProps && 'undefined' !== typeof titleProps && titleProps !== '') ? <h3>{titleProps}</h3> : null,
            table = (
                <Table
                    data={this.props.data}
                    isService={this.props.isService}
                    profileColumnsSettings={this.state.profileColumnsSettings}
                    columnConfig={this.props.columnConfig}
                    actionsTrigger={this.props.actionsTrigger}
                    selectTrigger={this.props.selectTrigger}
                    actions={this.props.actions}
                    expansion={this.props.expansion}
                    getExpansionData={this.props.getExpansionData}
                    expandId={this.props.expandId}
                    trigger={this.props.trigger}
                    selectable={this.props.selectable}
                    isAllSelected={this.props.isAllSelected}
                    emptyTableTitle={this.props.emptyTableTitle}
                    updateSortableStatus={this.props.updateSortableStatus}
                />
            );
        return (
            <div className={this.props.className}>
                {title}
                {this.state.profileColumnsSettings ? table : null}
            </div>
        );
    }
    _listenSessionStore(event, data) {
        switch (event) {
            case 'userSettings':
            case 'userSettingsReloaded':
                let profileColumnsSettings = [];
                if (data && data[this.props.tableName] && data[this.props.tableName].length) {
                    profileColumnsSettings = data[this.props.tableName];
                }
                this.setState({
                    profileColumnsSettings: profileColumnsSettings
                });
        }
    }
}

TableBoard.propTypes = {
    className: React.PropTypes.string,
    tableName: React.PropTypes.string,
    userSettings: React.PropTypes.object,
    emptyTableTitle: React.PropTypes.string,
    expandId: React.PropTypes.string,
    data: React.PropTypes.array,
    title: React.PropTypes.string,
    pagination: React.PropTypes.bool,
    expansion: React.PropTypes.bool,
    selectable: React.PropTypes.bool,
    isAllSelected: React.PropTypes.bool,
    isService: React.PropTypes.bool,
    columnConfig: React.PropTypes.array,
    actions: React.PropTypes.array,
    actionsTrigger: React.PropTypes.func,
    selectTrigger: React.PropTypes.func,
    updateSortableStatus: React.PropTypes.func,
    trigger: React.PropTypes.func,
    getExpansionData: React.PropTypes.func
};

TableBoard.defaultProps = {
    className: '',
    tableName: '',
    title: '',
    emptyTableTitle: '',
    isService: false,
    expansion: false,
    selectable: false
};
