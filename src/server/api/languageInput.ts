import { z } from "zod";
import { CODLES } from "codle/codle/getRandomCodle";
import { type Language } from "codle/types/Language";

export const languageInput = z.object({
  language: z
    .custom<Language>((val) => (val as string) in CODLES)
    .default("JavaScript"),
});
