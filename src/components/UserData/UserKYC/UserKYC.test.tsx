import { shallow } from 'enzyme';
import * as React from 'react';
import { UserKYC, UserKYCProps } from './index';

const defaults: UserKYCProps = {
    user: { phones: [], profile: { country: 'US' } },
    editLabel: jest.fn(),
    alertPush: jest.fn(),
};

describe('UserKYC component', () => {
    const setup = (props: Partial<UserKYCProps> = {}) =>
        shallow(<UserKYC {...{ ...defaults, ...props }} />);

    it('should render', () => {
        const wrapper = setup();
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
