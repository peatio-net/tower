import { shallow } from 'enzyme';
import * as React from 'react';
import { Alerts } from './';

describe('Alerts test', () => {
    it('should render', () => {
        const wrapper = shallow(<Alerts />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
