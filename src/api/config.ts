export interface Config {
    authUrl: string;
    applogicUrl: string;
    tablePageLimit: number;
    msAlertDisplayTime: string;
    minutesUntilAutoLogout: string;
}

export const defaultConfig: Config = {
    applogicUrl: '',
    authUrl: '',
    msAlertDisplayTime: '5000',
    tablePageLimit: 100,
    minutesUntilAutoLogout: '5',
};

export const Tower = {
    config: defaultConfig,
};

declare global {
    interface Window {
        env: Config;
    }
}

window.env = window.env || defaultConfig;
Tower.config = { ...window.env };

export const applogicUrl = () => Tower.config.applogicUrl;
export const authUrl = () => Tower.config.authUrl;
export const msAlertDisplayTime = () => Tower.config.msAlertDisplayTime;
export const tablePageLimit = () => Tower.config.tablePageLimit;
export const minutesUntilAutoLogout = () => Tower.config.minutesUntilAutoLogout;
