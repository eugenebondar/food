/**
 * Text representing a table's td value with type permissions.
 * @module TableBoard/Elements/Table/Cells/Permissions
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';
import Translate from 'counterpart';

export default class Permissions extends React.Component {
    constructor(props) {
        super(props);
        this.getValue = this.getValue.bind(this);
    }
    render() {
        const {value} = this.props,
            permissions = value.length > 0 ? value.map((item, i) => {
                return (
                    <li key={i}>
                        {this.getValue(item)}
                    </li>
                );
            }) : '-';
        return (
            <ul className='permissions'>
                {permissions}
            </ul>
        );
    }
    getValue(key) {
        return 'undefined' !== typeof this.props.translate ?
            Translate(this.props.translate+key) : key;
    }
}

Permissions.propTypes = {
    value: React.PropTypes.any,
    test: React.PropTypes.object,
    link: React.PropTypes.object,
    translate: React.PropTypes.string,
    expandTrigger: React.PropTypes.func,
    expansion: React.PropTypes.bool,
    isExpand: React.PropTypes.bool
};
