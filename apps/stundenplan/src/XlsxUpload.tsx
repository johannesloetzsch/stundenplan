import * as XLSX from 'xlsx';
import XlsxDecoder, {DecodedWorkbook} from './XlsxDecoder'

type Callback = (decodedWorkbook: DecodedWorkbook) => void;

interface UploadXlsxProps<V> {
  decoder: XlsxDecoder<V>;
  callback: Callback;
}

const UploadXlsx = ({decoder, callback}: UploadXlsxProps<any>) => {
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

	callback(decoder.decodeWorkbook(workbook))
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
  );
};

export default UploadXlsx;
