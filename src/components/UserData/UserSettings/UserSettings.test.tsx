import {shallow} from 'enzyme';
import * as React from 'react';
import {UserDataInterface} from '../../../modules/auth';
import {UserSettings, UserSettingsProps} from './index';

const defaults: UserSettingsProps = {
    user: {phones: [], profile: {country: 'US'}},
    handleChangeUserState: jest.fn(),
    handleChangeRole: jest.fn(),
    handleChangeUserOTP: jest.fn(),
    currentUser: {} as UserDataInterface,
};

describe('UserSummary component', () => {
    const setup = (props: Partial<UserSettingsProps> = {}) =>
        shallow(<UserSettings {...{...defaults, ...props}}/>);

    it('should render', () => {
        const wrapper = setup();
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
