import { shallow } from 'enzyme';
import * as React from 'react';
import { OrderBooks } from '.';

describe('Orderbooks test', () => {
    it('should render', () => {
        const wrapper = shallow(<OrderBooks />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
