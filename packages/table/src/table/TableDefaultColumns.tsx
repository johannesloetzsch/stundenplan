import { Row, TableOptions, TableOptionsDefaultColumns } from "../types/table"
 
function columnsFromData(data: Row[]) {
  const columnNames = Object.keys(data[0])
  const columns = columnNames.filter(v => v).map(k => ({
    accessorKey: k,
    header: k,
  }))
  return columns
}

export function useTableDefaultColumns(options: TableOptionsDefaultColumns): TableOptions {
  const columns = options.columns || columnsFromData(options.data)

  return {
    ...options,
    columns
  }
}
