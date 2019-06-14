import { shallow } from 'enzyme';
import * as React from 'react';
import { Layout } from './';

const defaultProps = {
    children: <div>Children</div>,
    logout: jest.fn(),
    handleDrawerOpen: jest.fn(),
    handleDrawerClose: jest.fn(),
    loggedIn: false,
    open: false,
    location: {
        pathname: '',
    },
    isSuperAdmin: false,
};

describe('Layout test', () => {
    it('should render', () => {
        const wrapper = shallow(<Layout {...defaultProps} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
