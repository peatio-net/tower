import {shallow} from 'enzyme';
import * as React from 'react';
import {UserSummary, UserSummaryProps} from './index';

const defaults: UserSummaryProps = {
    user: {phones: [], profile: {country: 'US', metadata: { nationality: 'American'}}},
};

describe('UserSummary component', () => {
    const setup = (props: Partial<UserSummaryProps> = {}) =>
        shallow(<UserSummary {...{...defaults, ...props}}/>);

    it('should render', () => {
        const wrapper = setup();
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
