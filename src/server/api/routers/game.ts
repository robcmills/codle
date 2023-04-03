import { createGame } from "codle/server/api/createGame";
import { createTRPCRouter } from "codle/server/api/trpc";
import { getGame } from "codle/server/api/getGame";
import { getGameById } from "codle/server/api/getGameById";
import { getProgress } from "codle/server/api/getProgress";
import { updateGame } from "codle/server/api/updateGame";

export const gameRouter = createTRPCRouter({
  create: createGame,
  get: getGame,
  getById: getGameById,
  progress: getProgress,
  update: updateGame,
});
