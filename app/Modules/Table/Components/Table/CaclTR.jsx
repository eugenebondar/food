import React from 'react';

import Input from '../../../../Shared/Elements/Input';

export default class CaclTR extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };

        this.updateSearch = this.updateSearch.bind(this);
        this.calculateValue = this.calculateValue.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }
    render() {
        const {search} = this.state;
        const {calculateValue, renderDailyNormValue} = this;
        const {name, cal, fats, carbohydrates, proteins, calcValue} = this.props;
        const dailyNormInPercent = search && calcValue ? (
                (parseInt(search)/100*cal).toFixed(1)/parseInt(calculateValue)*100
        ) : null;

        return (
            <tr>
                <td className="td-name"><Input value={search} validationType="number" updateValue={this.updateSearch}/>{name}</td>
                <td className="td-cal">
                    {calculateValue(cal)} cal
                    {renderDailyNormValue(dailyNormInPercent)}
                </td>
                <td className="td-fats">{calculateValue(fats)} g</td>
                <td className="td-carbohydrates">{calculateValue(carbohydrates)} g</td>
                <td className="td-proteins">{calculateValue(proteins)} g</td>
                <td className="td-action">
                    <button onClick={this.removeItem} className="fa fa-minus"></button>
                </td>
            </tr>
        );
    }
    renderDailyNormValue(value) {
        let className ='';
        if (value > 70) {
            className = 'critical';
        } else if (value > 50 && value < 70) {
            className = 'high';
        } else if (value > 25 && value < 50) {
            className = 'medium';
        } else if (value <= 25) {
            className = 'low';
        }
        return <label className={'daily-label ' + className}>{value} %</label>;
    }
    calculateValue(value) {
        const {search} = this.state;
        return search === '' ? value : ((parseInt(search)/100*value).toFixed(1) + ' ('+value+')');
    }
    updateSearch(value) {
        this.setState({search: value});
    }
    removeItem() {
        const {removeItem, id} = this.props;
        removeItem(id);
    }
}

CaclTR.propTypes = {
    name: React.PropTypes.string,
    cal: React.PropTypes.string,
    calcValue: React.PropTypes.string,
    fats: React.PropTypes.string,
    carbohydrates: React.PropTypes.string,
    proteins: React.PropTypes.string,
    removeItem: React.PropTypes.func,
    addItem: React.PropTypes.func
};

