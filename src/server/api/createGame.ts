import { z } from "zod";
import { privateProcedure } from "codle/server/api/trpc";
import { CODLES, getRandomCodle } from "codle/codle/getRandomCodle";
import { type Language } from "codle/types/Language";

export const createGame = privateProcedure
  .input(
    z.object({
      language: z.custom<Language>((val) => (val as string) in CODLES),
    })
  )
  .mutation(async ({ ctx, input: { language } }) => {
    const playerId = ctx.userId;
    // Ensure chosen codle has not been used before
    const games = await ctx.prisma.game.findMany({
      where: { playerId },
    });
    const usedCodles = games.map((game) => game.codle);
    const codle = getRandomCodle({ language, exclude: usedCodles });
    const game = await ctx.prisma.game.create({
      data: {
        codle,
        language,
        playerId,
      },
    });
    return game;
  });
