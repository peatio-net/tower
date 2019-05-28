import * as UAParser from 'ua-parser-js';

export const getUserOS = (userAgent: string) => {
    const osParser = new UAParser();
    osParser.setUA(userAgent);
    const parsedUserOS = osParser.getResult().os;
    return parsedUserOS && parsedUserOS.name;
};
