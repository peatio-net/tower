import { shallow } from 'enzyme';
import * as React from 'react';
import { EditLabel } from './EditLabelModal';

const defaultProps = {
    modalClose: jest.fn(),
    open: false,
    editLabel: jest.fn(),
    name: '',
    value: '',
    scope: '',
    handleChangeLabelName: jest.fn(),
    handleChangeLabelValue: jest.fn(),
    handleChangeLabelScope: jest.fn(),
};

describe('EditLabel test', () => {
    it('should render', () => {
        const wrapper = shallow(<EditLabel {...defaultProps} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
