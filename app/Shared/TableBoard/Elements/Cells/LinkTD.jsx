/**
 * Text representing a table's td value with type link.
 * @module TableBoard/Elements/Table/Cells/Link
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';
import {Link} from 'react-router';

import DateTimeFormat from '../../../Configuration/DateTimeFormat';

export default class LinkTD extends React.Component {
    render() {
        const {link, test, value} = this.props,
            idSource = test[link.id],
            id = (idSource && 'undefined' !== typeof idSource) ? idSource : '',
            url = link.url + id,
            type = link.type;
        let content;
        switch (type) {
            case 'date':
                content = <DateTimeFormat date={value} />;
                break;
            default:
                content = (value && value !== '') ? value : '-';
                break;
        }
        return (
            <Link className="test-table-cel-wrap" to={url}>
                {content}
            </Link>
        );
    }
}

LinkTD.propTypes = {
    test: React.PropTypes.object,
    link: React.PropTypes.object,
    value: React.PropTypes.string,
    expandTrigger: React.PropTypes.func,
    expansion: React.PropTypes.bool,
    isExpand: React.PropTypes.bool
};
