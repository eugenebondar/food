import React from 'react';
import Translate from 'counterpart';
import moment from 'moment';
import Datetime from 'react-datetime';

import InputComponent from '..//Elements/Input';
import Checkbox from '..//Elements/Checkbox';

import TestDetailsStore from '../../Stores/TestDetailsStore';
import BaseComponent from '../BaseComponent';
import DateFormats from '../../Utils/DateFormats';

import './DateTimePicker.less';

export default class TestScheduleEditor extends BaseComponent {
    constructor(props) {
        super(props);
        this.listenTo(TestDetailsStore, this._listenTestDetailsStore);
        const scheduleData = this.props.scheduleData,
            time_from = scheduleData.time_from ? scheduleData.time_from.slice(-2) : 'AM',
            time_to = scheduleData.time_to ? scheduleData.time_to.slice(-2) : 'AM',
            to = scheduleData.time_to ? scheduleData.time_to.substring(0,2) : '01',
            from = scheduleData.time_from ? scheduleData.time_from.substring(0,2) : '01';
        this.state =  {
            errors: null,
            fields: {
                time_to: time_to,
                time_from: time_from
            },
            time: {
                time_to: to,
                time_from: from
            }
        };
        this.setHours = this.setHours.bind(this);
        this.updateHours = this.updateHours.bind(this);
        this.updateStartDate = this.updateStartDate.bind(this);
        this.updateDueDate = this.updateDueDate.bind(this);
        this.updateDate = this.updateDate.bind(this);
        this.onMeridiemChange = this.onMeridiemChange.bind(this);
        this.onDaysChange = this.onDaysChange.bind(this);
        this.getValidationError = this.getValidationError.bind(this);
    }
    render() {
        const {scheduleData, isRequired} = this.props,
            {fields, time} = this.state,
            getValidationError = this.state.errors ? this.getValidationError() : null;
        return (
            <div className="schedule-wrap">
                <div className="form__field">
                    <div className="schedule-date__wrap clearfix">
                        <div className="schedule-date__label">
                            <label className="sl-form__label">{Translate('testScheduleEditor.earliestStartDate')}</label>
                            <label className="sl-form__label">{Translate('testScheduleEditor.dueDate')}</label>
                        </div>
                        <div className="schedule-date__input">
                            <div className={'form__input' + (isRequired ? ' required-input' : '')}>
                                <Datetime
                                    className="dt__wrap dt__schedule"
                                    closeOnSelect={true}
                                    value={this.getDateValue(scheduleData.start_date)}
                                    inputProps={{readOnly: true}}
                                    onChange={this.updateStartDate}
                                />
                            </div>
                            <div className={'form__input' + (isRequired ? ' required-input' : '')}>
                                <Datetime
                                    className="dt__wrap dt__schedule"
                                    closeOnSelect={true}
                                    value={this.getDateValue(scheduleData.due_date)}
                                    inputProps={{readOnly: true}}
                                    onChange={this.updateDueDate}
                                />
                            </div>
                        </div>
                        <div className="schedule-date__notice">
                            {Translate('testScheduleEditor.dateNotice')}
                        </div>
                    </div>
                </div>
                <div className="form__field">
                    <label className="sl-form__label">{Translate('testScheduleEditor.allowedTestingDays')}</label>
                    <div className="sl-form__control-group">
                        <label className="sl-form__checkbox">
                            <Checkbox
                                id="monday"
                                onChange={this.onDaysChange}
                                value={scheduleData.monday}
                            />
                            {Translate('testScheduleEditor.Mon')}
                        </label>
                        <label className="sl-form__checkbox">
                            <Checkbox
                                id="tuesday"
                                onChange={this.onDaysChange}
                                value={scheduleData.tuesday}
                            />
                            {Translate('testScheduleEditor.Tue')}
                        </label>
                        <label className="sl-form__checkbox">
                            <Checkbox
                                id="wednesday"
                                onChange={this.onDaysChange}
                                value={scheduleData.wednesday}
                            />
                            {Translate('testScheduleEditor.Wed')}
                        </label>
                        <label className="sl-form__checkbox">
                            <Checkbox
                                id="thursday"
                                onChange={this.onDaysChange}
                                value={scheduleData.thursday}
                            />
                            {Translate('testScheduleEditor.Thu')}
                        </label>
                        <label className="sl-form__checkbox">
                            <Checkbox
                                id="friday"
                                onChange={this.onDaysChange}
                                value={scheduleData.friday}
                            />
                            {Translate('testScheduleEditor.Fri')}
                        </label>
                        <label className="sl-form__checkbox">
                            <Checkbox
                                id="saturday"
                                onChange={this.onDaysChange}
                                value={scheduleData.saturday}
                            />
                            {Translate('testScheduleEditor.Sat')}
                        </label>
                        <label className="sl-form__checkbox">
                            <Checkbox
                                id="sunday"
                                onChange={this.onDaysChange}
                                value={scheduleData.sunday}
                            />
                            {Translate('testScheduleEditor.Sun')}
                        </label>
                    </div>
                </div>
                <div className="form__field">
                    <label className="sl-form__label">{Translate('testScheduleEditor.allowedTestingHours')}</label>
                    <div className="sl-form__control-group schedule-time__wrap clearfix">
                        <div className="schedule-time____item">
                            <div className="schedule-time__label">
                                <label className="sl-form__label">{Translate('testScheduleEditor.From')}</label>
                            </div>
                            <div className="schedule-time__input">
                                <div className={'form__input' + (isRequired ? ' required-input' : '')}>
                                    <InputComponent
                                        id="time_from"
                                        updateValue={this.updateHours}
                                        value={time.time_from}
                                        validationType="number"
                                        onBlur={this.setHours}
                                    />
                                    <select
                                        onChange={this.onMeridiemChange}
                                        name="time_from"
                                        className="sc-form-ele"
                                        value={fields.time_from}
                                    >
                                        <option value="AM">{Translate('testScheduleEditor.AM')}</option>
                                        <option value="PM">{Translate('testScheduleEditor.PM')}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="schedule-time____item">
                            <div className="schedule-time__label">
                                <label className="sl-form__label">{Translate('testScheduleEditor.To')}</label>
                            </div>
                            <div className="schedule-time__input">
                                <div className={'form__input' + (isRequired ? ' required-input' : '')}>
                                    <InputComponent
                                        id="time_to"
                                        updateValue={this.updateHours}
                                        value={time.time_to}
                                        validationType="number"
                                        onBlur={this.setHours}
                                    />
                                    <select
                                        onChange={this.onMeridiemChange}
                                        name="time_to"
                                        className="sc-form-ele"
                                        value={fields.time_to}
                                    >
                                        <option value="AM">{Translate('testScheduleEditor.AM')}</option>
                                        <option value="PM">{Translate('testScheduleEditor.PM')}</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div className="schedule-time__notice">
                            {Translate('testScheduleEditor.timeNotice')}
                        </div>
                    </div>
                </div>
                {getValidationError}
            </div>
        );
    }
    getDateValue(date) {
        return (date && date !== '') ? (
            moment(date, DateFormats.sourceShortDate).format(DateFormats.shortDate)
        ) : '';
    }
    setHours(value, key) {
        let {scheduleData, updateSchedule} = this.props,
            {fields, time} = this.state;
        let i = 2 - value.length,
            newVal = '';
        if (i > 0) {
            for (let j = 0; j < i; j++) {
                newVal += '0';
            }
        }
        newVal += value;
        time[key] = newVal;
        scheduleData.time_from = scheduleData.time_from ? scheduleData.time_from : '01 AM';
        scheduleData.time_to = scheduleData.time_to ? scheduleData.time_to : '01 AM';
        scheduleData[key] = newVal.substring(0, 2) + ':00' + ' ' + fields[key];
        updateSchedule(scheduleData);
        this.setState({time, time});
    }
    updateHours(key, value) {
        let {time} = this.state;
        time[key] = value > 12 ? 12 : value.substring(0,2);
        this.setState({time: time});
    }
    updateStartDate(value) {
        this.updateDate('start_date', value, false);
    }
    updateDueDate(value) {
        this.updateDate('due_date', value, false);
    }
    updateDate(id, value) {
        let {scheduleData, updateSchedule} = this.props;
        scheduleData.time_from = scheduleData.time_from ? scheduleData.time_from : '01 AM';
        scheduleData.time_to = scheduleData.time_to ? scheduleData.time_to : '01 AM';
        scheduleData[id] = moment(value, DateFormats.shortDate);
        updateSchedule(scheduleData);
    }
    onMeridiemChange(e) {
        let {scheduleData, updateSchedule} = this.props,
            fields = this.state.fields,
            target = e.target,
            key = target.name;
        scheduleData[key] = !!(scheduleData[key]) ?
            (scheduleData[key].substring(0,5) + ' ' + target.value) :
            ('00:00 ' + target.value);
        fields[key] = target.value;
        this.setState({fields: fields});
        scheduleData.time_from = scheduleData.time_from ? scheduleData.time_from : '01 AM';
        scheduleData.time_to = scheduleData.time_to ? scheduleData.time_to : '01 AM';
        updateSchedule(scheduleData);
    }
    onDaysChange(id, value) {
        let {scheduleData, updateSchedule} = this.props;
        scheduleData[id] = value;
        scheduleData.time_from = scheduleData.time_from ? scheduleData.time_from : '01 AM';
        scheduleData.time_to = scheduleData.time_to ? scheduleData.time_to : '01 AM';
        updateSchedule(scheduleData);
    }
    getValidationError() {
        return this.state.errors.map(function(item, key) {
            return (
                <div key={key} className="validation__error-message sc-error">
                    {item}
                </div>
            );
        });
    }
    _listenTestDetailsStore(event, data) {
        switch (event) {
            case 'testRunSchedulerUpdateError':
                if (data) {
                    this.setState({errors: data});
                }
                break;
        }
    }
}
