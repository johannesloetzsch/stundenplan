import {WorkBook, WorkSheet} from "xlsx";
import * as XLSX from 'xlsx';

export interface DecoderOptions {
  headers?: number;
  headerFn?: any;  // called on the decodedHeaders to retrieve a list of columnNames
  transformerFn?: any;  // called on every row
}

const defaultOptions = {headers: 0}


export default class Decoder {
  options: DecoderOptions = {};
  decodedHeaders: any = {};
  decodedWorksheets: any = {};

  constructor(options: DecoderOptions) {
    this.options = {...defaultOptions, ...options};
    console.log("const", this)
  }

  decodeWorkbook(workbook: WorkBook) {
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    this.decodeWorksheet(worksheet, sheetName);
  }

  decodeWorksheet(worksheet: WorkSheet, sheetName: string) {
     console.log("foo", this, this.decodedHeaders, sheetName)
     this.decodedHeaders[sheetName] = XLSX.utils.sheet_to_json(worksheet, {range: 0, header: 1}).slice(0, this.options.headers);
     const columnNames = this.options.headerFn ? this.options.headerFn(this.decodedHeaders[sheetName]) : null;
     const sheet = XLSX.utils.sheet_to_json(worksheet, {header: columnNames}).slice(this.options.headers);
     this.decodedWorksheets[sheetName] = this.options.transformerFn ?
       sheet.map(row => this.options.transformerFn(row)) :
       sheet
  }
}
