import { shallow } from 'enzyme';
import * as React from 'react';
import { WithdrawInfo } from './';

const defaultProps = {
    match: {
        params: {
            id: '1234',
        },
    },
    withdrawUserHistory: [],
    getWithdrawsInfo: jest.fn(),
    getWithdrawUserHistory: jest.fn(),
};

describe('WithdrawInfo test', () => {
    it('should render', () => {
        const wrapper = shallow(<WithdrawInfo {...defaultProps} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
