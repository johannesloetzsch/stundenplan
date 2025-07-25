import { store } from './store'
import { Provider } from 'react-redux'

//import { IndexedDBProvider } from './IndexedDBStorageProvider';
import { XlsxRedux } from './XlsxRedux';
import DecodedDataTable from './DecodedDataTable';
import VisTimelineGenerated from './VisTimelineGenerated';

import { decoderOptions } from './example/afbb/einsatzplaene/decoder';


const App = () => {

  return (
    <Provider store={store}>
      <XlsxRedux decoderOptions={decoderOptions}/>
      <VisTimelineGenerated />
      <DecodedDataTable />
    </Provider>
  );
};

export default App;
