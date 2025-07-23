import { useEffect } from 'react';
import * as XLSX from 'xlsx';
import { useIndexedDB } from './IndexedDBStorageProvider';
import { useDecodeXlsx } from './DecodeXlsxProvider';

const UploadXlsx = () => {
  //const decoder = useDecodeXlsx();
  const {decoder, selectedWorksheet, setSelectedWorksheet} = useDecodeXlsx();
  const storage = useIndexedDB();

  /** on load (before new upload) the stored values should be used **/
  useEffect(() => {
    const loadFromStorage = async () => {
      if(storage && decoder) {
        const headers = await storage.getItem("headers")
        decoder.decodedHeaders = headers && (JSON.parse(headers)) || []
        const worksheets = await storage.getItem("worksheets")
        decoder.decodedWorksheets = worksheets && (JSON.parse(worksheets)) || {}
	worksheets && setSelectedWorksheet(Object.keys(decoder.decodedWorksheets)[0])
      };
    };
    loadFromStorage();
  }, [storage]);

  useEffect(() => {
    decoder && console.log({decoder})
  }, [decoder?.decodedHeaders, decoder?.decodedWorksheets]);

  /** decode and store **/
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const data = new Uint8Array(arrayBuffer);
        const binaryStr = Array.from(data)
          .map((byte) => String.fromCharCode(byte))
          .join('');
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        decoder?.decodeWorkbook(workbook);
	console.log({decoder});

        if(decoder && storage) {
          await storage.setItem("worksheets", JSON.stringify(decoder.decodedWorksheets))
          await storage.setItem("headers", JSON.stringify(decoder.decodedHeaders))
	  setSelectedWorksheet(Object.keys(decoder.decodedWorksheets)[0])
        };
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
    </div>
  );
};

export default UploadXlsx;
