import React from 'react';

import TR from './Table/CaclTR';
import Input from '../../../Shared/Elements/Input';

export default class DailyCalculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calcValue: ''
        };
        this.updateSearch = this.updateSearch.bind(this);
    }
    render() {
        const {list, removeItem} = this.props;
        const {calcValue} = this.state;
        const trList = list.map((item, i) => {
            return <TR key={i} {...item} removeItem={removeItem} calcValue={calcValue} />;
        });
        return (
            <div className="table-wrap">
                <Input value={calcValue} validationType="number" updateValue={this.updateSearch} placeholder="Enter daily norm"/>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Calorie</th>
                        <th>Fats</th>
                        <th>Carbohydrates</th>
                        <th>Proteins</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {trList}
                    </tbody>
                </table>
            </div>
        );
    }
    updateSearch(value) {
        this.setState({
            calcValue: value
        });
    }
}

DailyCalculator.propTypes = {
    list: React.PropTypes.array,
    removeItem: React.PropTypes.func
};

