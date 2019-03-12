import { shallow } from 'enzyme';
import * as React from 'react';
import { Dashboard } from './';

describe('Dashboard test', () => {
    it('should render', () => {
        const wrapper = shallow(<Dashboard />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
