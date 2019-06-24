import { DataInterface } from '../modules';

export const jsonToArray = data => {
    const list: DataInterface[] = [];
    data.length && JSON.parse(data, (key, value) => {
        key.length && list.push({ key, value });
      });
    return list;
};
