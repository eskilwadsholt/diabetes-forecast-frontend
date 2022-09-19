import { format as fns } from 'date-fns';
import { enUS as dateLang } from 'date-fns/esm/locale';

const timeFormat = "EEEE 'the' do 'of' MMMM HH:mm";
const options = { locale: dateLang };

export const format = {
   time: (d: Date) : string => {
    const formattedDate : string = fns(
      d,
      timeFormat,
      options
    );

    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  },
  number: (n : number) => n.toFixed(1)
}