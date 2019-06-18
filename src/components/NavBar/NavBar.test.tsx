import { shallow } from 'enzyme';
import * as React from 'react';
import { Navbar } from './NavBar';

const defaultProps = {
    logout: jest.fn(),
    open: false,
    handleDrawerOpen: jest.fn(),
    handleDrawerClose: jest.fn(),
    loggedIn: false,
    pathname: '',
    isSuperAdmin: false,
};

describe('Navbar test', () => {
    it('should render', () => {
        const wrapper = shallow(<Navbar {...defaultProps} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
