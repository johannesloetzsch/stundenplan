import { IndexedDBProvider } from './IndexedDBStorageProvider';
import { DecodeXlsxProvider } from './DecodeXlsxProvider';
import UploadXlsx from './UploadXlsx';
import VisTimelineGenerated from './VisTimelineGenerated';
import DecodedDataTable from './DecodedDataTable';
import { headers, headerFn, transformerFn } from './example/afbb/einsatzplaene/decoder';

const App = () => {

  return (
    <IndexedDBProvider>
      <DecodeXlsxProvider options={{headers, headerFn, transformerFn}}>
        <UploadXlsx />
        <DecodedDataTable /> 
	{/*<VisTimelineGenerated />*/}
      </DecodeXlsxProvider>
    </IndexedDBProvider>
  );
};

export default App;
