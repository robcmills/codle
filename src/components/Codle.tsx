import { useCallback, useEffect, useState } from "react";
import { Instructions } from "codle/components/Instructions";
import { LanguageSelect } from "codle/components/LanguageSelect";
import { ALPHABET, NUMBER_OF_TRIES } from "codle/constants";
import { Guess } from "codle/components/Guess";
import { getRandomCodle } from "codle/codle/getRandomCodle";
import { type Language } from "codle/types/Language";

export function Codle() {
  // State
  const [showInstructions, setShowInstructions] = useState(true);
  const [language, setLanguage] = useState<Language>("javascript");
  const [codle, setCodle] = useState(getRandomCodle(language));

  const guessesInitialState: string[][] = [];
  for (let i = 0; i < NUMBER_OF_TRIES; i++) {
    guessesInitialState.push([]);
  }
  const [guesses, setGuesses] = useState<string[][]>(guessesInitialState);

  const selectedLetter = guesses.reduce((selected, guess, index) => {
    if (selected === null && guess.length < codle.length) {
      return [index, guess.length] as [number, number];
    }
    return selected;
  }, null as [number, number] | null);

  const setLetter = useCallback(
    (letter: string) => {
      if (!selectedLetter) throw new Error("No selected letter");
      const [row, column] = selectedLetter;
      const newGuesses = [...guesses];
      const newGuess = newGuesses[row];
      if (!newGuess) throw new Error("Invalid selected row");
      newGuess[column] = letter;
      setGuesses(newGuesses);
    },
    [guesses, selectedLetter]
  );

  const onKeydown = useCallback(
    (event: KeyboardEvent) => {
      console.log(event.key);
      if (ALPHABET.has(event.key)) {
        setLetter(event.key);
      }
    },
    [setLetter]
  );

  // Effects
  useEffect(() => {
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, [onKeydown]);

  // Event Handlers
  const onChangeLanguage = (newLanguage: Language) => {
    if (newLanguage !== language) {
      setCodle(getRandomCodle(newLanguage));
    }
    setLanguage(newLanguage);
  };

  const onClickPlay = () => {
    setShowInstructions(false);
  };

  if (showInstructions) {
    return <Instructions onClickPlay={onClickPlay} />;
  }

  return (
    <div>
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
    </div>
  );
}
