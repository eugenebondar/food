/**
 * TAble expand TR representing a table's row with test details.
 * @module TableBoard/Elements/Table/TableExpandTR
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';

export default class TableExpandTR extends React.Component {
    render() {
        const {columnConfig, actions, getExpansionData, id} = this.props,
            cellAmount = ('undefined' !== typeof actions && actions.length > 0) ? (
                ++columnConfig.length
            ) : (
                columnConfig.length
            ),
            expandData = getExpansionData(id);
        return (
            <tr>
                <td colSpan={cellAmount}>
                    {expandData}
                </td>
            </tr>
        );
    }
}

TableExpandTR.propTypes = {
    id: React.PropTypes.string,
    actions: React.PropTypes.array,
    columnConfig: React.PropTypes.array,
    getExpansionData: React.PropTypes.func
};
