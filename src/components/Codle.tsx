import { useState } from "react";
import { Instructions } from "codle/components/Instructions";
import { LanguageSelect } from "codle/components/LanguageSelect";

export function Codle() {
  const [showInstructions, setShowInstructions] = useState(true);
  const [language, setLanguage] = useState("javascript");

  if (showInstructions) {
    return <Instructions hide={() => setShowInstructions(false)} />;
  }

  return (
    <div>
      <LanguageSelect language={language} setLanguage={setLanguage} />
      {language}
    </div>
  );
}
