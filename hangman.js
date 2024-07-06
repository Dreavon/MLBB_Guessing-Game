// Hangman.js
import React, { useState } from "react";

const words = [
  // Your word list here
];

const Hangman = () => {
  const [selectedWord, setSelectedWord] = useState(
    words[Math.floor(Math.random() * words.length)]
  );
  const [guessedWord, setGuessedWord] = useState(
    Array(selectedWord.length).fill("_")
  );
  const [remainingAttempts, setRemainingAttempts] = useState(6);
  const [resultMessage, setResultMessage] = useState("");

  const displayWord = () => {
    return guessedWord.join(" ");
  };

  const displayLetters = () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    return alphabet.map((letter) => (
      <button
        key={letter}
        className="letter"
        onClick={() => checkLetter(letter)}
        disabled={resultMessage}
      >
        {letter}
      </button>
    ));
  };

  const checkLetter = (letter) => {
    let found = false;
    const updatedGuessedWord = guessedWord.map((char, index) => {
      if (selectedWord[index] === letter) {
        found = true;
        return letter;
      }
      return char;
    });

    setGuessedWord(updatedGuessedWord);

    if (!updatedGuessedWord.includes("_")) {
      setResultMessage("You win!");
    } else if (!found) {
      setRemainingAttempts((prevAttempts) => prevAttempts - 1);
      if (remainingAttempts === 1) {
        setResultMessage(`You lost! The word was "${selectedWord}".`);
      }
    }
  };

  const restartGame = () => {
    setSelectedWord(words[Math.floor(Math.random() * words.length)]);
    setGuessedWord(Array(selectedWord.length).fill("_"));
    setRemainingAttempts(6);
    setResultMessage("");
  };

  return (
    <div className="game">
      <h2>MLBB Heroes Guessing Game</h2>
      <div className="word">{displayWord()}</div>
      <div className="letters">{displayLetters()}</div>
      <div className="result">{resultMessage}</div>
      <button id="restartBtn" onClick={restartGame}>
        Restart Game
      </button>
    </div>
  );
};

export default Hangman;
