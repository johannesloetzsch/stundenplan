import { useEffect, useState } from 'react';
import Table from './Table';
import { useDecodeXlsx } from './DecodeXlsxProvider';

const DecodedDataTable = () => {
  const {decoder, selectedWorksheet} = useDecodeXlsx();
  //const [data, setData] = useState<any>(null);
  const data = decoder?.decodedWorksheets[selectedWorksheet];
  console.log({data})

  //useEffect(() => {
  //  setData(decoder?.decodedWorksheets["FI23"]);
  //}, [decoder?.decodedWorksheets, selectedWorksheet]);

  return (
    <div>
      <pre>{JSON.stringify(data)}</pre>
      {data ? <Table data={data} /> : "Upload a Spreadsheet"}
    </div>
  );
};

export default DecodedDataTable;
