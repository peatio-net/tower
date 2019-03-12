import { shallow } from 'enzyme';
import * as React from 'react';
import { UsersTableContainer } from './';

describe('UsersTableContainer test', () => {
    it('should render', () => {
        const wrapper = shallow(<UsersTableContainer />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
