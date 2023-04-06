import { useCallback, useEffect, useState } from "react";

import { Button } from "codle/components/Button";
import { Guess } from "codle/components/Guess";
import { Keyboard } from "codle/components/Keyboard";
import { LanguageSelect } from "codle/components/LanguageSelect";
import { Progress } from "codle/components/Progress";

import { api } from "codle/utils/api";
import { celebrate } from "codle/celebrate";
import { getRandomCodle } from "codle/codle/getRandomCodle";
import { ALPHABET, NUMBER_OF_TRIES } from "codle/constants";

import { type Language } from "codle/types/Language";
import { type Game } from "codle/types/Game";
import { type ClientGuess } from "codle/types/ClientGuess";
import { getClientGuesses } from "codle/utils/getClientGuesses";
import { replaceUrl } from "codle/utils/replaceUrl";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { getIsLanguageCompleted } from "codle/utils/getIsLanguageCompleted";

export function Codle(props: { isSignedIn: boolean; game?: Game }) {
  const { isSignedIn } = props;
  const [game, setGame] = useState<Game | undefined>(props.game);

  const languageInitialState = (game?.language as Language) ?? "JavaScript";
  const [language, setLanguage] = useState<Language>(languageInitialState);

  const codleInitialState =
    game?.codle ?? (getRandomCodle({ language, exclude: [] }) as string);
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

  const [isProgressOpen, setIsProgressOpen] = useState(false);

  const { data: progress, isFetching: isFetchingProgress } =
    api.game.progress.useQuery(undefined, {
      enabled: isSignedIn,
    });

  const queryClient = useQueryClient();
  const { mutate: updateGame, isLoading: isUpdating } =
    api.game.update.useMutation({
      onSuccess: () => {
        queryClient
          .invalidateQueries(getQueryKey(api.game.progress))
          .catch(console.error);
      },
    });

  const updateGuesses = useCallback(
    (newGuesses: ClientGuess[]) => {
      if (isSignedIn && game) updateGame({ id: game.id, guesses: newGuesses });
    },
    [isSignedIn, game, updateGame]
  );

  const isSolved = guesses.some(({ letters }) => letters === codle);
  const isFull = guesses.every(
    ({ letters }) => letters.length === codle.length
  );
  const isGameOver = isSolved || isFull;
  const isCodleRevealed = !isSolved && isFull;
  const isLanguageCompleted =
    !isFetchingProgress &&
    !!progress &&
    getIsLanguageCompleted(progress, language);
  const isProgressVisible = isProgressOpen && !!progress && !isFetchingProgress;

  useEffect(() => {
    if (isGameOver && isSignedIn && !isUpdating) {
      // Todo: figure why the modal is reopening after closing
      setIsProgressOpen(true);
    }
  }, [isGameOver, isSignedIn, isUpdating]);

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
      updateGuesses(newGuesses);
    },
    [guesses, selectedLetter, updateGuesses]
  );

  const deleteLetter = useCallback(() => {
    if (!selectedLetter) return;
    const [, column] = selectedLetter;
    if (column === 0) return;
    const newGuesses = [
      ...guesses.map((guess, row) => {
        if (
          guess.letters.length !== 0 &&
          (row === guesses.length - 1 || guesses[row + 1]?.letters.length === 0)
        ) {
          guess.letters = guess.letters.slice(0, -1);
        }
        return guess;
      }),
    ];
    setGuesses(newGuesses);
    updateGuesses(newGuesses);
  }, [guesses, selectedLetter, updateGuesses]);

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

  const { mutateAsync: createGame, isLoading: isCreatingNextGame } =
    api.game.create.useMutation();

  const startNewGame = async (withLanguage: Language = language) => {
    if (isSignedIn) {
      const nextGame = await createGame({ language: withLanguage });
      replaceUrl(`/games/${nextGame.id}`);
      setGame(nextGame);
      setGuesses(getClientGuesses(nextGame.guesses));
      setCodle(nextGame.codle);
    } else {
      setGame(undefined);
      setGuesses(guessesInitialState);
      setCodle(
        getRandomCodle({ language: withLanguage, exclude: [] }) as string
      );
    }
    setLanguage(withLanguage);
  };

  const onChangeLanguage = (newLanguage: Language) => {
    if (newLanguage === language) return;
    startNewGame(newLanguage).catch(console.error);
  };

  const onClickPlayAgain = () => {
    startNewGame().catch(console.error);
  };

  return (
    <div className="container grid justify-items-center gap-4 p-4 text-white">
      {isCreatingNextGame ? (
        <p className="p-2">Loading...</p>
      ) : (
        <LanguageSelect
          language={language}
          onChange={onChangeLanguage}
          progress={progress}
        />
      )}
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
        isCreatingNextGame || isFetchingProgress ? (
          <p className="p-2">Loading...</p>
        ) : isLanguageCompleted ? (
          <p className="">
            {language} completed ✓ Nice! Please choose another language.
          </p>
        ) : (
          <Button text="Play Again" onClick={onClickPlayAgain} />
        )
      ) : (
        <Keyboard deleteLetter={deleteLetter} setLetter={setLetter} />
      )}
      {isProgressVisible && (
        <Progress
          close={() => setIsProgressOpen(false)}
          language={language}
          progress={progress}
        />
      )}
    </div>
  );
}
