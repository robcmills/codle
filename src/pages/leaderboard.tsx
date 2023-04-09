import { type NextPage } from "next";
import { api } from "codle/utils/api";
import { getPlayerDisplayName } from "codle/utils/getPlayerDisplayName";
import { UserAvatar } from "codle/components/UserAvatar";

const LeaderboardPage: NextPage = () => {
  const { data, isLoading } = api.game.leaders.useQuery();

  if (isLoading || !data) return <p className="text-gray-400">Loading...</p>;

  const playersById = data.players.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {} as Record<string, (typeof data.players)[number]>);

  const accuracyLeaders = data.accuracyLeaders.map(
    ({ accuracy, playerId }, index) => {
      const user = playersById[playerId];
      if (!user) return null;
      return (
        <div
          className="grid grid-cols-[auto_auto_1fr_auto] items-center justify-start gap-3"
          key={user.id}
        >
          <p className="text-gray-300">{index + 1}</p>
          <UserAvatar user={user} />
          <p className="text-gray-400">{getPlayerDisplayName(user)}</p>
          <p className="text-yellow-400">{accuracy}%</p>
        </div>
      );
    }
  );

  const mostGamesPlayedLeaders = data.mostGamesPlayed.map(
    ({ count, playerId }, index) => {
      const user = playersById[playerId];
      if (!user) return null;
      return (
        <div
          className="grid grid-cols-[auto_auto_1fr_auto] items-center justify-start gap-3"
          key={user.id}
        >
          <p className="text-gray-300">{index + 1}</p>
          <UserAvatar user={user} />
          <p className="text-gray-400">{getPlayerDisplayName(user)}</p>
          <p className="text-yellow-400">{count}</p>
        </div>
      );
    }
  );

  return (
    <div className="grid justify-items-center gap-2">
      <h1 className="mb-6 text-4xl text-yellow-500">Leaderboard</h1>

      <p className="text-2xl text-green-500">Most Games Played</p>
      <div className="grid w-full gap-3 border-t border-gray-500 p-3">
        {mostGamesPlayedLeaders}
      </div>

      <p className="text-2xl text-green-500">Highest Solve Rate</p>
      <div className="grid w-full gap-3 border-t border-gray-500 p-3">
        {accuracyLeaders}
      </div>
    </div>
  );
};

export default LeaderboardPage;
