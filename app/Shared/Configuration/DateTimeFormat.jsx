/**
 * Date representing a table's td value with type date.
 * @module Configuration
 * @version 1.0.0
 * @requires React
 *
 * @author Andrii Siusko
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';
import moment from 'moment';
import DateFormats from '../../Utils/DateFormats';

export default class DateTimeFormat extends React.Component {
    render() {
        const {className, date, emptyValue, dataFormat} = this.props;
        return (
            <span className={className}>
                 {date ? moment(date).format(dataFormat) : emptyValue}
            </span>
        );
    }
}

DateTimeFormat.propTypes = {
    date: React.PropTypes.string,
    dataFormat: React.PropTypes.string,
    className: React.PropTypes.string,
    emptyValue: React.PropTypes.string
};

DateTimeFormat.defaultProps = {
    className: '',
    dataFormat: DateFormats.fullDate,
    emptyValue: '-'
};
