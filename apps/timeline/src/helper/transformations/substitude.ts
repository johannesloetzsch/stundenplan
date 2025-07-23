export interface SubstitudeRegexOptions {
  column: string;
  pattern: string;
  replacement: string;
}

export function substitudeRegex(sheet: Record<any, any>[], {column, pattern, replacement}: SubstitudeRegexOptions) {
  return sheet.map(row => (
    {...row, [column]: row[column].replace(pattern, replacement)}
  ))
}
