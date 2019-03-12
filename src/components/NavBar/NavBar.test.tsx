import { shallow } from 'enzyme';
import * as React from 'react';
import { Navbar } from './';

const defaultProps = {
    logout: jest.fn(),
};

describe('Navbar test', () => {
    it('should render', () => {
        const wrapper = shallow(<Navbar {...defaultProps} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
