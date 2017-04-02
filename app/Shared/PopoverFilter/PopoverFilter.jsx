import React from 'react';
import classnames from 'classnames';
import './PopoverFilter.less';
import {Popover, POPOVER_PLACEMENTS, POPOVER_OPEN_TRIGGER} from 'apoc-react';

export default class PopoverFilter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const wrappedChildren = React.Children.map(this.props.children, child => React.cloneElement(child, {
            onChange: (...args) => {
                if (child.props.onChange) {
                    child.props.onChange(...args);
                }
                if (this.props.onChange) {
                    this.props.onChange.apply(this, [child.props.name, ...args]);
                }
            }
        }));
        const filterButton = <button className="tests-filter-btn sc-txt-primary" disabled={this.props.disabled}>
            <span className="sc-icon-filter"/>
        </button>;

        return this.props.disabled ? <div className="popover-filter">{filterButton}</div> : (
            <Popover
                title={filterButton}
                className={classnames('popover-filter', this.props.className)}
                placement={POPOVER_PLACEMENTS.RIGHT_TOP}
                openTrigger={POPOVER_OPEN_TRIGGER.MOUSE_CLICK}
                removeChildrenFromDOMWhenHidden={true}
            >
                {wrappedChildren}
            </Popover>
        );
    }
}

PopoverFilter.propTypes = {
    disabled: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    children: React.PropTypes.node,
    className: React.PropTypes.string
};

