import { shallow } from 'enzyme';
import * as React from 'react';
import { SearchBarContainer, SearchBarWrapperProps } from './';

const defaultProps: SearchBarWrapperProps = {
    selectedItems: [],
    handleSearchRequest: jest.fn(),
    handleClearSearchRequest: jest.fn(),
};

describe('SearchBarContainer test', () => {
    it('should render', () => {
        const wrapper = shallow(<SearchBarContainer {...defaultProps} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
