import React from 'react';

import Table from './Table';
import Header from './Header';
import Footer from './Footer';
import BaseComponent from '../Shared/BaseComponent';

export default class Main extends BaseComponent {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
    }
    render() {
        return (
            <div className="app__wrapper">
                <div className="main__wrap">
                    <Header />
                    <div className="app__content">
                        <Table />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

Main.propTypes = {
    location: React.PropTypes.object,
    children: React.PropTypes.object
};
