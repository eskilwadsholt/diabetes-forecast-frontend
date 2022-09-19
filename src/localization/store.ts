import { writable } from 'svelte/store';
import type { Locale } from './localization';

export const locale = writable<Locale>();