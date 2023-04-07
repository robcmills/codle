import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import { createGame } from "codle/server/api/createGame";
import { createTRPCRouter } from "codle/server/api/trpc";
import { getGame } from "codle/server/api/getGame";
import { getGameById } from "codle/server/api/getGameById";
import { getLeaders } from "codle/server/api/leaders";
import { getProgress } from "codle/server/api/getProgress";
import { updateGame } from "codle/server/api/updateGame";

export const gameRouter = createTRPCRouter({
  create: createGame,
  get: getGame,
  getById: getGameById,
  leaders: getLeaders,
  progress: getProgress,
  update: updateGame,
});

export type GameRouterInput = inferRouterInputs<typeof gameRouter>;
export type GameRouterOutput = inferRouterOutputs<typeof gameRouter>;
