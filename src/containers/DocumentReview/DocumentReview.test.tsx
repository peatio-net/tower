import {shallow} from 'enzyme';
import * as React from 'react';
import {DocumentReview} from './';

describe('DocumentReview test', () => {
    it('should render', () => {
        const wrapper = shallow(<DocumentReview/>);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
