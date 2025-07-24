import { configureStore } from '@reduxjs/toolkit'
import workbookReducer from './workbookSlice'
import tableReducer from './tableSlice'

export const store = configureStore({
  reducer: {
    workbook: workbookReducer,
    table: tableReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
