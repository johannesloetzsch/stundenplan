import { useMemo, useState, useEffect } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_RowData,
  MRT_ColumnFiltersState,
  MRT_TableInstance
} from 'material-react-table';
import { useDispatch } from 'react-redux'
import { setFilteredRows } from './tableSlice'


interface TableProps {
  data: MRT_RowData[];
  columnNames?: string[];
};


export default function Table({data, columnNames}: TableProps) {
  const dispatch = useDispatch()

  const columnNamesOrKeys = columnNames || data[0] && Object.keys(data[0])
  const uniqueColumnNames = Array.from(new Set(columnNamesOrKeys))
  const columns = useMemo(
    () => uniqueColumnNames.filter(v => v).map( k =>
      ({
        accessorKey: k,
        header: k,
      })
    ),
    [data, columnNames],
  );

  const [rowSelection, setRowSelection] = useState({});
  /*
  useEffect(() => {
    console.log({rowSelection})
  }, [rowSelection]);
  */

  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
  useEffect(() => {
    const rows = (table as MRT_TableInstance<any>).getPrePaginationRowModel().rows.map(r => r.original)
    //console.log({columnFilters, rows})
    dispatch(setFilteredRows(rows))
  }, [columnFilters]);


  const table = data.length && columns && useMaterialReactTable({
    columns,
    data,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    state: { columnFilters, rowSelection },
    initialState: {
      showColumnFilters: true,
      sorting: [{ id: 'Datum', desc: false }]
    }
  });

  return table && (
    <MaterialReactTable table={table} />
  )
}
