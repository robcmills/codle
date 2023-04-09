import { CODLES } from "codle/codle/getRandomCodle";
import { type Game } from "codle/types/Game";
import { type Language } from "codle/types/Language";
import { type PlayerProgress } from "codle/types/PlayerProgress";

export function getPlayerProgress({ games }: { games: Game[] }) {
  const progressByLanguage = Object.entries(CODLES).reduce(
    (acc, [language, codles]) => {
      acc[language as Language] = {
        played: 0,
        playedPercentage: 0,
        solved: 0,
        solvedPercentage: 0,
        total: codles.length,
      };
      return acc;
    },
    {} as Record<Language, PlayerProgress>
  );

  for (const game of games) {
    const isSolved = game.guesses.some(({ letters }) => letters === game.codle);
    if (isSolved) {
      progressByLanguage[game.language as Language].solved += 1;
    }

    const isFull = game.guesses.every(
      ({ letters }) => letters.length === game.codle.length
    );
    const isFinished = isSolved || isFull;
    if (isFinished) {
      progressByLanguage[game.language as Language].played += 1;
    }
  }

  for (const languageProgress of Object.values(progressByLanguage)) {
    languageProgress.playedPercentage = Math.round(
      (languageProgress.played / languageProgress.total) * 100
    );
    languageProgress.solvedPercentage =
      languageProgress.played === 0
        ? 0
        : Math.round((languageProgress.solved / languageProgress.played) * 100);
  }

  const progressTotal = Object.values(progressByLanguage).reduce(
    (acc, { played, solved, total }) => {
      acc.played += played;
      acc.solved += solved;
      acc.total += total;
      return acc;
    },
    { played: 0, playedPercentage: 0, solved: 0, solvedPercentage: 0, total: 0 }
  );

  progressTotal.playedPercentage = Math.round(
    (progressTotal.played / progressTotal.total) * 100
  );
  progressTotal.solvedPercentage =
    progressTotal.played === 0
      ? 0
      : Math.round((progressTotal.solved / progressTotal.played) * 100);

  return {
    progressByLanguage,
    progressTotal,
  };
}
