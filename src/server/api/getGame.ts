import { privateProcedure } from "codle/server/api/trpc";

/* Get the most recent unsolved game for the current user. */
export const getGame = privateProcedure.query(async ({ ctx }) => {
  const playerId = ctx.userId;
  const games = await ctx.prisma.game.findMany({
    where: { playerId },
    orderBy: { updatedAt: "desc" },
    include: { guesses: true },
  });
  return games.find(
    (game) =>
      game.guesses.length === 0 ||
      game.guesses.every((guess) => guess.letters !== game.codle)
  );
});
