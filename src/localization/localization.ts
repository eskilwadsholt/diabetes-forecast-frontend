import { da } from './da/da';
import { en } from './en/en';
import { xx } from './xx/xx';
import type { DiabetesEvent } from '../models';

export type LocalizedDiabetesEvent = {
  timestamp: string;
  type: string;
  value: string;
  unit: string;
}

export type Locale = {
  translate: (text : string) => string;
  format: {
    time: (d : Date) => string;
    number: (n : number) => string;
  };
  transform: {
    diabetesEvent : (e : DiabetesEvent) => LocalizedDiabetesEvent;
  }
}

export const localizations : { [key : string] : Locale } = { en, da, xx };