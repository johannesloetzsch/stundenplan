import type { RootState } from './store'
import { useSelector, useDispatch } from 'react-redux'
import { set } from './workbookSlice'
import XlsxUpload from './XlsxUpload'
import XlsxDecoder, {DecodedWorkbook, DecoderOptions} from './XlsxDecoder'

export function XlsxRedux<V>({decoderOptions}: {decoderOptions: DecoderOptions<V>}) {
  const workbook = useSelector((state: RootState) => state.workbook.value)
  const dispatch = useDispatch()
  const callback = (decodedWorkbook: DecodedWorkbook) => dispatch(set(decodedWorkbook))
  const worksheetNames = Object.keys(workbook)

  return (
    <div>
      <XlsxUpload decoder={new XlsxDecoder(decoderOptions)} callback={callback} />
      { (worksheetNames.length||null) && " Loaded Worksheets: " + worksheetNames.join(", ") }
    </div>
  )
}
