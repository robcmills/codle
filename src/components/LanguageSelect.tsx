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

  return (
    <div className="grid justify-center">
      <select
        className={selectClassName}
        value={language}
        onChange={(e) => onChange(e.target.value as Language)}
      >
        <option className={optionClassName} value="javascript">
          JavaScript
        </option>
        <option className={optionClassName} value="python">
          Python
        </option>
      </select>
    </div>
  );
}
