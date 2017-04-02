import React from 'react';
import moment from 'moment';
import {mount} from 'enzyme';
import DateTimeFormat from './DateTimeFormat';

describe('DateTimeFormat', function() {
    it('will be mounted and contain Date', () => {
        const date = '2016-10-06T05:53:56.767-05:00', className = 'test-class', DateFormat =  'YYYY/MM/DD hh:mm A';
        const component = mount(<DateTimeFormat date={date} className={className}/>);
        expect(component).toBeTruthy();
        expect(component.find('.test-class span')).toHaveText(moment(date).format(DateFormat));
    });
    it('contain empty value', () => {
        const date = null, className = 'test-class', emptyValue = '-';
        const component = mount(<DateTimeFormat date={date} className={className} emptyValue={emptyValue}/>);
        expect(component).toBeTruthy();
        expect(component.find('.test-class span')).toHaveText(emptyValue);
    });
});
