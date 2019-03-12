import { shallow } from 'enzyme';
import * as React from 'react';
import { Login } from './';

describe('Login test', () => {
    it('should render', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
