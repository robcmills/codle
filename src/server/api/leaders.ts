import { clerkClient } from "@clerk/nextjs/server";
import { publicProcedure } from "codle/server/api/trpc";

export const getLeaders = publicProcedure.query(async ({ ctx: { prisma } }) => {
  const mostGamesPlayedGroup = await prisma.game.groupBy({
    by: ["playerId"],
    _count: { playerId: true },
    orderBy: { _count: { playerId: "desc" } },
    take: 25,
  });
  const mostGamesPlayed = mostGamesPlayedGroup.map(({ playerId, _count }) => ({
    playerId,
    count: _count.playerId,
  }));

  const clerkUsers = await clerkClient.users.getUserList({
    userId: mostGamesPlayed.map(({ playerId }) => playerId),
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
    mostGamesPlayed,
    players,
  };
});
