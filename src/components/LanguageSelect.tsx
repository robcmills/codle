import { CODLES } from "codle/codle/getRandomCodle";
import { type Language } from "codle/types/Language";

export function LanguageSelect({
  language,
  onChange,
}: {
  language: string;
  onChange: (language: Language) => void;
}) {
  const selectClassName =
    "bg-[#343440] text-white rounded-md p-2 border-x-8 border-[#343440]";
  const optionClassName = "bg-[#343440] text-white";

  const options = Object.keys(CODLES).map((language) => (
    <option className={optionClassName} key={language} value={language}>
      {language}
    </option>
  ));

  return (
    <div className="grid justify-center">
      <select
        className={selectClassName}
        value={language}
        onChange={(e) => onChange(e.target.value as Language)}
      >
        {options}
      </select>
    </div>
  );
}
