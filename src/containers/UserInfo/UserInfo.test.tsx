import { shallow } from 'enzyme';
import * as React from 'react';
import { UserInfo } from './';

const defaultProps = {
    match: {
        params: {
            uid: '',
        },
    },
};

describe('UserInfo test', () => {
    it('should render', () => {
        const wrapper = shallow(<UserInfo {...defaultProps} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
