const { checkUserWord } = require('./regame.js');

test('checkUserWord returns correct message and score for correct word', () => {
  const result = checkUserWord('test', 'test');
  expect(result.message).toBe('Congrats! test is the correct Word');
  expect(result.score).toBe(5);
});

test('checkUserWord returns correct message and score for incorrect word', () => {
  const result = checkUserWord('test', 'wrong');
  expect(result.message).toBe('Oops! wrong is not the correct Word');
  expect(result.score).toBe(0);
});

test('checkUserWord returns correct message and score for empty word', () => {
  const result = checkUserWord('test', '');
  expect(result.message).toBe('Please enter word to check');
  expect(result.score).toBe(0);
});
