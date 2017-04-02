/**
 * Table Configuration
 * @module TableConfiguration
 * @version 1.0.0
 * @requires React
 *
 * @author Andrii Siusko
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';
import Translate from 'counterpart';

import SessionUserStore from '../../../../Stores/SessionUser/SessionUserStore';
import SessionUserActions from '../../../../Stores/SessionUser/SessionUserActions';

import BaseComponent from '../../../BaseComponent';
import ConfigurationDialog from './Dialogs/ConfigurationDialog';

export default class Configuration extends BaseComponent {
    constructor(props) {
        super(props);
        this.listenTo(SessionUserStore, this._listenSessionStore);
        this.state = {
            selectedColumns: null,
            extraColumns: null,
            configurationDialog: null
        };

        this.getSavedConfiguration = this.getSavedConfiguration.bind(this);
        this.showConfiguration = this.showConfiguration.bind(this);
        this.selectAllColumns = this.selectAllColumns.bind(this);
        this.selectFromSaved = this.selectFromSaved.bind(this);
        this.save = this.save.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }

    render() {
        const {configurationDialog} = this.state;
        return (
            <div className="table-conf-btn-wrap">
                <span
                    className="fa fa-cogs table-configuration sc-txt-primary"
                    onClick={this.getSavedConfiguration}
                />
                {configurationDialog ? (
                    <ConfigurationDialog {...configurationDialog} />
                ) : null}
            </div>
        );
    }

    getSavedConfiguration() {
        SessionUserActions.getUserSettings();
        this.state.selectedColumns ? this.showConfiguration() : null;
    }

    showConfiguration() {
        this.setState({
            configurationDialog: {
                name: 'configurationDialog',
                close: this.closeDialog,
                title: Translate('tableCell.configureTable'),
                selectedColumns: this.state.selectedColumns,
                extraColumns: this.state.extraColumns,
                tableName: this.props.tableName,
                extraLabel: this.props.extraLabel,
                save: this.save,
                isService: this.props.isService
            }
        });
    }

    closeDialog(key) {
        if (key) {
            const state = this.state;
            state[key] = null;
            this.setState(state);
        }
    }

    selectAllColumns() {
        let selectedColumns = [], extraColumns = [];
        this.props.columnsConfig.forEach((item) => {
            item.extraConfig ?
                extraColumns.push({source: item.source, selected: false, name: item.name}) :
                selectedColumns.push({source: item.source, selected: true, name: item.name});
        });
        this.setState({
            selectedColumns: selectedColumns,
            extraColumns: extraColumns.length ? extraColumns : null
        });
    }

    selectFromSaved(data) {
        let selectedColumns = [], extraColumns = [];
        this.props.columnsConfig.forEach((item) => {
            if (this.findField(data, item.source) < 0) {
                item.extraConfig ?
                    extraColumns.push({source: item.source, selected: false, name: item.name}) :
                    selectedColumns.push({source: item.source, selected: false, name: item.name});
            } else {
                item.extraConfig ?
                    extraColumns.push({source: item.source, selected: true, name: item.name}) :
                    selectedColumns.push({source: item.source, selected: true, name: item.name});
            }
        });
        this.setState({
            selectedColumns: selectedColumns,
            extraColumns: extraColumns.length ? extraColumns : null
        });
    }

    findField(data, columnName) {
        return data.findIndex(function(elem) {
            return elem === columnName;
        });
    }

    save(selectedColumns, extraColumns) {
        let columns = [];
        selectedColumns.forEach(function(item) {
            if (item.selected) {
                columns.push(item.source);
            }
        });
        extraColumns.forEach(function(item) {
            if (item.selected) {
                columns.push(item.source);
            }
        });
        SessionUserActions.saveTableConfig({
            table_name: this.props.tableName,
            columns: columns
        });
    }

    _listenSessionStore(event, data) {
        switch (event) {
            case 'tableConfigSaved':
                if (data) {
                    this.setState({
                        readyToShowPopUp: false
                    });
                    this.closeDialog('configurationDialog');
                    SessionUserActions.reloadUserSettings();
                }
                break;
            case 'userSettings':
            case 'userSettingsReloaded':
                if (data && data[this.props.tableName] && data[this.props.tableName].length) {
                    this.selectFromSaved(data[this.props.tableName]);
                } else {
                    this.selectAllColumns();
                }
                break;
        }
    }
}

Configuration.propTypes = {
    tableName: React.PropTypes.string,
    extraLabel: React.PropTypes.string,
    columnsConfig: React.PropTypes.array,
    isService: React.PropTypes.bool
};
