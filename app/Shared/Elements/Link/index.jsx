/**
 * Link.
 * @module Shared/Elements/Link
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';

export default class Link extends React.Component {
    render() {
        const {value, className, target, name} = this.props,
            regExp = /^(f|ht)tps?:\/\//i,
            content = regExp.test(value) ? (
                <a target={target} className={'sc-txt-primary ' + className} href={value}>
                    {'undefined' !== typeof name ? name : value}
                </a>
            ) : <span className="not-pointer">{value}</span>;
        return content;
    }
}

Link.propTypes = {
    target: React.PropTypes.string,
    name: React.PropTypes.string,
    className: React.PropTypes.string,
    value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
    ])
};

Link.defaultProps = {
    target: '_blank',
    className: ''
};

