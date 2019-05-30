const localStorageMock: Storage = (() => {
    let store = {};
    return {
        getItem: key => store[key] || null,
        setItem: (key, value) => {
            store[key] = value.toString();
        },
        removeItem: key => {
            // tslint:disable-next-line:no-dynamic-delete
            delete store[key];
        },
        clear: () => {
            store = {};
        },
        length: Object.keys(store).length,
        key: index => Object.keys(store)[index],
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});
