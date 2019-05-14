import { shallow } from 'enzyme';
import * as React from 'react';
import { WithdrawList } from './';

describe('WithdrawListTable test', () => {
    it('should render', () => {
        const wrapper = shallow(<WithdrawList />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
