function getShuffledWord(word) {
    let wordArray = word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    return wordArray.join("");
  }
  
  function checkUserWord(correctWord, userWord) {
    if (!userWord) {
      return { message: "Please enter word to check", score: 0 };
    }
  
    if (userWord === correctWord) {
      return {
        message: "Congrats! " + correctWord + " is the correct Word",
        score: 5,
      };
    } else {
      return {
        message: "Oops! " + userWord + " is not the correct Word",
        score: 0,
      };
    }
  }
  
  module.exports = {
    getShuffledWord,
    checkUserWord,
  };
  