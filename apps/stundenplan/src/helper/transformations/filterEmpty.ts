export interface FilterEmptyOptions {
  columns: string[];
}

export function filterEmpty(sheet: Record<any, any>[], {columns}: FilterEmptyOptions) {
  return sheet.filter(row =>
    columns.map(c => row[c]).every(Boolean)
  )
}
