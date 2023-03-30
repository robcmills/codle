import { createTRPCRouter } from "codle/server/api/trpc";
import { createGame } from "codle/server/api/createGame";

export const gameRouter = createTRPCRouter({
  create: createGame,
});
