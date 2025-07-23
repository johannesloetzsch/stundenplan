import { useState, useEffect } from 'react';
import VisTimeline from './VisTimeline';
import { useIndexedDB } from './IndexedDBStorageProvider';

const VisTimelineGenerated = () => {
  const [data, setData] = useState<any>();
  const [headers, setHeaders] = useState<any>();
  const storage = useIndexedDB();

  useEffect(() => {
    const setDataFromStorage = async () => {
      if(storage) {
        const h = await storage.getItem("headers")
        h && setHeaders(JSON.parse(h));
        const d = await storage.getItem("worksheets")
        d && setData(JSON.parse(d));
      };
    };
    setDataFromStorage();
  }, [storage, setData, setHeaders]);

  const calc_faecher = (headers: any) => {
    const h = headers["FI23"];
    const offset = 4;
    const index_of_null = Math.min(h[2].slice(offset).indexOf(null), h[3].slice(offset).indexOf(null));
    const faecher_list = h[2].slice(offset, offset+index_of_null);
    const lehrer_list = h[3].slice(offset, offset+index_of_null);
    const faecher = new Map(faecher_list.map((fach: any, index: number) => [fach, lehrer_list[index]]));
    return faecher
  };
  const faecher = headers ? calc_faecher(headers) : undefined;

  const d_orig: any = data && data["FI23"].filter((row: any) => row.Datum)

  const expand = (d_orig: any) => {
    return d_orig.reduce( (acc: any, row: any) => {
      for(var f in row) {
	if(Array.from(faecher?.keys() || []).includes(f)) {
          acc.push({Datum: row.Datum, Tag: row.Tag, Fach: f, Lehrer: faecher?.get(f)});
        };
      };
      return acc;
    }, []);
  };
  const d = d_orig && expand(d_orig);
  console.log({d});

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
    <div>
      <VisTimeline items={items} groups={groups} />
    </div>
  );
};

export default VisTimelineGenerated;
