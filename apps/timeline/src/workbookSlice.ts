import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {DecodedWorkbook} from './XlsxDecoder'

export interface WorkbookState {
  value: DecodedWorkbook
}

const initialState: WorkbookState = {
  value: {},
}

export const workbookSlice = createSlice({
  name: 'workbook',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<DecodedWorkbook>) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { set } = workbookSlice.actions

export default workbookSlice.reducer
