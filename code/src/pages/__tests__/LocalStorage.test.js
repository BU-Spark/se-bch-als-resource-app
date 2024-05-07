import { localStorageMock } from '../../../testSetup';

test('should save and load data from local storage', () => {
  localStorageMock.setItem('testKey', JSON.stringify({ id: 123 }));
  const item = JSON.parse(localStorageMock.getItem('testKey'));
  expect(item).toEqual({ id: 123 });
});
