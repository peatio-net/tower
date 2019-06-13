import { shallow } from 'enzyme';
import * as React from 'react';
import { AdminActivities } from './';

describe('AdminActivities test', () => {
    it('should render', () => {
        const wrapper = shallow(<AdminActivities />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
