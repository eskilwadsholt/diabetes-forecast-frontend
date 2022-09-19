import { format } from "./format";
import type { Locale } from "../localization";
import { factory } from "../factory";
import { translations } from "./translations";

const translate = factory.createTranslate(translations);
const transform = factory.createTransform(translate, format);

export const xx : Locale = {
  translate,
  format,
  transform,
}