/**
 * Routing module
 * @module Utils/Routing
 * @see {@link https://github.com/rackt/react-router|GitHub}
 * @see {@link https://rackt.github.io/react-router/tags/v1.0.0-beta3.html}
 */

import React from 'react';
import Main from './Modules/Main';

import {useRouterHistory, Router, Route} from 'react-router';
import {createHashHistory} from 'history';

const appHistory = useRouterHistory(createHashHistory)({queryKey: false});

function redirect() {
    appHistory.push('/');
}

const Routes = (
    <Router history={appHistory}>
        <Route path='/' component={Main} childRoutes={[
            {
                path: '*',
                onEnter: redirect
            }
        ]}>
        </Route>
    </Router>
);

export default Routes;
