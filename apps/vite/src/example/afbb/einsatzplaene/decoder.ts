import { excelDateToJSDate } from '../../../helper/date/excelDate';


export const headers = 5;

export const headerFn = (decodedHeaders: any) => decodedHeaders[2];

export const transformerFn = (entry: any) => {
  return {...entry, Datum: excelDateToJSDate(entry.Datum)}
};
