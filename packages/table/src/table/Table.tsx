import { useRef } from 'react'
import { Row, TableOptionsDefaultColumns } from "../types/table"
import {
  useMaterialReactTable,
  MaterialReactTable,
  type MRT_TableInstance,
} from 'material-react-table'
import { useTableDefaultColumns } from './TableDefaultColumns'
import { useTableDefaults } from './TableDefaults'
import { useTableFilter } from './TableFilters'

export function Table( optionsDefaultColumns: TableOptionsDefaultColumns ) {
  const tableRef = useRef<MRT_TableInstance<Row>>(null)

  let options = useTableDefaultColumns(optionsDefaultColumns)
  options = useTableDefaults(options)
  options = useTableFilter(options, tableRef)

  tableRef.current = useMaterialReactTable(options)
  return <MaterialReactTable table={tableRef.current} />
}
