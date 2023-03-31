import { createTRPCRouter } from "codle/server/api/trpc";
import { createGame } from "codle/server/api/createGame";
import { getGame } from "codle/server/api/getGame";

export const gameRouter = createTRPCRouter({
  get: getGame,
  create: createGame,
});
