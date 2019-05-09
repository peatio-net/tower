import * as React from 'react';

class GuardWrapper extends React.Component {
    public render() {
        let expirationTime: number | undefined;

        if (process.env.BUILD_EXPIRE) {
            expirationTime = parseInt(process.env.BUILD_EXPIRE, 10);
        }

        if (expirationTime && Date.now() > expirationTime) {
            return (<div><h1>Your build has expired!</h1></div>);
        } else {
            return this.props.children;
        }
    }
}

export {
    GuardWrapper,
};
