import { z } from "zod";
import { privateProcedure } from "codle/server/api/trpc";

export const updateGame = privateProcedure
  .input(
    z.object({
      id: z.string(),
      guesses: z.array(
        z.object({ id: z.string().optional(), letters: z.string() })
      ),
    })
  )
  .mutation(async ({ ctx, input: { id, guesses } }) => {
    const playerId = ctx.userId;

    await Promise.all(
      guesses.map((guess) =>
        guess.id === undefined
          ? ctx.prisma.guess.create({
              data: { gameId: id, letters: guess.letters, playerId },
            })
          : ctx.prisma.guess.update({
              where: { id: guess.id },
              data: { letters: guess.letters },
            })
      )
    );

    return await ctx.prisma.game.findFirstOrThrow({
      where: { id },
      include: { guesses: true },
    });
  });
