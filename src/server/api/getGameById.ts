import { z } from "zod";
import { privateProcedure } from "codle/server/api/trpc";

export const getGameById = privateProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const { id } = input;
    const playerId = ctx.userId;
    console.log({ playerId });
    return await ctx.prisma.game.findFirstOrThrow({
      where: { id, playerId },
      include: { guesses: true },
    });
  });
