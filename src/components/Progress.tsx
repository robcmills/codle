import { useUser } from "@clerk/nextjs";
import { CircularProgress } from "codle/components/CircularProgress";
import { type GameRouterOutput } from "codle/server/api/routers/game";
import { type Language } from "codle/types/Language";

import { getPlayerDisplayName } from "codle/utils/getPlayerDisplayName";

export function Progress({
  close,
  language,
  progress,
}: {
  close: () => void;
  language: Language;
  progress: GameRouterOutput["progress"];
}) {
  const { isSignedIn, user } = useUser();
  if (!isSignedIn || !user) return null;

  const onClickScreen = () => {
    close();
  };

  const languageProgress = progress.gamesPlayedByLanguage[language];
  const languageProgressPlayedPercentage = Math.round(
    (languageProgress.played / languageProgress.total) * 100
  );
  const languageProgressSolvedPercentage = Math.round(
    (languageProgress.solved / languageProgress.played) * 100
  );

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 grid place-items-center"
      onClick={onClickScreen}
    >
      <div className="grid justify-items-center gap-2 whitespace-nowrap rounded-md border border-gray-500 bg-zinc-900 p-4 text-center">
        <p>
          Progress for{" "}
          <span className="text-green-500">{getPlayerDisplayName(user)}</span>
        </p>
        <p className="text-3xl text-yellow-500">{language}</p>
        <div className="relative">
          <CircularProgress percentage={languageProgressPlayedPercentage} />
          <p className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-4xl text-yellow-500">
            {languageProgressPlayedPercentage}%
          </p>
        </div>
        <p>
          {languageProgress.played} / {languageProgress.total}
          <span className="text-gray-400">&nbsp; Codles completed</span>
        </p>
        <p>
          <span className="text-gray-400">Solve rate:</span>
          &nbsp;&nbsp;
          <span className="text-2xl text-green-500">
            {languageProgressSolvedPercentage}%
          </span>
          &nbsp;&nbsp;{languageProgress.solved} / {languageProgress.played}
        </p>
      </div>
    </div>
  );
}
