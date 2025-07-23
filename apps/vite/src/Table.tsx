import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_RowData
} from 'material-react-table';


interface TableProps {
  data: MRT_RowData[];
};


export default function Table({data}: TableProps) {
  console.log({data})
  const columns = useMemo(
    () => Object.keys(data[0]).map( k =>
      ({
        accessorKey: k,
        header: k,
      })
    ),
    [data],
  );

  const [rowSelection, setRowSelection] = useState({});

  //useEffect(() => {
  //}, [rowSelection]);

  const table = useMaterialReactTable({
    columns,
    data,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  return (
    <MaterialReactTable table={table} />
  );
}
