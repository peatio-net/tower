import {
    buildQueryString,
    capitalize,
    convertToOtp,
    convertToUTCTime,
    findPhone,
    jsonToArray,
    parseList,
} from './';
import {metricsToChartData} from './metricsToChartData';

// tslint:disable-next-line:no-any
const defaults: any = {
    time: '2019-01-10T12:14:16Z',
    otp: true,
    phones: [
        {
            country: 'UA',
            number: '380000000000',
            validated_at: '2019-01-14T13:54:48.000Z',
        },
        {
            country: 'UA',
            number: '380111111111',
            validated_at: '2019-01-13T13:54:48.000Z',
        },
        {
            country: 'UA',
            number: 380222222222,
            validated_at: null,
        },
    ],
};


describe('Helpers', () => {
    it('convertToOtp', () => {
        expect(convertToOtp(defaults.otp)).toEqual('true');
        expect(convertToOtp(!defaults.otp)).toEqual('false');
    });

    it('convertToUTCTime', () => {
        expect(convertToUTCTime(defaults.time)).toEqual('Thu, 10 Jan 2019 12:14:16 GMT');
        expect(convertToUTCTime('potato')).toEqual('Invalid Date');
    });

    it('findPhone', () => {
        expect(findPhone(defaults.phones).number).toEqual('380000000000');
        defaults.phones.push(
            {
                country: 'AX',
                number: '123456789098',
                validated_at: '2019-01-17T13:54:48.000Z',
            });
        expect(findPhone(defaults.phones).number).toEqual('123456789098');
    });

    it('converts metrics to chart data', () => {
        const metrics = {
            signups: {
                '2019-05-24': 3,
            },
            sucessful_logins: {
                '2019-05-23': 2,
                '2019-05-24': 3,
            },
            failed_logins: {
                '2019-05-22': 1,
                '2019-05-23': 1,
                '2019-05-24': 3,
            },
            pending_applications: 0,
        };

        const expected = [
            {name: '18/05', signups: 0, sucessful_logins: 0, failed_logins: 0},
            {name: '19/05', signups: 0, sucessful_logins: 0, failed_logins: 0},
            {name: '20/05', signups: 0, sucessful_logins: 0, failed_logins: 0},
            {name: '21/05', signups: 0, sucessful_logins: 0, failed_logins: 0},
            {name: '22/05', signups: 0, sucessful_logins: 0, failed_logins: 1},
            {name: '23/05', signups: 0, sucessful_logins: 2, failed_logins: 1},
            {name: '24/05', signups: 3, sucessful_logins: 3, failed_logins: 3},
        ];

        expect(metricsToChartData(metrics, new Date('2019-05-24'))).toEqual(expected);
    });

    it('buildQueryString', () => {
        expect(buildQueryString({ page: 0, limit: 25 })).toBe('page=0&limit=25');
        expect(buildQueryString({ page: 1, limit: 10 })).toBe('page=1&limit=10');
        expect(buildQueryString({ page: 2, limit: 5 })).toBe('page=2&limit=5');
        expect(buildQueryString({ page: 2, limit: 5, uid: 'ID873B710D88' })).toBe('page=2&limit=5&uid=ID873B710D88');
        expect(buildQueryString({ page: 2, limit: 5, uid: 'ID873B710D88' })).toBe('page=2&limit=5&uid=ID873B710D88');
        expect(buildQueryString({ page: 1, limit: 50, uid: 'ID873B710D88', role: 'admin' })).toBe('page=1&limit=50&uid=ID873B710D88&role=admin');
    });

    it('capitalize', () => {
        expect(capitalize('tower')).toEqual('Tower');
        expect(capitalize('')).toEqual('');
        expect(capitalize(' ')).toEqual(' ');
    });

    it('parseString', () => {
        expect(parseList('tower,tower')).toEqual('tower, tower');
        expect(parseList('tower, tower')).toEqual('tower, tower');
        expect(parseList('tower')).toEqual('tower');
        expect(parseList(' ')).toEqual(' ');
    });

    it('jsonToArray', () => {
        expect(jsonToArray({ path: 'api/v2/barong/resource/users/me' })).toEqual([{ type: 'key', value: 'path' }, { type: 'value', value: 'api/v2/barong/resource/users/me' }]);
        expect(jsonToArray({ page: '1', limit: { perPage: '10' }})).toEqual([
            { type: 'key', value: 'page' },
            { type: 'value', value: '1' },
            { type: 'key', value: 'limit' },
            { type: 'key', value: 'perPage'},
            { type: 'value', value: '10'},
        ]);
        expect(jsonToArray(JSON.parse('{}'))).toEqual([]);
    });
});
