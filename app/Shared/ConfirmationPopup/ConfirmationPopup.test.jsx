import React from 'react';
import translate from 'counterpart';
import {mount} from 'enzyme';
import ConfirmationPopup from './index';

describe('ConfirmationPopup', function() {
    let props, component;
    beforeEach(()=> {
        props = {
            title: 'title',
            isNoAction: false,
            returnData: {test: 'test'}
        };
    });
    it('will be mounted', () => {
        component = mount(<ConfirmationPopup title={props.title}/>);
        expect(component).toBeTruthy();
    });
    it('will be on non action view', () => {
        props.isNoAction = true;
        component = mount(<ConfirmationPopup title={props.title} isNoAction={props.isNoAction}/>);
        expect(component.find('button').length).toEqual(1);
        expect(component.find('button span')).toHaveText(translate('general.ok'));
    });
    it('will be on yes-no action view', () => {
        component = mount(<ConfirmationPopup title={props.title} isNoAction={props.isNoAction}/>);
        expect(component.find('button').length).toEqual(2);
        expect(component.find('.cancel-btn span')).toHaveText(translate('general.no'));
        expect(component.find('.fd__button span')).toHaveText(translate('general.yes'));
    });
    it('will be closed', () => {
        const cancel = jasmine.createSpy('cancel');
        component = mount(<ConfirmationPopup title={props.title} isNoAction={props.isNoAction} cancel={cancel}/>);
        component.find('.cancel-btn').simulate('click');
        expect(cancel).toHaveBeenCalledTimes(1);
    });
    it('will be confirmed', () => {
        const confirm = jasmine.createSpy('confirm');
        component = mount(<ConfirmationPopup title={props.title} isNoAction={props.isNoAction} returnData={props.returnData} confirm={confirm}/>);
        component.find('.sc-btn-primary').simulate('click');
        expect(confirm).toHaveBeenCalledTimes(1);
        expect(confirm).toHaveBeenCalledWith(props.returnData);
    });
});
