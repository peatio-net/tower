import {shallow} from 'enzyme';
import * as React from 'react';
import { UserActivities, UserActivityProps } from '.';
import { TableHeaderItemInterface } from '../UserData';

const defaults: UserActivityProps = {
    rows: {} as TableHeaderItemInterface[],
    userActivity: {},
    classes: '',
    page: 0,
    rowsPerPage: 0,
    total: 0,
    handleChangePage: jest.fn(),
    handleChangeRowsPerPage: jest.fn(),
};

describe('UserActivities component', () => {

    it('should render', () => {
        const wrapper = shallow(<UserActivities {...defaults} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
