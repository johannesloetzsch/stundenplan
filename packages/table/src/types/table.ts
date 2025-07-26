import {MRT_RowData, MRT_ColumnFiltersState, MRT_TableOptions} from 'material-react-table'


/** Row **/

type RecordRow = Record<string, any>
type TableRow = MRT_RowData
export interface Row extends RecordRow, TableRow {}


/** Options **/

export type TableOptions = MRT_TableOptions<Row>
export interface TableOptionsDefaultColumns extends Partial<TableOptions> {
  data: Row[]
}


/** Updater used by MRT state changes
 *  https://www.material-react-table.com/docs/guides/state-management#add-side-effects-in-set-state-callbacks
 **/

export type Updater<T> = T | ((old: T) => T)

export function evaluated<T>(f_or_val: Updater<T>, old: T) {
  return f_or_val instanceof Function ? f_or_val(old) : f_or_val
}


/** State **/

export type ColumnFiltersState = MRT_ColumnFiltersState
