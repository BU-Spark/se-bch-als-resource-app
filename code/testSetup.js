import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

const mockedRouter = {
  push: jest.fn(),
  route: '/communication',
  pathname: '',
  query: '',
  asPath: '',
};

const localStorageMock = (function() {
  let store = {};
  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    },
    removeItem: function(key) {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

export { fetchMock, mockedRouter, localStorageMock };
