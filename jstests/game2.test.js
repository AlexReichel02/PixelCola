import { horizontalCollision } from './regame2.js';
const { nextQuestion } = require('./game2');


describe('horizontalCollision', () => {
    it('should indicate delete action and increment x when colliding with left wall', () => {
        const question = { x: 3 };
        const result = horizontalCollision(question);
        expect(result).toEqual({ action: 'delete', xChange: 1 });
    });

    it('should indicate delete action and decrement x when colliding with right wall', () => {
        const question = { x: 348 - 60 };
        const result = horizontalCollision(question);
        expect(result).toEqual({ action: 'delete', xChange: -1 });
    });

    it('should indicate no action when not colliding', () => {
        const question = { x: 100 };
        const result = horizontalCollision(question);
        expect(result).toEqual({ action: 'none', xChange: 0 });
    });
});


describe('nextQuestion', () => {
  test('increments question count if not at end', () => {
      const questions = ['Question 1', 'Question 2'];

      const questionCount = 0;
      const result = nextQuestion(questionCount, questions);
      expect(result.questionCount).toBe(1);
      expect(result.gameOver).toBe(false);
  });
});


  test('sets gameOver to true if at last question', () => {
      const questions = [];
      const questionCount = questions.length - 1;
      const result = nextQuestion(questionCount, questions);
      expect(result.gameOver).toBe(true);
  });
