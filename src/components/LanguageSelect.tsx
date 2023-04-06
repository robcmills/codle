import { useRef } from "react";

import { CODLES } from "codle/codle/getRandomCodle";
import { type GameRouterOutput } from "codle/server/api/routers/game";
import { type Language } from "codle/types/Language";
import { getIsLanguageCompleted } from "codle/utils/getIsLanguageCompleted";

export function LanguageSelect({
  language,
  onChange,
  progress,
}: {
  language: string;
  onChange: (language: Language) => void;
  progress?: GameRouterOutput["progress"];
}) {
  const selectRef = useRef<HTMLSelectElement>(null);

  const selectClassName =
    "bg-[#343440] text-white rounded-md p-2 border-x-8 border-[#343440]";
  const optionClassName = "bg-[#343440] text-white";

  const options = Object.keys(CODLES).map((language) => {
    const isCompleted =
      !!progress && getIsLanguageCompleted(progress, language as Language);
    return (
      <option
        className={optionClassName}
        disabled={isCompleted}
        key={language}
        value={language}
      >
        {language} {isCompleted && "✓"}
      </option>
    );
  });

  const _onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as Language);
    if (selectRef.current) {
      selectRef.current.blur();
      // else the select will stay focused and keyboard events will
      // change the language unexpectedly (on desktop)
    }
  };

  return (
    <div className="grid justify-center">
      <select
        className={selectClassName}
        value={language}
        onChange={_onChange}
        ref={selectRef}
      >
        {options}
      </select>
    </div>
  );
}
