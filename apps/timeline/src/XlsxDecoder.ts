import {WorkBook, WorkSheet} from "xlsx";
import * as XLSX from 'xlsx';

export interface DecoderOptions<V> {
  headers?: number;
  headerFn?: any;  // called on the decodedHeaders to retrieve a list of columnNames
  metaFn?: any;
  transformerFn?: (sheet: Record<any, V>[], meta?: any) => Record<any, V>[];
}

export interface DecodedWorksheet {
  headers: any[][];
  worksheet: Object[];
  columnNames: string[];
  meta: Object;
}

export type DecodedWorkbook = {
  [sheetName: string]: DecodedWorksheet
}

const defaultOptions = {headers: 0}


export default class Decoder<V> {
  options: DecoderOptions<V> = {};

  constructor(options: DecoderOptions<V>) {
    this.options = {...defaultOptions, ...options};
  }

  decodeWorkbook(workbook: WorkBook): DecodedWorkbook {
    return Object.fromEntries(new Map(workbook.SheetNames.map( sheetName => (
      [sheetName, this.decodeWorksheet(workbook.Sheets[sheetName])]
    ))))
  }

  decodeWorksheet(worksheet: WorkSheet): DecodedWorksheet {
     const decodedHeaders = XLSX.utils.sheet_to_json(worksheet, {range: 0, header: 1}).slice(0, this.options.headers) as any[][]
     const initialColumnNames = this.options.headerFn ? this.options.headerFn(decodedHeaders) : null;

     const meta = this.options.metaFn ? this.options.metaFn(decodedHeaders) : null;

     const sheet: Record<any, V>[] = XLSX.utils.sheet_to_json(worksheet, {header: initialColumnNames})
     const sheetWithoutHeaders = sheet.slice(this.options.headers);
     const transformerFn = this.options.transformerFn ? this.options.transformerFn : (sheet: Record<any, V>[]) => sheet
     const decodedWorksheet = transformerFn(sheetWithoutHeaders, meta)

     const columnNames = decodedWorksheet?.length && Object.keys(decodedWorksheet[0]) || []

     return {headers: decodedHeaders, worksheet: decodedWorksheet, columnNames, meta}
  }
}
