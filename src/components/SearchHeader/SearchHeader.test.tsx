import { shallow } from 'enzyme';
import * as React from 'react';
import { SearchHeader } from './SearchHeader';

const defaultProps = {
    data: [],
    searchPoint: {
        label: '',
        value: '',
    },
    searchValue: '',
    handleChangeSearchValue: jest.fn(),
    handleChangeSearchPoint: jest.fn(),
    handleSearch: jest.fn(),
};

describe('SearchHeader test', () => {
    it('should render', () => {
        const wrapper = shallow(<SearchHeader {...defaultProps} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
