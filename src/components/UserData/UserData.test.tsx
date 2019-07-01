import {mount} from 'enzyme';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import {
    Router,
} from 'react-router-dom';
import { CurrentUserInterface } from '../../modules';
import { UserActivities } from './UserActivities';
import {
    TableHeaderItemInterface,
    UserData,
    UserDataProps,
} from './UserData';
import { UserDataHeader } from './UserDataHeader';
import { UserDocument } from './UserDocument';
import { UserKYC } from './UserKYC';
import { UserLabel } from './UserLabel';
import { UserSettings } from './UserSettings';
import { UserSummary } from './UserSummary';

const defaults: UserDataProps = {
    addNewLabel: jest.fn(),
    editLabel: jest.fn(),
    changeLabelName: jest.fn(),
    changeLabelScope: jest.fn(),
    changeLabelValue: jest.fn(),
    closeModal: jest.fn(),
    deleteUserLabel: jest.fn(),
    handleChangeUserState: jest.fn(),
    handleChangeRole: jest.fn(),
    handleChangeUserOTP: jest.fn(),
    newLabelName: '',
    newLabelScope: '',
    newLabelValue: '',
    isAddLabelModalOpened: false,
    isEditLabelModalOpened: false,
    openAddLabelModal: jest.fn(),
    openEditLabelModal: jest.fn(),
    user: {labels: [], phones: [], profile: {country: 'US',  metadata: { nationality: 'American'}}},
    page: 0,
    rowsPerPage: 0,
    total: 0,
    handleChangePage: jest.fn(),
    documentsRows: [] as TableHeaderItemInterface[],
    handleEditLabel: jest.fn(),
    activityRows: [] as TableHeaderItemInterface[],
    userActivity: { labels: [], phones: [], profile: { country: 'US' }},
    handleChangeRowsPerPage: jest.fn(),
    goBack: jest.fn(),
    pathname: '',
    currentUser: {} as CurrentUserInterface,
    alertPush: jest.fn(),
    handleOpenDocumentCarousel: jest.fn(),
    handleCloseDocumentCarousel: jest.fn(),
    openDocumentCarousel: false,
    documentIndex: 0,
    handleNavigateDocumentCarousel: jest.fn(),
};

const history = createBrowserHistory();


describe('UserData component', () => {
    const setup = (props: Partial<UserDataProps> = {}) => {
        return mount(<Router history={history}><UserData {...{ ...defaults, ...props }} /></Router>);
    };

    it('should render', () => {
        const wrapper = setup();
        expect(wrapper).toBeDefined();
    });

    it('should render', () => {
        const wrapper = setup();
        expect(wrapper).toBeDefined();
    });

    it('should render UserDataHeader', () => {
        const wrapper = setup();
        expect(wrapper.find(UserDataHeader)).toHaveLength(1);
    });

    it('should render UserSummary', () => {
        const wrapper = setup();
        expect(wrapper.find(UserSummary)).toHaveLength(1);
    });

    it('should render UserKYC', () => {
        const wrapper = setup();
        expect(wrapper.find(UserKYC)).toHaveLength(1);
    });

    it('should render UserSettings', () => {
        const wrapper = setup();
        expect(wrapper.find(UserSettings)).toHaveLength(1);
    });

    it('should render UserLabel', () => {
        const wrapper = setup();
        expect(wrapper.find(UserLabel)).toHaveLength(1);
    });

    it('should render UserDocument', () => {
        const wrapper = setup();
        expect(wrapper.find(UserDocument)).toHaveLength(1);
    });

    it('should render UserActivity', () => {
        const wrapper = setup();
        expect(wrapper.find(UserActivities)).toHaveLength(1);
    });
});
