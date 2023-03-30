import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "codle/server/api/trpc";

export const gameRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  // Todo: Convert to a private procedure
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.game.findMany();
  }),
});
