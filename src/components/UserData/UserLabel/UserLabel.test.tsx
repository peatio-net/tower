import {shallow} from 'enzyme';
import * as React from 'react';
import {UserLabel, UserLabelProps} from './index';

const defaults: UserLabelProps = {
    user: {labels: []},
    newLabelName: '',
    newLabelValue: '',
    newLabelScope: '',
    addNewLabel: jest.fn(),
    editLabel: jest.fn(),
    deleteUserLabel: jest.fn(),
    changeLabelName: jest.fn(),
    changeLabelScope: jest.fn(),
    changeLabelValue: jest.fn(),
    isAddLabelModalOpened: false,
    isEditLabelModalOpened: false,
    openAddLabelModal: jest.fn(),
    openEditLabelModal: jest.fn(),
    closeModal: jest.fn(),
    classes: '',
};

describe('UserLabel component', () => {
    const setup = (props: Partial<UserLabelProps> = {}) =>
        shallow(<UserLabel {...{...defaults, ...props}}/>);

    it('should render', () => {
        const wrapper = setup();
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
