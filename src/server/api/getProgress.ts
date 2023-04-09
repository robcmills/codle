import { privateProcedure } from "codle/server/api/trpc";
import { getPlayerProgress } from "codle/utils/getPlayerProgress";

export const getProgress = privateProcedure.query(
  async ({ ctx: { prisma, userId } }) => {
    const games = await prisma.game.findMany({
      where: { playerId: userId },
      include: { guesses: true },
    });

    return getPlayerProgress({ games });
  }
);
