import React from 'react';
import classnames from 'classnames';

export const ALERT_TYPE = {
    WARNING: 'warning',
    ERROR: 'error'
};
Object.freeze(ALERT_TYPE);

const ALERT_TYPE_TO_CLASS = {
    [ALERT_TYPE.WARNING]: 'sc-alert-warning',
    [ALERT_TYPE.ERROR]: 'sc-alert-error'
};

export default class Alert extends React.Component {
    componentDidMount() {
        if (this.props.millisecondsToClose) {
            this.intervalId = setTimeout(this.props.onClose, this.props.millisecondsToClose);
        }
    }

    componentWillUnmount() {
        window.clearInterval(this.intervalId);
    }

    render() {
        const main = classnames('sc-alert sc-alert-closable sc-animate',
            ALERT_TYPE_TO_CLASS[this.props.type], this.props.className);

        const closeButton = this.props.isClosable ? (
            <button className="sc-close" aria-label="Close" onClick={this.props.onClose}>
                <span aria-hidden="true" className="sc-icon-xmark"/>
            </button>
        ) : null;

        return (
            <div className={main} role="alert">
                {closeButton}
                <span className="sc-icon-triangle-warning"/>
                {this.props.children}
                {/*<a href="#" className="sc-alert-link">Do this to fix it</a>*/}
            </div>
        );
    }
}

Alert.propTypes = {
    type: React.PropTypes.oneOf(Object.values(ALERT_TYPE)),
    children: React.PropTypes.node,
    onClose: React.PropTypes.func,
    isClosable: React.PropTypes.bool,
    className: React.PropTypes.string,
    millisecondsToClose: React.PropTypes.number
};

Alert.defaultProps = {
    type: ALERT_TYPE.WARNING,
    isClosable: true
};
