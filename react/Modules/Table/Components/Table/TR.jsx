import React from 'react';

export default class TR extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };

        this.addItem = this.addItem.bind(this);
    }
    render() {
        const {name, cal, fats, carbohydrates, proteins} = this.props;
        return (
            <tr>
                <td className="td-name">{name}</td>
                <td className="td-cal">{cal} cal</td>
                <td className="td-fats">{fats} g</td>
                <td className="td-carbohydrates">{carbohydrates} g</td>
                <td className="td-proteins">{proteins} g</td>
                <td className="td-action">
                    <button onClick={this.addItem} className="fa fa-plus"></button>
                </td>
            </tr>
        );
    }
    addItem() {
        const {id, addItem} = this.props;
        addItem(id);
    }
}

TR.propTypes = {
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    cal: React.PropTypes.string,
    fats: React.PropTypes.string,
    carbohydrates: React.PropTypes.string,
    proteins: React.PropTypes.string,
    addItem: React.PropTypes.func
};

