import React from 'react';
import Translate from 'counterpart';
import {ModalDialog} from 'apoc-react';

import Input from '../Elements/Input';

export default class ConfigurationDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedColumns: this.props.selectedColumns || [],
            extraColumns: this.props.extraColumns || []
        };

        this.save = this.save.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }
    render() {
        const tableConfig = this.state.selectedColumns.length ?
                this.props.selectedColumns.map(function(item, key) {
                    return (
                        <label key={key} className="column-item">
                            <Input numberOfList={key} changeHandler={this.handleClick} inputData={item}/>
                            {Translate(item.name)}
                        </label>
                    );
                }.bind(this)) : null,

            extraConfig = this.state.extraColumns.length && this.props.isService ?
                this.props.extraColumns.map(function(item, key) {
                    return (
                        <label key={key} className="column-item">
                            <Input numberOfList={key} changeHandler={this.handleClick} inputData={item} extraColumn={true}/>
                            {Translate(item.name)}
                        </label>
                    );
                }.bind(this)) : null,
            _dialogFooter = (
                <div className="modal-btn-wrap">
                    <button onClick={this.closeDialog} className="cancel-btn sc-btn">
                        <span>{Translate('general.cancel')}</span>
                    </button>
                    <button onClick={this.save} className="sc-btn fd__button sc-btn-primary">
                        <span>{Translate('general.save')}</span>
                    </button>
                </div>
            );
        return (
            <ModalDialog
                isOpen={true}
                header={this.props.title}
                footer={_dialogFooter}
                onOutsideModalClick={this.closeDialog}
            >
                <div className="column-items">
                    {tableConfig}
                </div>

                {extraConfig ?
                    (<div>
                        <br/>
                        <div className="modal-dialog-header fd__title">{this.props.extraLabel}</div>
                        <br/>
                        <div className="column-items">
                            {extraConfig}
                        </div>
                    </div>) : null}
            </ModalDialog>
        );
    }
    closeDialog() {
        const {close, name} = this.props;
        close(name);
    }
    save() {
        this.props.save(this.state.selectedColumns, this.state.extraColumns);
    }
    handleClick(index, selected, isExtra) {
        const selectedColumns = this.state.selectedColumns,
            extraColumns = this.state.extraColumns;
        isExtra ? extraColumns[index].selected = selected : selectedColumns[index].selected = selected;
        this.setState({
            selectedColumns: selectedColumns,
            extraColumns: extraColumns
        });
    }
}

ConfigurationDialog.propTypes = {
    tableName: React.PropTypes.string,
    extraLabel: React.PropTypes.string,
    name: React.PropTypes.string,
    selectedColumns: React.PropTypes.array,
    extraColumns: React.PropTypes.array,
    save: React.PropTypes.func,
    close: React.PropTypes.func,
    title: React.PropTypes.string,
    isService: React.PropTypes.bool
};
