import { shallow } from 'enzyme';
import * as React from 'react';
import { Orders } from './';

describe('Activities test', () => {
    it('should render', () => {
        const wrapper = shallow(<Orders />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
