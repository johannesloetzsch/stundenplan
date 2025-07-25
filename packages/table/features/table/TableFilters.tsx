import { useEffect, RefObject } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../state/store'
import { setColumnFilters, setFilteredRows } from '../state/tableSlice'
import { Row, Updater, TableOptions, evaluated, ColumnFiltersState } from "../types/table"
import type { MRT_TableInstance } from 'material-react-table'
 
export function useTableFilter( options: TableOptions, tableRef: RefObject<null|MRT_TableInstance<Row>> ): TableOptions {
  const dispatch = useDispatch()
  const columnFilters = useSelector((state: RootState) => state.table.columnFilters)

  useEffect(() => {
      const rows = tableRef.current?.getPrePaginationRowModel().rows.map(r => r.original)
      dispatch(setFilteredRows(rows))
  }, [columnFilters])

  const onColumnFiltersChange = (filters: Updater<ColumnFiltersState>) => dispatch(setColumnFilters(evaluated(filters, columnFilters)))

  return {
    ...options,
    onColumnFiltersChange,
    state: {
      ...options?.state,
      columnFilters
    },
    initialState: {
      ...options?.initialState,
      showColumnFilters: true,
    }
  }
}
