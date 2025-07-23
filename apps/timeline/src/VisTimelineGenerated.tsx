import VisTimeline from './VisTimeline';
import type { RootState } from './store'
import { useSelector } from 'react-redux'


const VisTimelineGenerated = () => {
  const rowSelection = useSelector((state: RootState) => state.table.filteredRows)
  const d = rowSelection


  const items = d && d.map( (row: any, index: number) => {
    return { id: index, group: row.Lehrer, content: row.Fach, start: row.Datum }
  });

  const groups = d && d.reduce( (acc: any, row: any) => {
    const i = row.Lehrer;
    if(!acc.includes(i)) {
      acc.push(i);
    };
    return acc
  }, [])
  .map( (i: any) => { return {id: i, content: i}} );


  return (
    items.length && groups.length ? <VisTimeline items={items} groups={groups} /> : ""
  );
};

export default VisTimelineGenerated;
