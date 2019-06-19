import { shallow } from 'enzyme';
import * as React from 'react';
import { SearchBar } from './SearchBar';

const defaultProps = {
    index: 0,
    selectedValues: [],
    activeItem: {
        value: '',
        label: '',
        checked: false,
    },
    handleChangeSelect: jest.fn(),
    searchValue: '',
    handleChangeSearchValue: jest.fn(),
    handleEnterPress: jest.fn(),
};

describe('SearchBar test', () => {
    it('should render', () => {
        const wrapper = shallow(<SearchBar {...defaultProps} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
