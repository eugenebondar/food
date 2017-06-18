import React from 'react';
import './ComponentName.less'; //todo add there some styles or remove

export default class ComponentName extends React.PureComponent {
    constructor() {
        super();
    }

    render() {
        return <div className="component-name">
            Hello world
            {this.props.isError && <div>There was error</div>}
            {this.props.isLoading && <div>Loading</div>}
            <div>{this.props.text}</div>
        </div>;
    }
}

ComponentName.propTypes = {
    isError: React.PropTypes.bool,
    isLoading: React.PropTypes.bool,
    text: React.PropTypes.string
};
