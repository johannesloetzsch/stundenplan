import { transformerFn } from "../../../helper/transformations";

const headers = 5;
const headerFn = (decodedHeaders: any) => decodedHeaders[2];


function meta_faecher(headers: any) {
  const offset = 4;
  const index_of_null = headers[2].slice(offset).findIndex((v: any) => !v)
  const faecher_list = headers[2].slice(offset, offset+index_of_null);
  const lehrer_list = headers[3].slice(offset, offset+index_of_null);
  const faecher = new Map(faecher_list.map((fach: any, index: number) => [fach, lehrer_list[index]]));
  return Object.fromEntries(faecher)
}

function metaFn(headers: any) {
  return { faecher: meta_faecher(headers) }
}


const transformations = {
  'transformDate': {dateKey: "Datum"},
  'expandMetaDict': {
    keepRowNames: ["Datum", "Tag"],
    expandOnMeta: "faecher",
    columnNameExpandingColKey: "Fach",
    columnNameExpandingColVal: "Lehrer",
    columnNameContent: "Stunden",
  }
}


export const decoderOptions = { headers, headerFn, metaFn, transformerFn: transformerFn(transformations) }
