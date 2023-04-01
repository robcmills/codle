import { useCallback, useEffect, useState } from "react";

import { Button } from "codle/components/Button";
import { Guess } from "codle/components/Guess";
import { Keyboard } from "codle/components/Keyboard";
import { LanguageSelect } from "codle/components/LanguageSelect";

import { api } from "codle/utils/api";
import { celebrate } from "codle/celebrate";
import { getRandomCodle } from "codle/codle/getRandomCodle";
import { ALPHABET, NUMBER_OF_TRIES } from "codle/constants";

import { type Language } from "codle/types/Language";
import { type Game } from "codle/types/Game";
import { type ClientGuess } from "codle/types/ClientGuess";
import { useRouter } from "next/router";

export function Codle({
  isSignedIn,
  game,
}: {
  isSignedIn: boolean;
  game?: Game;
}) {
  const languageInitialState = (game?.language as Language) ?? "JavaScript";
  const [language, setLanguage] = useState<Language>(languageInitialState);

  const codleInitialState =
    game?.codle ?? getRandomCodle({ language, exclude: [] });
  const [codle, setCodle] = useState(codleInitialState);

  const guessesInitialState: ClientGuess[] = [];
  for (let i = 0; i < NUMBER_OF_TRIES; i++) {
    const guess = game?.guesses[i];
    if (guess) {
      guessesInitialState.push({ id: guess.id, letters: guess.letters });
    } else {
      guessesInitialState.push({ letters: "" });
    }
  }
  const [guesses, setGuesses] = useState<ClientGuess[]>(guessesInitialState);

  const { mutate: updateGame } = api.game.update.useMutation();
  useEffect(() => {
    if (isSignedIn && game) updateGame({ id: game.id, guesses });
  }, [isSignedIn, game, guesses, updateGame]);

  const isSolved = guesses.some(({ letters }) => letters === codle);
  const isFull = guesses.every(
    ({ letters }) => letters.length === codle.length
  );
  const isGameOver = isSolved || isFull;
  const isCodleRevealed = !isSolved && isFull;

  const selectedLetter = isSolved
    ? null
    : guesses.reduce((selected, { letters }, index) => {
        if (selected === null && letters.length < codle.length) {
          return [index, letters.length] as [number, number];
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
      const lettersArray = newGuess.letters.split("");
      lettersArray[column] = letter;
      newGuess.letters = lettersArray.join("");
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
          guess.letters.length !== 0 &&
          (row === guesses.length - 1 || guesses[row + 1]?.letters.length === 0)
        ) {
          guess.letters = guess.letters.slice(0, -1);
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

  useEffect(() => {
    if (isSolved) celebrate();
  }, [isSolved]);

  const {
    mutateAsync: createGame,
    isLoading: isCreatingNextGame,
    isSuccess: isNextGameCreated,
  } = api.game.create.useMutation();
  const router = useRouter();

  const restart = (withLanguage: Language = language) => {
    setGuesses(guessesInitialState);
    setCodle(getRandomCodle({ language: withLanguage, exclude: [] }));
  };

  const onChangeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    if (newLanguage !== language) {
      restart(newLanguage);
    }
  };

  const onClickPlayAgain = async () => {
    if (isSignedIn) {
      const nextGame = await createGame({ language });
      router.push(`/games/${nextGame.id}`).catch(console.error);
    } else {
      restart();
    }
  };

  return (
    <div className="container grid justify-items-center gap-4 p-4 text-white">
      <LanguageSelect language={language} onChange={onChangeLanguage} />
      <div className="grid w-full grid-cols-1 justify-center gap-4 py-2">
        {guesses.map((guess, index) => (
          <Guess
            codle={codle}
            guess={guess.letters.split("")}
            key={index}
            row={index}
            selectedLetter={selectedLetter}
          />
        ))}
      </div>
      {isCodleRevealed && (
        <Guess
          codle={codle}
          guess={codle.split("")}
          row={-1}
          selectedLetter={null}
        />
      )}
      {isGameOver ? (
        isCreatingNextGame || isNextGameCreated ? (
          <p className="p-2">Loading...</p>
        ) : (
          <Button text="Play Again" onClick={onClickPlayAgain} />
        )
      ) : (
        <Keyboard deleteLetter={deleteLetter} setLetter={setLetter} />
      )}
    </div>
  );
}
