import { shallow } from 'enzyme';
import * as React from 'react';
import { UserDirectory } from './';

describe('Dashboard test', () => {
    it('should render', () => {
        const wrapper = shallow(<UserDirectory />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
