import { shallow } from 'enzyme';
import * as React from 'react';
import { WithdrawInfoComponent } from './WithdrawInfoComponent';

const defaultProps = {
    accountNumber: 0,
    address: '',
    amount: 0,
    bankName: '',
    bankAddress: '',
    bankCountry: '',
    bankSwiftCode: 0,
    country: '',
    currency: '',
    date: '',
    email: '',
    handleRejectWithdraw: jest.fn(),
    handleAcceptWithdraw: jest.fn(),
    intermediaryBankName: '',
    intermediaryBankAddress: '',
    intermediaryBankCountry: '',
    intermediaryBankSwiftCode: 0,
    name: '',
    rid: 0,
    state: '',
    uid: '',
};

describe('WithdrawInfoComponent test', () => {
    it('should render', () => {
        const wrapper = shallow(<WithdrawInfoComponent {...defaultProps} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
