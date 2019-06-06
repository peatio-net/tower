import { shallow } from 'enzyme';
import * as React from 'react';
import { UsersTable } from './UsersTable';

const defaultProps = {
    dataLength: 0,
    rows: [],
    data: [],
    page: 1,
    rowsPerPage: 1,
    handleChangePage: jest.fn(),
    handleChangeRowsPerPage: jest.fn(),
};

describe('InfoTable test', () => {
    it('should render', () => {
        const wrapper = shallow(<UsersTable {...defaultProps} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
