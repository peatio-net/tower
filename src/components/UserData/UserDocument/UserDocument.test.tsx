import {shallow} from 'enzyme';
import * as React from 'react';
import { TableHeaderItemInterface } from '../UserData';
import { UserDocument, UserDocumentProps } from './index';

const defaults: UserDocumentProps = {
    user: {},
    documentsRows: {} as TableHeaderItemInterface[],
    classes: '',
    handleOpenDocumentCarousel: jest.fn(),
};

describe('UserDocument component', () => {
    const setup = (props: Partial<UserDocumentProps> = {}) =>
        shallow(<UserDocument {...{...defaults, ...props}}/>);

    it('should render', () => {
        const wrapper = setup();
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
