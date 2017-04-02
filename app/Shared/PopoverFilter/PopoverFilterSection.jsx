import React from 'react';
import { Collapse, Multiselect, Checkbox} from 'apoc-react';

export default  function PopoverFilterSection(props) {
    /**
     * @type {{label:string, value:string, checked:boolean}[]}
     */
    const filters = React.Children.map(props.children, child => child.props);

    return (
        <Collapse title={props.label} isPanelButton={true} isCollapsed={false}>
            <Multiselect onChange={props.onChange}>
                {filters.map(filter => (
                    <Checkbox label={filter.label}
                              name={filter.value}
                              key={filter.value}
                              checked={filter.checked}
                    />
                ))}
            </Multiselect>
        </Collapse>
    );
}

PopoverFilterSection.propTypes = {
    label: React.PropTypes.string,
    name: React.PropTypes.string,
    children: React.PropTypes.node,
    onChange: React.PropTypes.func
};
