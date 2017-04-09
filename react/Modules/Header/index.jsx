/**
 * Header.
 * @module Header
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';

import './Header.less';

export default class Header extends React.Component {
    render() {
        return (
            <header className="header">
                <div className="site">
                    <div className="logo">
                        Eat
                    </div>
                </div>
            </header>
        );
    }
}

// Header.propTypes = {
//     currentUser: React.PropTypes.object,
// };
