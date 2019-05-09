import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Alerts } from './containers';
import {GuardWrapper} from './containers/Guard';
import { AppRouter } from './router';

class AppLayout extends React.Component {
    public render() {
        return (
            <GuardWrapper>
                <BrowserRouter basename="/tower">
                    <React.Fragment>
                        <Alerts />
                        <AppRouter />
                    </React.Fragment>
                </BrowserRouter>
            </GuardWrapper>
        );
    }
}

export const App = AppLayout;
