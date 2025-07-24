import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {DecodedWorkbook, WorkbookMeta} from './XlsxDecoder'

export interface WorkbookState {
  workbook: DecodedWorkbook;
  meta: WorkbookMeta; 
}

const initialState: WorkbookState = {
  workbook: {},
  meta: {},
}

export const workbookSlice = createSlice({
  name: 'workbook',
  initialState,
  reducers: {
    setWorkbook: (state, action: PayloadAction<DecodedWorkbook>) => {
      state.workbook = action.payload
    },
    setMeta: (state, action: PayloadAction<WorkbookMeta>) => {
      state.meta = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setWorkbook, setMeta } = workbookSlice.actions

export default workbookSlice.reducer
