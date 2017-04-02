import React from 'react';
import {mount} from 'enzyme';
import Table from './Table';

describe('TableBoard', function() {
    let props, component, state;
    beforeEach(()=> {
        props = {
            data: [],
            profileColumnsSettings: [],
            columnConfig: [],
            actions: [],
            actionsTrigger: ()=>{},
            trigger: ()=>{},
            checkboxFilter: {},
            selectFilter: {},
            searchFilter: {},
            expansion: false,
            isService: false,
            selectable: true,
            isAllSelected: false,
            selectTrigger: ()=>{},
            getExpansionData: ()=>{},
            updateSortableStatus: ()=>{},
            emptyTableTitle: '-',
            expandId: ''
        };
        state= {
            profileColumnsSettings: []
        };
        props.data = [{'customer_name': 'Jerde-Williamson', 'id': '1'}];
        props.columnConfig = [
            {'source': 'customer_name','name': 'tableCell.customer','width': '10','sortable': false,'type': 'text'},
            {'source': 'id','name': 'tableCell.id','width': '10','sortable': false,'type': 'text'}
        ];
        props.actions = [{'value': 'editTestSettings', 'title': 'Edit Test Settings', 'icon': 'sc-icon-pencil'}];
    });
    const mountComponent = function() {
        return mount(<Table
            data={props.data}
            isService={props.isService}
            profileColumnsSettings={state.profileColumnsSettings}
            columnConfig={props.columnConfig}
            actionsTrigger={props.actionsTrigger}
            selectTrigger={props.selectTrigger}
            actions={props.actions}
            expansion={props.expansion}
            getExpansionData={props.getExpansionData}
            expandId={props.expandId}
            trigger={props.trigger}
            selectable={props.selectable}
            isAllSelected={props.isAllSelected}
            emptyTableTitle={props.emptyTableTitle}
            updateSortableStatus={props.updateSortableStatus}
        />);
    };
    it('component will be mounted', () => {
        component = mountComponent();
        expect(component).toBeTruthy();
        expect(component.find('.test__table__component').length).toBe(1);
        expect(component.find('.test-actions-wrap').length).toBe(1);
    });
    it('component will be mounted without actions column', () => {
        props.actions = [];
        component = mountComponent();
        expect(component.find('.test-actions-wrap').length).toBe(0);
    });
    it('component will be mounted without records in table', () => {
        props.data = [];
        component = mountComponent();
        expect(component.find('.empty-table').length).toBe(1);
    });
    it('component will be mounted with extended row', () => {
        props.expansion = true;
        props.expandId = '1';
        component = mountComponent();
        expect(component.find('.expand-tr').length).toBe(1);
    });
    it('component updated data after receving new props', () => {
        props.expandId = '0';
        component = mountComponent();
        props.expandId = '1';
        let inst = component.instance();
        spyOn(inst, 'getNewColumnConfig');
        component.setProps({expandId: props.expandId});
        expect(inst.getNewColumnConfig).toHaveBeenCalledTimes(1);
        expect(inst.getNewColumnConfig).toHaveBeenCalledWith(inst.props);
    });
    it('component set user profile columns', () => {
        component = mountComponent();
        let inst = component.instance();
        expect(inst.state.columnConfig.length).toBe(2);
        component.setProps({profileColumnsSettings: ['customer_name']});
        spyOn(inst, 'getNewColumnConfig');
        expect(inst.state.columnConfig.length).toBe(1);
        expect(inst.state.columnConfig[0]).toBe(props.columnConfig[0]);
    });
    it('changeExpandId function works correct', () => {
        let expandId, inst;
        props.expandId = '1';
        component = mountComponent();
        inst = component.instance();

        expandId = '1';
        inst.changeExpandId(expandId);
        expect(inst.state.expandId).toBe('');

        expandId = '2';
        inst.changeExpandId(expandId);
        expect(inst.state.expandId).toBe('2');
    });
});
