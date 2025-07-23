export function excelDateToJSDate(serial: number) {
  // Excel's base date is January 1, 1900
  const excelBaseDate = new Date(1900, 0, 1); // Month is 0-indexed in JavaScript
  // Add the number of days to the base date
  const jsDate = new Date(excelBaseDate.getTime() + (serial - 1) * 24 * 60 * 60 * 1000);
  return jsDate;
}
