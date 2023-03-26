import { useCallback, useEffect, useState } from "react";
import { Instructions } from "codle/components/Instructions";
import { LanguageSelect } from "codle/components/LanguageSelect";
import { ALPHABET, NUMBER_OF_TRIES } from "codle/constants";
import { Guess } from "codle/components/Guess";
import { getRandomCodle } from "codle/codle/getRandomCodle";
import { type Language } from "codle/types/Language";
import { Button } from "codle/components/Button";

export function Codle() {
  const [showInstructions, setShowInstructions] = useState(true);
  const [language, setLanguage] = useState<Language>("javascript");
  const [codle, setCodle] = useState(getRandomCodle(language));

  const guessesInitialState: string[][] = [];
  for (let i = 0; i < NUMBER_OF_TRIES; i++) {
    guessesInitialState.push([]);
  }
  const [guesses, setGuesses] = useState<string[][]>(guessesInitialState);

  const isSolved = guesses.some((guess) => guess.join("") === codle);
  const isFull = guesses.every((guess) => guess.length === codle.length);
  const isGameOver = isSolved || isFull;

  const selectedLetter = isSolved
    ? null
    : guesses.reduce((selected, guess, index) => {
        if (selected === null && guess.length < codle.length) {
          return [index, guess.length] as [number, number];
        }
        return selected;
      }, null as [number, number] | null);

  const setLetter = useCallback(
    (letter: string) => {
      if (!selectedLetter) return;
      const [row, column] = selectedLetter;
      const newGuesses = [...guesses];
      const newGuess = newGuesses[row];
      if (!newGuess) throw new Error("Invalid selected row");
      newGuess[column] = letter;
      setGuesses(newGuesses);
    },
    [guesses, selectedLetter]
  );

  const deleteLetter = useCallback(() => {
    if (!selectedLetter) return;
    const [, column] = selectedLetter;
    if (column === 0) return;
    setGuesses([
      ...guesses.map((guess, row) => {
        if (
          guess.length !== 0 &&
          (row === guesses.length - 1 || guesses[row + 1]?.length === 0)
        ) {
          guess.pop();
        }
        return guess;
      }),
    ]);
  }, [guesses, selectedLetter]);

  const onKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (isSolved) return;
      if (ALPHABET.has(event.key)) {
        setLetter(event.key);
      } else if (event.key === "Backspace") {
        deleteLetter();
      }
    },
    [deleteLetter, isSolved, setLetter]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, [onKeydown]);

  const onChangeLanguage = (newLanguage: Language) => {
    if (newLanguage !== language) {
      setGuesses(guessesInitialState);
      setCodle(getRandomCodle(newLanguage));
    }
    setLanguage(newLanguage);
  };

  const onClickPlay = () => {
    setShowInstructions(false);
  };

  const onClickPlayAgain = () => {
    setGuesses(guessesInitialState);
    setCodle(getRandomCodle(language));
  };

  if (showInstructions) {
    return <Instructions onClickPlay={onClickPlay} />;
  }

  return (
    <div className="grid justify-items-center">
      <LanguageSelect language={language} onChange={onChangeLanguage} />
      <div className="grid grid-flow-row justify-center gap-4 py-6">
        {guesses.map((guess, index) => (
          <Guess
            codle={codle}
            guess={guess}
            key={index}
            row={index}
            selectedLetter={selectedLetter}
          />
        ))}
      </div>
      {isGameOver && <Button text="Play Again" onClick={onClickPlayAgain} />}
    </div>
  );
}
