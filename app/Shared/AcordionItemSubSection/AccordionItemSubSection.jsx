import React from 'react';
import './AccordionItemSubSection.less';

export default function AccordionItemSubSection({children, isHidden}) {
    return (
        <div className="react-sanfona-subheader-section" style={{display: isHidden ? 'block' : 'none'}}>
            {children}
        </div>
    );
}

AccordionItemSubSection.propTypes = {
    isHidden: React.PropTypes.bool,
    children: React.PropTypes.node
};
