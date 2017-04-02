import React from 'react';

import TR from './TR';
import DailyCalculator from '../DailyCalculator';
import Input from '../../../../Shared/Elements/Input';
import Pagination from '../../../../Shared/Pagination';

const defaultParams = {
    page: 1,
    per: 20
};

export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            params: defaultParams,
            list: []
        };
        this.updateSearch = this.updateSearch.bind(this);
        this.paginationTrigger = this.paginationTrigger.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.addItem = this.addItem.bind(this);
    }
    render() {
        const {foodList} = this.props;
        const {search, params, list} = this.state;
        const trList = foodList.filter(item => {
            return item.name.toLowerCase().includes(search.toLowerCase());
        }).map((item, i) => {
            return  <TR key={i} addItem={this.addItem} {...item} />;
        });
        const pagination = (
            <Pagination
                total={trList.length}
                page={params.page}
                per={params.per}
                trigger={this.paginationTrigger}
            />
        );
        const k = params.page*params.per;
        return (
            <div className="table-wrap">
                <DailyCalculator removeItem={this.removeItem} list={list} />
                <Input value={search} updateValue={this.updateSearch} placeholder="Search by name"/>
                {pagination}
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
                        {foodList.length > 0 ? trList.slice(k-20, (k > foodList.length ? foodList.length : k)) : (
                            <tr>
                                <td colSpan="5">
                                    You don't have any food item in the list
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {pagination}
            </div>
        );
    }
    updateSearch(value) {
        this.setState({
            search: value,
            params: defaultParams
        });
    }
    paginationTrigger(page) {
        const params = this.state.params;
        params.page = page;
        this.setState({
            params: params
        });
    }
    addItem(id) {
        const {foodList} = this.props;
        let list = this.state.list.map(item => item);
        const index = this.findById(id, list);
        const foodListIndex = this.findById(id, foodList);
        console.log(id);
        console.log(foodList);
        console.log(foodListIndex);
        console.log(foodList[foodListIndex].id);
        // if (index < 0) {
            list.push(foodList[foodListIndex]);
            this.setState({list: list});
        // }
        // console.log(list[0].id);
    }
    removeItem(id) {
        let {list} = this.state;
        const index = this.findById(id, list);
        list.splice(index, 1);
        this.setState({list: list});
    }
    findById(id, data) {
        return data.findIndex(item => {
            return item.id = id;
        });
    }
}

Table.propTypes = {
    foodlist: React.PropTypes.array
};

