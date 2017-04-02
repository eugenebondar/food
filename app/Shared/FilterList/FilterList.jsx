import React from 'react';
import './FilterList.less';

export default class FilterList extends React.Component {

    remove(value) {
        this.props.onChange(this.props.options.filter(option=> option.value !== value));
    }

    removeAll() {
        this.props.onChange([]);
    }

    render() {
        const {options} = this.props;

        return (
            <div className="selected-filter-options-list">
                <ul>
                    {options.map(({name, value}) => (
                        <li key={value} className="selected-filter-options-list__option">
                            <span>{name}</span>
                            <button className="sc-icon-filled-circle-close sc-txt-primary"
                                    onClick={this.remove.bind(this, value)}/>
                        </li>
                    ))}

                    <li>
                        <button onClick={this.removeAll.bind(this)} className="clear-all">Clear All</button>
                    </li>
                </ul>
            </div>
        );
    }
}

FilterList.propTypes = {
    options: React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string,
        value: React.PropTypes.string
    })),
    onChange: React.PropTypes.func
};

FilterList.defaultProps = {
    options: []
};
