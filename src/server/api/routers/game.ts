import { createTRPCRouter } from "codle/server/api/trpc";
import { createGame } from "codle/server/api/createGame";
import { getGame } from "codle/server/api/getGame";
import { getGameById } from "codle/server/api/getGameById";

export const gameRouter = createTRPCRouter({
  get: getGame,
  getById: getGameById,
  create: createGame,
});
