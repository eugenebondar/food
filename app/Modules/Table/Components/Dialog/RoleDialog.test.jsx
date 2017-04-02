import React from 'react';
import { shallow } from 'enzyme';
import RoleDialog from './RoleDialog.jsx';

describe('<RoleDialog />', () => {
  it('should render RoleDialog component', () => {
    const rolesConfig     = {};
    const permissionsList = {};
    const closePopup      = function() {};
    const validation      = {};

    // act
    const component = shallow(
      <RoleDialog rolesConfig={rolesConfig} permissionsList={permissionsList} closePopup={closePopup} validation={validation}/>
    );

    // assert
    expect(component).toBeTruthy();
  });
});
