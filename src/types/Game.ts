import { type Guess as GuessType, type Game as GameType } from "@prisma/client";

// Prisma does not type "included" fields from relations.
export type Game = GameType & { guesses: GuessType[] };
