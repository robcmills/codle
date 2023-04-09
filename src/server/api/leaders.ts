import { clerkClient } from "@clerk/nextjs/server";
import { publicProcedure } from "codle/server/api/trpc";
import { type Game } from "codle/types/Game";
import { getPlayerProgress } from "codle/utils/getPlayerProgress";

export const getLeaders = publicProcedure.query(async ({ ctx: { prisma } }) => {
  const games = await prisma.game.findMany({
    include: { guesses: true },
  });

  const gamesByPlayerId = games.reduce((acc, game) => {
    if (!(game.playerId in acc)) acc[game.playerId] = [];
    acc[game.playerId]?.push(game);
    return acc;
  }, {} as Record<string, Game[]>);

  const progressByPlayerId = Object.entries(gamesByPlayerId).reduce(
    (acc, [playerId, games]) => {
      acc[playerId] = getPlayerProgress({ games });
      return acc;
    },
    {} as Record<string, ReturnType<typeof getPlayerProgress>>
  );

  // Most Accurate = Highest solve rate with fewest guesses
  const accuracyLeaders = Object.keys(progressByPlayerId)
    .sort((a, b) => {
      const aProgress = progressByPlayerId[a];
      const bProgress = progressByPlayerId[b];
      if (!aProgress || !bProgress) {
        throw new Error("Missing progress");
      }
      const aAccuracy = aProgress.progressTotal.solvedPercentage;
      const bAccuracy = bProgress.progressTotal.solvedPercentage;
      return bAccuracy - aAccuracy;
    })
    .slice(0, 10)
    .map((playerId) => ({
      playerId,
      accuracy: progressByPlayerId[playerId]?.progressTotal.solvedPercentage,
    }));

  const mostGamesPlayedGroup = await prisma.game.groupBy({
    by: ["playerId"],
    _count: { playerId: true },
    orderBy: [
      { _count: { playerId: "desc" } },
      { _max: { createdAt: "desc" } },
    ],
    take: 10,
  });
  const mostGamesPlayed = mostGamesPlayedGroup.map(({ playerId, _count }) => ({
    playerId,
    count: _count.playerId,
  }));

  const playerIds = [
    ...accuracyLeaders.map(({ playerId }) => playerId),
    ...mostGamesPlayed.map(({ playerId }) => playerId),
  ];
  const clerkUsers = await clerkClient.users.getUserList({
    userId: playerIds,
  });
  const players = clerkUsers.map(
    ({ id, firstName, lastName, profileImageUrl, username }) => ({
      id,
      firstName,
      lastName,
      profileImageUrl,
      username,
    })
  );

  return {
    accuracyLeaders,
    mostGamesPlayed,
    players,
  };
});
