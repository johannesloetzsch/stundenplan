import { createSlice,  PayloadAction, Slice } from '@reduxjs/toolkit'
import type { Row, ColumnFiltersState } from '../types/table'

export interface TableState {
  columnFilters: ColumnFiltersState
  filteredRows: Row[]
}

const initialState: TableState = {
  columnFilters: [],
  filteredRows: []
}

export const tableSlice: Slice<TableState> = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setColumnFilters: (state, action: PayloadAction<ColumnFiltersState>) => {
      state.columnFilters = action.payload
    },
    setFilteredRows: (state, action: PayloadAction<Row[]>) => {
      state.filteredRows = action.payload
    }
  }
})

export const {
  setColumnFilters,
  setFilteredRows
} = tableSlice.actions

export default tableSlice.reducer
