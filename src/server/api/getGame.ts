import { privateProcedure } from "codle/server/api/trpc";
import { languageInput } from "codle/server/api/languageInput";
import { nextGame } from "codle/server/api/nextGame";

export const getGame = privateProcedure
  .input(languageInput)
  .query(async ({ ctx: { prisma, userId }, input: { language } }) =>
    nextGame({ prisma, playerId: userId, language })
  );
