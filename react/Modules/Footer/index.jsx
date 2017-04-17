/**
 * Footer.
 * @module Footer
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 */

import React from 'react';

import './Footer.less';

export default class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div className="site">
                    <div className="copyrights">
                        © copyrights Yevhen Bondar 2017
                    </div>
                </div>
            </footer>
        );
    }
}

Footer.propTypes = {
    currentUser: React.PropTypes.object
};
