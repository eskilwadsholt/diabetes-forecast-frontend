export const format = {
   time: (date: Date) : string => {
    const formattedDate : string = date.toString();

    return formattedDate;
  },
  number: (n : number) => n.toString()
}