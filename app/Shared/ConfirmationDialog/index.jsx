import './index.less';
import React from 'react';
import {ModalDialog} from 'apoc-react';
import Translate from 'counterpart';
import classNames from 'classnames';

export default class ConfirmationDialog extends React.Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }
    render() {
        const {title, isNoAction, className} = this.props;
        const dialogClass = classNames('confirmation-dialog', className);
        const _dialogFooter = isNoAction ? (
            <div className="modal-btn-wrap">
                <button onClick={this.closeDialog} className="sc-btn fd__button sc-btn-primary">
                    <span>{Translate('general.ok')}</span>
                </button>
            </div>
        ) : (
            <div className="modal-btn-wrap">
                <button onClick={this.closeDialog} className="cancel-btn sc-btn">
                    <span>{Translate('general.no')}</span>
                </button>
                <button onClick={this.submit} className="sc-btn fd__button sc-btn-primary">
                    <span>{Translate('general.yes')}</span>
                </button>
            </div>
        );
        return (
            <ModalDialog
                isOpen={true}
                header=""
                footer={_dialogFooter}
                onOutsideModalClick={this.closeDialog}
                className={dialogClass}
            >
                {title}
            </ModalDialog>
        );
    }
    closeDialog() {
        const {cancel, name} = this.props;
        cancel(name);
    }
    submit() {
        const {submit, returnData} = this.props;
        submit(returnData);
    }
}

ConfirmationDialog.propTypes = {
    title: React.PropTypes.any,
    name: React.PropTypes.string,
    className: React.PropTypes.string,
    cancel: React.PropTypes.func,
    submit: React.PropTypes.func,
    isNoAction: React.PropTypes.bool,
    returnData: React.PropTypes.any
};

ConfirmationDialog.defaultProps = {
    isNoAction: false,
    className: ''
};
