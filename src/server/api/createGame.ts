import { languageInput } from "codle/server/api/languageInput";
import { nextGame } from "codle/server/api/nextGame";
import { privateProcedure } from "codle/server/api/trpc";

export const createGame = privateProcedure
  .input(languageInput)
  .mutation(async ({ ctx: { prisma, userId }, input: { language } }) =>
    nextGame({ prisma, playerId: userId, language })
  );
