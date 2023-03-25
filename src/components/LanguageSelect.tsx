export function LanguageSelect({
  language,
  setLanguage,
}: {
  language: string;
  setLanguage: (language: string) => void;
}) {
  const selectClassName =
    "bg-[#343440] text-white rounded-md p-2 border-x-8 border-[#343440]";
  const optionClassName = "bg-[#343440] text-white";

  return (
    <div className="grid justify-center">
      <select
        className={selectClassName}
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
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
