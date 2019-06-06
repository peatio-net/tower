import { shallow } from 'enzyme';
import * as React from 'react';
import { WithdrawInfoTableComponent } from './WithdrawInfoTableComponent';

const defaultProps = {
    dataLength: 0,
    rows: [],
    data: [],
    page: 0,
    rowsPerPage: 0,
    handleChangePage: jest.fn(),
    handleChangeRowsPerPage: jest.fn(),
    tableTitle: '',
};

describe('WithdrawInfoTableComponent test', () => {
    it('should render', () => {
        const wrapper = shallow(<WithdrawInfoTableComponent {...defaultProps} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
