/**
 * Text representing a table's td value with type array.
 * @module TableBoard/Elements/Table/Cells/Array
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';
import {Popover} from 'apoc-react';

import LinkComponent from '../../../Elements/Link';

export default class Array extends React.Component {
    render() {
        const {value} = this.props,
            firstItem = value ? value[0] : '-',
            linkList = value ? (
                value.map(function(item, i) {
                    return (
                        <li key={i}>
                            <LinkComponent blank="_blank" value={item} />
                        </li>
                    );
                })
            ) : null,
            dropDown = (value.length > 1) ? (
                <Popover
                    placement="topLeft"
                    title={<LinkComponent blank="_blank" value={firstItem} />}
                >
                    <ul>{linkList}</ul>
                </Popover>
            ) : <LinkComponent blank="_blank" value={firstItem} />;
        return (
            <div className='td-array-value-wrap'>
                {dropDown}
            </div>
        );
    }
}

Array.propTypes = {
    value: React.PropTypes.any,
    test: React.PropTypes.object,
    link: React.PropTypes.object,
    expandTrigger: React.PropTypes.func,
    expansion: React.PropTypes.bool,
    isExpand: React.PropTypes.bool
};
