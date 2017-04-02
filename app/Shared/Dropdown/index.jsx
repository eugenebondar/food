/**
 * Dropdown.
 * @module Share/Dropdown
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';
import ReactDOM from 'react-dom';

export default class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            isClicked: false
        };
        this.onClick = this.onClick.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
        this.hideList = this.hideList.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.closeOnClick = this.closeOnClick.bind(this);
    }
    componentDidMount() {
        window.addEventListener('click', this.handleDocumentClick);
    }
    componentWillUnmount() {
        window.removeEventListener('click', this.handleDocumentClick);
    }
    componentWillReceiveProps() {
        if (this.props.isHide) {
            this.hideList();
        }
    }
    render() {
        const {actionsList, label, className, isDisabled} = this.props;
        const {isShow, isClicked} = this.state;
        return (
            <div
                ref="area"
                onClick={this.onClick}
                onMouseOver={this.onMouseOver}
                onMouseLeave={this.hideList}
                className={'dropdown__wrap ' + className}
            >
                {label}
                {!isDisabled ? (
                    <ul
                        onClick={this.closeOnClick}
                        className={'action-dropdown-list sc-bg-primary-children-hover sc-txt-primary' + (isShow && !isClicked ? '' : ' hide')}
                    >
                        {actionsList}
                    </ul>
                ) : null}
            </div>
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
    onClick() {
        this.setState({
            isShow: true
        });
    }
    onMouseOver() {
        if ('undefined' !== typeof this.props.reactOnHoverEvent && this.props.reactOnHoverEvent) {
            this.setState({
                isShow: true
            });
        }
    }
    closeOnClick() {
        if (this.props.closeOnClick) {
            this.setState({
                isClicked: true,
                isShow: false
            });
        }
    }
}

Dropdown.propTypes = {
    actionsList: React.PropTypes.array,
    label: React.PropTypes.object,
    className: React.PropTypes.string,
    actionsTrigger: React.PropTypes.func,
    closeOnClick: React.PropTypes.bool,
    isDisabled: React.PropTypes.bool,
    isHide: React.PropTypes.bool,
    reactOnHoverEvent: React.PropTypes.bool
};

Dropdown.defaultProps = {
    className: '',
    closeOnClick: true,
    isDisabled: false,
    isHide: false
};
