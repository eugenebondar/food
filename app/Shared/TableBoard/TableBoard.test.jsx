import React from 'react';
import {mount} from 'enzyme';
import TableBoard from './index';

describe('TableBoard', function() {
    let props, component, data, columnConfig, actions;
    beforeEach(()=> {
        props = {
            className: 'className',
            tableName: 'someName',
            userSettings: {},
            emptyTableTitle: '-',
            expandId: '1',
            data: [],
            title: 'title',
            pagination: false,
            expansion: false,
            selectable: false,
            isAllSelected: false,
            isService: false,
            columnConfig: [],
            actions: [],
            actionsTrigger: ()=> {},
            selectTrigger: ()=> {},
            updateSortableStatus: ()=> {},
            trigger: ()=> {},
            getExpansionData: ()=> {}
        };
        data = [{'customer_name': 'Jerde-Williamson'}];
        columnConfig = [{'source': 'customer_name','name': 'tableCell.customer','width': '10','sortable': false,'type': 'text'}];
        actions = [{'value': 'editTestSettings', 'title': 'Edit Test Settings', 'icon': 'sc-icon-pencil'}];
    });
    it('component will be mounted', () => {
        component = mount(<TableBoard
            data={data}
            columnConfig={columnConfig}
            actions={actions}
            actionsTrigger={props.actionsTrigger}
            getExpansionData={props.getExpansionData}
            updateSortableStatus={props.updateSortableStatus}
        />);
        expect(component).toBeTruthy();
    });
    it('component will be mounted with defined title', () => {
        const title = 'title';
        component = mount(<TableBoard
            title={title}
            data={data}
            columnConfig={columnConfig}
            actions={actions}
            actionsTrigger={props.actionsTrigger}
            getExpansionData={props.getExpansionData}
            updateSortableStatus={props.updateSortableStatus}
        />);
        expect(component).toBeTruthy();
        component.setState({ profileColumnsSettings: [] });
        expect(component.find('.test__table__component').length).toBe(1);
    });
    it('component listeners work', () => {
        let event = 'userSettings',
            eventData = {
                someName: ['customer_name']
            };
        component = mount(<TableBoard
            data={data}
            tableName='someName'
            columnConfig={columnConfig}
            actions={actions}
            actionsTrigger={props.actionsTrigger}
            getExpansionData={props.getExpansionData}
            updateSortableStatus={props.updateSortableStatus}
        />);
        component.setState({ profileColumnsSettings: null });
        let inst = component.instance();
        inst._listenSessionStore(event);
        expect(inst.state.profileColumnsSettings).not.toBeNull();

        component.setState({ profileColumnsSettings: null });
        inst._listenSessionStore(event, eventData);
        expect(inst.state.profileColumnsSettings).not.toBeNull();
        expect(inst.state.profileColumnsSettings.length).toEqual(1);

        // check second event
        event = 'userSettingsReloaded';
        component.setState({ profileColumnsSettings: null });
        inst._listenSessionStore(event);
        expect(inst.state.profileColumnsSettings).not.toBeNull();
    });
});
