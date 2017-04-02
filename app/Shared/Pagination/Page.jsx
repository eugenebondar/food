/**
 * Page.
 * @module Shared/Pagination/Page
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';

export default class Page extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    render() {
        const {current, item} = this.props;
        return (
            <li className={(current === item) ? 'current' : ''} onClick={this.onClick}>{item}</li>
        );
    }
    onClick() {
        const {current, item, onClick} = this.props;
        if (current !== item) {
            onClick(item);
        }
    }
}

Page.propTypes = {
    item: React.PropTypes.number,
    current: React.PropTypes.number,
    onClick: React.PropTypes.func
};
