import { excelDateToISODate } from '../date/excelDate';

export interface TransformDateOptions {
  dateKey: string
}

export function transformDate(sheet: Record<any, any>[], {dateKey}: TransformDateOptions) {
  return sheet.map(row => (
    {...row, [dateKey]: excelDateToISODate(row[dateKey])}
  ))
}
