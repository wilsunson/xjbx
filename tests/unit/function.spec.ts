import functions from '@/function';
//import regeneratorRuntime from 'regenerator-runtime';
// const sum =require('../src/function.ts')
test('测试用例sum', () => {
  expect(functions.sum(3, 3)).toBe(6);
});
test('测试用例reduce', () => {
  expect(functions.reduce(2, 3)).toBe(1);
});
test('getIntArray(5)返回的数组长度应该为5', () => {
  expect(functions.getIntArray(5)).toHaveLength(5);
});
test('getInfo应该得到username=admin', async () => {
  expect.assertions(1);
  const info = await functions.getInfo();
  expect(info.data.data.username).toEqual('admin');
});

