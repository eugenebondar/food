/**
 * ConformationPopup.
 * @module Shared/ConformationPopup
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';
import Translate from 'counterpart';

export default class ConfirmationPopup extends React.Component {
    constructor(props) {
        super(props);
        this.cancel = this.cancel.bind(this);
        this.confirm = this.confirm.bind(this);
    }
    render() {
        const controls = this.props.isNoAction ? (
            <div className="modal-dialog-buttons">
                <button onClick={this.cancel} className="sc-btn fd__button sc-btn-primary">
                    <span>{Translate('general.ok')}</span>
                </button>
            </div>
        ) : (
            <div className="modal-dialog-buttons">
                <button onClick={this.cancel} className="cancel-btn sc-btn">
                    <span>{Translate('general.no')}</span>
                </button>
                <button onClick={this.confirm} className="sc-btn fd__button sc-btn-primary">
                    <span>{Translate('general.yes')}</span>
                </button>
            </div>
        );
        return (
            <div className="modal-dialog conformation-popup">
                <div className="modal-dialog-content">{this.props.title}</div>
                {controls}
            </div>
        );
    }
    cancel() {
        this.props.cancel();
    }
    confirm() {
        const {confirm, returnData} = this.props;
        confirm(returnData);
    }
}

ConfirmationPopup.propTypes = {
    title: React.PropTypes.string,
    isNoAction: React.PropTypes.bool,
    returnData: React.PropTypes.any,
    cancel: React.PropTypes.func,
    confirm: React.PropTypes.func
};

ConfirmationPopup.defaultProps = {
    isNoAction: false
};
