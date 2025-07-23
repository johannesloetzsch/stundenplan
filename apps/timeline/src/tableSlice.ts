import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {MRT_RowData} from 'material-react-table'

export interface TableState {
  filteredRows: MRT_RowData[]
}

const initialState: TableState = {
  filteredRows: [],
}

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setFilteredRows: (state, action: PayloadAction<MRT_RowData[]>) => {
      state.filteredRows = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setFilteredRows } = tableSlice.actions

export default tableSlice.reducer
