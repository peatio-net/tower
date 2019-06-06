import { shallow } from 'enzyme';
import * as React from 'react';
import { LoginBox } from './LoginBox';

const defaultProps = {
    email: '',
    password: '',
    handleChangeEmail: jest.fn(),
    handleChangePassword: jest.fn(),
    handleOTPCode: jest.fn(),
    handleSignIn: jest.fn(),
};

describe('LoginBox test', () => {
    it('should render', () => {
        const wrapper = shallow(<LoginBox {...defaultProps} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
