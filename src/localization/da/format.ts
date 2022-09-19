import { format as fns } from 'date-fns';
import { da as dateLang } from 'date-fns/esm/locale';

const timeFormat = "EEEE 'den' d. MMMM HH:mm";
const options = { locale: dateLang };

export const format = {
   time: (date: Date) : string => {
    const formattedDate : string = fns(
      date,
      timeFormat,
      options
    );

    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  },
  number: (n : number) => n.toFixed(1).replace('.', ',')
}