import { transformerFn } from "../../../helper/transformations";

const headers = 5;
const headerFn = (decodedHeaders: any) => decodedHeaders[2];


function meta_faecher(headers: any) {
  const offset_min = 4  // The table has (at least) 4 columns we want to ignore
  const offset = offset_min + headers[2].slice(offset_min).findIndex((v: any) => v)  // If there are additional empty columns, we skip them
  const index_of_null = headers[2].slice(offset).findIndex((v: any) => !v)
  const faecher_list = headers[2].slice(offset, offset+index_of_null)
  const lehrer_list = headers[3].slice(offset, offset+index_of_null)
  const faecher = new Map(faecher_list.map((fach: any, index: number) => [fach, lehrer_list[index]]))
  return Object.fromEntries(faecher)
}

function metaFn(headers: any) {
  return { faecher: meta_faecher(headers) }
}


const transformations = {
  'transformDate': {
    dateKey: 'Datum'
  },
  'expandMetaDict': {
    keepRowNames: ['Datum', 'Tag'],
    expandOnMeta: 'faecher',
    columnNameExpandingColKey: 'Fach',
    columnNameExpandingColVal: 'Lehrer',
    columnNameContent: 'Stunden',
  },
  'substitudeRegex': {
    column: 'Stunden',
    pattern: '\.',
    replacement: '',
  },
  'filterEmpty': {
    columns: ['Stunden']
  }
}


const worksheetColumnName = 'Jahrgang'


export const decoderOptions = { headers, headerFn, metaFn, transformerFn: transformerFn(transformations), worksheetColumnName }
