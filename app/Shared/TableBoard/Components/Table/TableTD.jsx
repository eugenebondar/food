/**
 * TableTD representing a table's TD cell component.
 * @module TableBoard/Elements/Table/TableTH
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';

import {DashboardActions} from '../../../../Actions';

import Array from '../../Elements/Cells/Array';
import Permissions from '../../Elements/Cells/Permissions';
import Reports from '../../Elements/Cells/Reports';
import Date from '../../Elements/Cells/Date';
import LinkTD from '../../Elements/Cells/LinkTD';
import Blank from '../../Elements/Cells/Blank';
import Text from '../../Elements/Cells/Text';
import Input from '../../Elements/Cells/Input';
import Email from '../../Elements/Cells/Email';
import Trigger from '../../Elements/Cells/Trigger';
import Status from '../../Elements/Cells/Status';
import Severity from '../../Elements/Cells/Severity';

const TableTD = React.createClass({
    propTypes: {
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
            React.PropTypes.array,
            React.PropTypes.object
        ]),
        test: React.PropTypes.object,
        link: React.PropTypes.object,
        expansion: React.PropTypes.bool,
        isExpand: React.PropTypes.bool,
        isService: React.PropTypes.bool,
        expandTrigger: React.PropTypes.func,
        trigger: React.PropTypes.func,
        type: React.PropTypes.string,
        translate: React.PropTypes.string,
        width: React.PropTypes.string,
        selectable: React.PropTypes.bool,
        selectTrigger: React.PropTypes.func
    },
    statics: {
        /**
         * Get class object for cells.
         * @static
         * @param {String} cellType.
         * @return {Object} cell class or null.
         */
        getCell(cellType) {
            const Cell = {
                'text': Text,
                'blank': Blank,
                'link': LinkTD,
                'severity': Severity,
                'status': Status,
                'email': Email,
                'input': Input,
                'trigger': Trigger,
                'reports': Reports,
                'list': Permissions,
                'array': Array,
                'date': Date
            }[cellType];
            return (typeof Cell === 'undefined' ? null : Cell);
        }
    },
    render() {
        const {type, width, ...other} = this.props,
            style = {
                width: (width !== '' && width) ? width+'px' : '',
                maxWidth: (width !== '' && width) ? width+'px' : ''
            };
        const Component = this.constructor.getCell(type);
        return type !== 'hidden' ? (
            <td
                className={(this.props.expansion || this.props.selectable) ? 'expand-cell' : ''}
                style={style}
            >
                <Component {...other} openChangeStatusPopup={this.openChangeStatusPopup}/>
            </td>
        ) : null;
    },
    openChangeStatusPopup(value) {
        DashboardActions.updateTrigger('openChangeStatusPopup', {
            id: this.props.test.id,
            state: value
        });
    }
});

export default TableTD;
