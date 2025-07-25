import { configureStore } from '@reduxjs/toolkit'
import { tableReducer } from 'table'
import workbookReducer from './workbookSlice'

export const store = configureStore({
  reducer: {
    workbook: workbookReducer,
    table: tableReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
