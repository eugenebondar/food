/**
 * QuickTips.
 * @module Shared/QuickTips
 * @version 1.0.0
 * @requires React
 *
 * @author Andrii Siusko
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';
import Translate from 'counterpart';
import {QuickTipsActions} from '../../Actions';
import {Popover, POPOVER_PLACEMENTS, POPOVER_OPEN_TRIGGER} from 'apoc-react';

import './QuickTips.less';

export default class QuickTips extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShoved: false
        };
        this.showPrev = this.showPrev.bind(this);
        this.showNext = this.showNext.bind(this);
        this.hideTip = this.hideTip.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({isShoved:nextProps.tipData.isShoved});
    }
    render() {
        const prevTip = this.props.tipData.prev ? (
            <span className="prev-tip" onClick={this.showPrev}><a>{Translate('firstLogin.prev')}</a></span>
        ) : null;
        const nextTip = this.props.tipData.next ? (
            <span className="next-tip" onClick={this.showNext}><a>{Translate('firstLogin.next')}</a></span>
        ) : null;
        const done = this.props.tipData.done ? (
            <span className="next-tip" onClick={this.hideTip}><a>{Translate('firstLogin.done')}</a></span>
        ) : null;
        const tipDot = this.props.tipData.prev ? (
            <span className="quick-tips-dot" />
        ) : null;
        const footer = (<div className="quick-tips-footer">
            <span className="quick-tips-counter">
                {(this.props.tipData.tip + 1) + Translate('firstLogin.of') + (this.props.tipData.length)}
            </span>
            {nextTip}
            {done}
            {tipDot}
            {prevTip}
        </div>);
        return (
            <Popover
                className={this.props.className}
                title={this.props.title}
                isVisible={this.state.isShoved}
                openTrigger={POPOVER_OPEN_TRIGGER.MANUAL}
                placement={this.props.placement}
                isClosable
                onClose={this.hideTip}
                header={this.props.tipData.header}
            >
                {this.props.tipData.message}
                {footer}
            </Popover>
        );
    }
    showPrev() {
        this.hideTip();
        QuickTipsActions.getQuickTip(this.props.tipData.tip - 1);
    }
    showNext() {
        this.hideTip();
        QuickTipsActions.getQuickTip(this.props.tipData.tip + 1);
    }
    hideTip() {
        QuickTipsActions.hideQuickTip(this.props.tipData.tip);
    }
}

QuickTips.propTypes = {
    title: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.element
    ]),
    tipData: React.PropTypes.object,
    placement: React.PropTypes.string,
    className: React.PropTypes.string
};

QuickTips.defaultProps = {
    title: null,
    tipData: {
        isShoved: false
    },
    placement: POPOVER_PLACEMENTS.TOP_LEFT,
    className: 'quick-tips'
};
