/**
 * Pagination.
 * @module Shared/Pagination
 * @version 1.0.0
 * @requires React
 *
 * @author Yevhen Bondar
 * @copyright (c) 2016 Yevhen Bondar.
 */

import React from 'react';

import Page from './Page';
import './pagination.less';

export default class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.renderPageItem = this.renderPageItem.bind(this);
        this.prev = this.prev.bind(this);
        this.forFirst = this.forFirst.bind(this);
        this.next = this.next.bind(this);
        this.forLast = this.forLast.bind(this);
    }
    render() {
        const {total, per, className, page, maxPage} = this.props,
            {renderPageItem} = this;
        if (total > per) {
            const pageAmount = Math.ceil(total/per);
            let pagination = [],
                config = [];
            if (pageAmount > maxPage) {
                if (page < 4) {
                    config = [1,2,3,'',pageAmount-1, pageAmount];
                    page === 3 ? config.splice(3, 0, 4) : null;
                } else if (page > pageAmount-3) {
                    config = [1,2,'',pageAmount-2,pageAmount-1, pageAmount];
                    page === 3 ? config.splice(3, 0, pageAmount-3) : null;
                } else {
                    config = [1,2,'',page-1,page,page+1,'',pageAmount-1, pageAmount];
                    page === 4 ? config.splice(2, 1) : null;
                    page === pageAmount-3 ? config.splice(6, 1) : null;
                }
                pagination = config.map(function(item, i) {
                    return ('number' === typeof item) ? (
                        renderPageItem(item, i, page)
                    ) : (
                        <li className="pag-nav disabled" key={i}>...</li>
                    );
                });
            } else {
                for (let i = 1; i <= pageAmount; i++) {
                    pagination.push(renderPageItem(i, i, page));
                }
            }
            const prev = page !== 1 ? (
                    <li className="pag-nav" onClick={this.prev}>
                        <span className="fa fa-angle-left" />
                    </li>
                ) : null,
                next = page !== pageAmount ? (
                    <li className="pag-nav" onClick={this.next}>
                        <span className="fa fa-angle-right" />
                    </li>
                ) : null,
                forFirst = page !== 1 ? (
                    <li className="pag-nav" onClick={this.forFirst}>
                        <span className="fa fa-angle-double-left" />
                    </li>
                ) : null,

                forLast = page !== pageAmount ? (
                    <li className="pag-nav" onClick={this.forLast}>
                        <span className="fa fa-angle-double-right" />
                    </li>
                ) : null;
            return (
                <div className={'pagination__wrap ' + className}>
                    <ul className="pagination__list">
                        {forFirst}
                        {prev}
                        {pagination}
                        {next}
                        {forLast}
                    </ul>
                </div>
            );
        }
        return null;
    }
    renderPageItem(item, i, current) {
        return (
            <Page
                key={i}
                onClick={this.props.trigger}
                item={item}
                current={current}
            />
        );
    }
    prev() {
        const {trigger, page} = this.props;
        if (page !== 1) {
            trigger(page-1);
        }
    }
    forFirst() {
        const {trigger, page} = this.props;
        if (page !== 1) {
            trigger(1);
        }
    }
    next() {
        const {total, per, trigger, page} = this.props;
        const pageAmount = Math.ceil(total/per);
        if (page !== pageAmount) {
            trigger(page+1);
        }
    }
    forLast() {
        const {total, per, trigger, page} = this.props;
        const pageAmount = Math.ceil(total/per);
        if (page !== pageAmount) {
            trigger(pageAmount);
        }
    }
}

Pagination.propTypes = {
    total: React.PropTypes.number,
    page: React.PropTypes.number,
    per: React.PropTypes.number,
    maxPage: React.PropTypes.number,
    className: React.PropTypes.string,
    trigger: React.PropTypes.func
};

Pagination.defaultProps = {
    className: '',
    maxPage: 7
};
