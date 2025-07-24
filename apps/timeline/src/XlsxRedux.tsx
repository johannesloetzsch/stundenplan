import type { RootState } from './store'
import { useSelector, useDispatch } from 'react-redux'
import { setWorkbook, setMeta } from './workbookSlice'
import XlsxUpload from './XlsxUpload'
import XlsxDecoder, {DecodedWorkbook, DecoderOptions} from './XlsxDecoder'

export function XlsxRedux<V>({decoderOptions}: {decoderOptions: DecoderOptions<V>}) {
  const workbook = useSelector((state: RootState) => state.workbook.workbook)
  const dispatch = useDispatch()
  const callback = (decodedWorkbook: DecodedWorkbook) => {
    dispatch(setWorkbook(decodedWorkbook))
    dispatch(setMeta({worksheetColumnName: decoderOptions.worksheetColumnName}))
  }

  const worksheetNames = Object.keys(workbook)

  return (
    <div>
      <XlsxUpload decoder={new XlsxDecoder(decoderOptions)} callback={callback} />
      { (worksheetNames.length||null) && " Loaded Worksheets: " + worksheetNames.join(", ") }
    </div>
  )
}
