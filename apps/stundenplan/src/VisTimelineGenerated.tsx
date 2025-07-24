import {TimelineOptions} from 'vis-timeline';
import VisTimeline from './VisTimeline';
import type { RootState } from './store'
import { useSelector } from 'react-redux'
import { strToColor, stringReverse /*, strToHex, strDiffToHex*/ } from './helper/color'

const VisTimelineGenerated = () => {
  const rowSelection = useSelector((state: RootState) => state.table.filteredRows)
  const d = rowSelection


  const items = d && d.map( (row: any, index: number) => {
    return {
      id: index,
      group: row.Jahrgang,
      subgroup: row.Fach,
      content: row.Fach,
      start: row.Datum,
      //style: "background-color: #" + strDiffToHex(row.Fach, "LF") + strToHex(row.Lehrer) + strToHex(stringReverse(row.Lehrer))
      style: "background-color: " + strToColor(stringReverse(row.Lehrer))
    }
  });

  const groups = d && d.reduce( (acc: any, row: any) => {
    const i = row.Jahrgang;
    if(!acc.includes(i)) {
      acc.push(i);
    };
    return acc
  }, [])
  .map( (i: any) => { return {
    id: i,
    content: i,
  }} );

  const options: TimelineOptions = {
    stack: false,
    stackSubgroups: true,
    //horizontalScroll: true,
  }

  return (
    items.length && groups.length ? <VisTimeline items={items} groups={groups} options={options} /> : ""
  );
};

export default VisTimelineGenerated;
