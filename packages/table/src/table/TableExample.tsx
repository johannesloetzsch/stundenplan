import { Table } from './Table';
import { store, RootState } from '../state/store'
import { Provider, useSelector } from 'react-redux'
import { ReactNode } from 'react';

export const data = [
  {a: 1, b: 2},
  {a: 3, b: 4}
]


export function Decorator({children}: {children: ReactNode}) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export default function TableExample() {
  return (
    <Decorator>
      <Table data={data} />
      <FilteredRows />
    </Decorator>
  )
}


export function FilteredRows() {
  const columnFilters = useSelector((state: RootState) => state.table.columnFilters)
  const filteredRows = useSelector((state: RootState) => state.table.filteredRows)
  return <>
    <br />
    <hr />
    { filteredRows.length == data.length ?
      <>Try the <b>ColumnFilters</b></> :
      <>
        {filteredRows.length} Rows match the current <code>ColumnFilters</code>.
	<pre>{JSON.stringify(columnFilters, null, 2)}</pre>
      </>
    }
  </>
}
