/**
 * Actions representing a table's td cell with actions component.
 * @module TableBoard/Components/Actions
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import Action from '../Elements/Actions/Action';

export default class Actions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            isClicked: false
        };
        this.hideList = this.hideList.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
        this.onClick = this.onClick.bind(this);
        this.closeOnClick = this.closeOnClick.bind(this);
    }
    componentDidMount() {
        window.addEventListener('click', this.handleDocumentClick);
    }
    componentWillUnmount() {
        window.removeEventListener('click', this.handleDocumentClick);
    }
    render() {
        const actionsList = this.props.actions.map((item, i) => {
            return (
                <Action
                    key={i}
                    action={item}
                    actionsTrigger={this.props.actionsTrigger}
                />
            );
        });
        const {isShow, isClicked} = this.state;
        return (
            <td ref="area"
                onMouseLeave={this.hideList}
                style={{width: '58px'}}
                className="center"
            >
                <div className="test-actions-wrap dropdown__wrap "
                     onClick={this.onClick}
                >
                    <button className="test-action-btn sc-txt-primary-hover">
                        <span className="sc-icon-hamburger-menu"/>
                    </button>
                    <div className={'table-action-list-wrapper sc-txt-primary' + (isShow && !isClicked ? '' : ' hide')} >
                        <ul
                            onClick={this.closeOnClick}
                            className={'sc-bg-primary-children-hover table-action-dropdown-list action-dropdown-list'}
                        >
                            {actionsList}
                        </ul>
                    </div>
                </div>

            </td>
        );
    }
    hideList() {
        this.setState({
            isShow: false,
            isClicked: false
        });
    }
    handleDocumentClick(e) {
        const area = ReactDOM.findDOMNode(this.refs.area);
        if (!area.contains(e.target)) {
            this.hideList();
        }
    }
    onClick(e) {
        this.setState({
            isShow: true
        });
    }
    closeOnClick() {
        if (this.closeOnClick) {
            this.setState({
                isClicked: true,
                isShow: false
            });
        }
    }
}

Actions.propTypes = {
    actions: React.PropTypes.array,
    actionsTrigger: React.PropTypes.func
};
