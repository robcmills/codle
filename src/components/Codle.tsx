import { useState } from "react";
import { Instructions } from "codle/components/Instructions";
import { LanguageSelect } from "codle/components/LanguageSelect";
import { NUMBER_OF_TRIES } from "codle/constants";
import { Guess } from "codle/components/Guess";
import { getRandomCodle } from "codle/codle/getRandomCodle";
import { type Language } from "codle/types/Language";

export function Codle() {
  const [showInstructions, setShowInstructions] = useState(true);
  const [language, setLanguage] = useState<Language>("javascript");
  const [codle, setCodle] = useState(getRandomCodle(language));
  const [selectedLetter, setSelectedLetter] = useState<[number, number]>([
    0, 0,
  ]);

  const guessesInitialState: string[] = [];
  for (let i = 0; i < NUMBER_OF_TRIES; i++) {
    guessesInitialState.push("");
  }
  const [guesses, setGuesses] = useState<string[]>(guessesInitialState);

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
