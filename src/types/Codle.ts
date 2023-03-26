import { type CODLES } from "codle/codle/getRandomCodle";
import { type Language } from "codle/types/Language";

export type Codle<L extends Language = "javascript"> =
  (typeof CODLES)[L][number];
