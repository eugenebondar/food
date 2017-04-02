/**
 * StatusLabel.
 * @module Shared/StatusLabel
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';

export default class StatusLabel extends React.Component {
    constructor(props) {
        super(props);
        this.getIcon = this.getIcon.bind(this);
    }
    render() {
        return this.getIcon();
    }
    getIcon() {
        const value = this.props.value;
        let className = '';
        if (value) {
            switch (value.toLowerCase()) {
                case 'in progress':
                case 'in_progress':
                    className = 'sc-icon-circle-play-btn si__in-progress';
                    break;
                case 'ready for testing':
                case 'ready_for_testing':
                    className = 'sc-bg-grade-a sc-icon-check si__ready';
                    break;
                case 'needs configuration':
                case 'needs_configuration':
                case 'waiting_for_info':
                case 'waiting for info':
                case 'waiting_for_customer':
                case 'waiting for customer':
                    className = 'sc-grade-c sc-icon-triangle-warning si__needs-config';
                    break;
                case 'queued':
                    className = 'sc-grade-c sc-icon-circle-arrow-right si__queued';
                    break;
                case 'completed':
                    className = 'sc-grade-a sc-icon-check si__completed';
                    break;
                case 'response_provided':
                case 'response provided':
                    className = 'status__icon fa fa-thumbs-up si__response_provided';
                    break;
                default:
                    className = '';
            }
        }
        return <span className={'status__icon '+ className}/>;
    }
}

StatusLabel.propTypes = {
    value: React.PropTypes.string
};

