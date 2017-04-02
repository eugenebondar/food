/**
 * Table representing a test table component.
 * @module TableBoard/Components/Table
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';

import TableTH from './Table/TableTH';
import TableTR from './Table/TableTR';
import TableExpandTR from './Table/TableExpandTR';

export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expandId: this.props.expandId,
            columnConfig: []
        };
        this.changeExpandId = this.changeExpandId.bind(this);
        this.getNewColumnConfig = this.getNewColumnConfig.bind(this);
    }
    componentWillMount() {
        this.getNewColumnConfig(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.getNewColumnConfig(nextProps);
    }
    render() {
        const data = this.props.data,
            columnConfig = this.state.columnConfig,
            tableHeader = columnConfig.map((item, i) => {
                return <TableTH
                    key={i}
                    selectable={this.props.selectable && i === 0}
                    selectTrigger={this.props.selectTrigger}
                    sortable={item.sortable}
                    sortConfig={item.sortConfig}
                    name={item.name}
                    type={item.type}
                    source={item.source}
                    isAllSelected={this.props.isAllSelected}
                    updateSortableStatus={this.props.updateSortableStatus}
                />;
            }),
            noRecords = (
                <tr>
                    <td
                        className="empty-table"
                        colSpan={columnConfig.length + (
                            ('undefined' !== typeof this.props.actions && this.props.actions.length > 0)?
                            1:0)
                        }
                    >
                        <div>{this.props.emptyTableTitle}</div>

                    </td>
                </tr>
            ),
            tableRows = data.length > 0 ? data.map(function(item, i) {
                const condition = (this.state.expandId === item.id &&
                        this.props.expansion &&
                        'undefined' !== typeof this.props.getExpansionData
                    ),
                    content = [
                        <TableTR
                            key={i}
                            test={item}
                            actions={this.props.actions}
                            isService={this.props.isService}
                            columnConfig={columnConfig}
                            actionsTrigger={this.props.actionsTrigger}
                            expansion={this.props.expansion}
                            getExpansionData={this.props.getExpansionData}
                            expandId={this.state.expandId}
                            changeExpandId={this.changeExpandId}
                            trigger={this.props.trigger}
                            selectTrigger={this.props.selectTrigger}
                            selectable={this.props.selectable}
                        />
                    ];
                if (condition) {
                    content.push(
                        <TableExpandTR
                            key={item.id}
                            id={item.id}
                            actions={this.props.actions}
                            columnConfig={columnConfig}
                            getExpansionData={this.props.getExpansionData}
                        />
                    );
                }
                return content;
            }.bind(this)) : noRecords,
            actionTH = ('undefined' !== typeof this.props.actions && this.props.actions.length > 0) ?
                <th>Actions</th> : null;
        return (
            <table className="test__table__component sc-table sc-table-striped">
                <thead>
                <tr>
                    {tableHeader}
                    {actionTH}
                </tr>
                </thead>
                <tbody>
                {tableRows}
                </tbody>
            </table>
        );
    }
    changeExpandId(id) {
        this.setState({expandId: this.state.expandId === id? '' : id});
    }
    getNewColumnConfig(props) {
        let newColumnConfig = [],
            fields = props.profileColumnsSettings;
        props.columnConfig.forEach(function(item) {
            fields.forEach(function(field) {
                if (field === item.source) {
                    newColumnConfig.push(item);
                }
            });
        });
        if (!newColumnConfig.length) {
            newColumnConfig = props.columnConfig;
        }
        this.setState({columnConfig: newColumnConfig});
    }
}

Table.propTypes = {
    data: React.PropTypes.array,
    profileColumnsSettings: React.PropTypes.array,
    columnConfig: React.PropTypes.array,
    actions: React.PropTypes.array,
    actionsTrigger: React.PropTypes.func,
    trigger: React.PropTypes.func,
    expansion: React.PropTypes.bool,
    isService: React.PropTypes.bool,
    selectable: React.PropTypes.bool,
    isAllSelected: React.PropTypes.bool,
    selectTrigger: React.PropTypes.func,
    getExpansionData: React.PropTypes.func,
    updateSortableStatus: React.PropTypes.func,
    emptyTableTitle: React.PropTypes.string,
    expandId: React.PropTypes.string
};

Table.defaultProps = {
    className: '',
    tableName: '',
    title: '',
    emptyTableTitle: '',
    isService: false,
    expansion: false,
    selectable: false
};
