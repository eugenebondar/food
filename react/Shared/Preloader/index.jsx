/**
 * Preloader.
 * @module Shared/Preloader
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';

export default class Preloader extends React.Component {
    render() {
        return (
            <div className={'preloading__wrap ' + this.props.className}></div>
        );
    }
}

Preloader.propTypes = {
    className: React.PropTypes.string
};

Preloader.defaultProps = {
    className: ''
};
