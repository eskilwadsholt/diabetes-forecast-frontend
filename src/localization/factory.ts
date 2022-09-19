import { DiabetesEvent, DiabetesEventType } from "../models";
import type { LocalizedDiabetesEvent } from "./localization";
import type { Translations } from "./translationModel";
import { TEXT } from "./TEXT";

const preTranslations = {
  "mmol/L": TEXT.MMOL_PER_LITER,
  "units": TEXT.UNITS,
  "Insulin": TEXT.INSULIN,
  "BloodSugar": TEXT.BLOODSUGAR
}

const preTranslate = (key : string) : string => {
  return preTranslations[key];
}

const createTransform = (translate, format) => ({
  diabetesEvent : (e : DiabetesEvent) : LocalizedDiabetesEvent => ({
    timestamp: format.time(e.timestamp),
    type: translate(preTranslate(DiabetesEventType[e.type])),
    value: format.number(e.value),
    unit: translate(preTranslate(e.unit))
  }),
});

const createTranslate = (translations : Translations) => {
  return (text : string) : string => {
    const hasTranslation : Boolean = text in translations && translations[text];
    if (hasTranslation) return translations[text];

    return TEXT[text];
  }
}

export const factory = {
  createTransform,
  createTranslate
}