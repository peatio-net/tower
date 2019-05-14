import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Middleware } from 'redux';
import configureMockStore from 'redux-mock-store';
import { Config, Tower } from '../api/config';

const mockConfig: Config = {
    applogicUrl: '/api/v2/applogic',
    authUrl: '/api/v2/barong',
    msAlertDisplayTime: '3000',
    tablePageLimit: 50,
};

export const setupMockStore = (appMiddleware: Middleware, log = false) => configureMockStore([appMiddleware]);

export const setupMockAxios = () => {
    Tower.config = mockConfig;
    return new MockAdapter(Axios);
};

// tslint:disable-next-line:no-any
export const mockNetworkError = (mockAxios: any) => {
    mockAxios.onAny().networkError();
};
