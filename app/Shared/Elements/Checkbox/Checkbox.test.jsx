import React from 'react';
import {mount} from 'enzyme';
import Checkbox from './index';

describe('Checkbox', function() {
    let props, component, clicked;
    beforeEach(()=> {
        clicked = false;
        props = {
            id: '1',
            label: 'label',
            value: true,
            data: 'data',
            onChange: ()=>{
            },
            onClick: ()=> {
                clicked = true;
            }
        };
    });
    it('will be mounted with label', () => {
        component = mount(<Checkbox label={props.label} value={props.value}/>);
        expect(component).toBeTruthy();
        expect(component.find('.checkbox-label-wrap input')).toHaveProp('checked', true);
        expect(component.find('.checkbox-label-wrap span')).toHaveText(props.label);
    });
    it('will be mounted without label', () => {
        props.label = null;
        component = mount(<Checkbox label={props.label} value={props.value}/>);
        expect(component.find('.checkbox-label-wrap').length).toEqual(0);
    });
    it('click works', () => {
        component = mount(<Checkbox label={props.label} value={props.value} onClick={props.onClick}/>);
        expect(clicked).toBeFalsy();
        component.find('input').simulate('click');
        expect(clicked).toBeTruthy();
    });
    it('click does not be called', () => {
        props.onClick = undefined;
        component = mount(<Checkbox label={props.label} value={props.value} onClick={props.onClick}/>);
        component.find('input').simulate('click');
        expect(clicked).toBeFalsy();
    });
    it('changes are being handled', () => {
        const handleWorks = jasmine.createSpy('handleChange');
        const eventMock = {
            target: {
                checked: false
            }
        };
        component = mount(<Checkbox label={props.label} id={props.id} data={props.data} value={props.value} onChange={handleWorks}/>);
        component.find('input').simulate('change', eventMock);
        expect(handleWorks).toHaveBeenCalledTimes(1);
        expect(handleWorks).toHaveBeenCalledWith(props.id, false, 'checkbox', props.data);
    });
    it('label click changes are being handled', () => {
        const onClickLabel = jasmine.createSpy('onClickLabel');
        component = mount(<Checkbox label={props.label} id={props.id} data={props.data} value={props.value} onChange={onClickLabel}/>);
        component.find('.checkbox-label-wrap span').simulate('click');
        expect(onClickLabel).toHaveBeenCalledTimes(1);
        expect(onClickLabel).toHaveBeenCalledWith(props.id, false, 'checkbox', props.data);
    });
});
