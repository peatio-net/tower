import {shallow} from 'enzyme';
import * as React from 'react';
import { WithdrawListInfoTable } from './index';

const defaults = {
    dataLength: 0,
    rows: [],
    data: [],
    page: 0,
    rowsPerPage: 1,
    handleChangePage: jest.fn(),
    handleChangeRowsPerPage: jest.fn(),
};

describe('WithdrawListInfoTable component', () => {
    it('should render', () => {
        const wrapper = shallow(<WithdrawListInfoTable {...defaults} />);
        expect(wrapper).toBeDefined();
        expect(wrapper).toMatchSnapshot();
    });
});
