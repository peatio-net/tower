import { shallow } from 'enzyme';
import * as React from 'react';
import { AlertMessage } from './AlertMessage';

describe('AlertMessage test', () => {
    it('should render', () => {
        const wrapper = shallow(<AlertMessage message="message" type="success"/>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
