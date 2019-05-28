import { shallow } from 'enzyme';
import * as React from 'react';
import { Activities } from './';

describe('Activities test', () => {
    it('should render', () => {
        const wrapper = shallow(<Activities />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
