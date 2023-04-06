import { type GameRouterOutput } from "codle/server/api/routers/game";
import { type Language } from "codle/types/Language";

export function getIsLanguageCompleted(
  progress: GameRouterOutput["progress"],
  language: Language
) {
  const { played, total } = progress.gamesPlayedByLanguage[language];
  return played === total;
}
