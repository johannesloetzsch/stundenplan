import { useMemo } from 'react';
import Table from './Table';
import {DecodedWorkbook} from './XlsxDecoder';
import type { RootState } from './store'
import { useSelector } from 'react-redux'

function mergeWorksheets(workbook: DecodedWorkbook, worksheetColumnName: string) {
  const worksheetNames = workbook && Object.keys(workbook)
  const data = worksheetNames.reduce((acc: any, worksheetName: string) => (
    [...acc, ...workbook[worksheetName]?.worksheet.map( row => (
      {...row, [worksheetColumnName]: worksheetName} 
    ))]),
    [])
  const columnNames = [worksheetColumnName, ...workbook[worksheetNames[0]]?.columnNames]

  return [data, columnNames]
}

const DecodedDataTable = () => {
  const workbook = useSelector((state: RootState) => state.workbook.workbook)
  const worksheetColumnName = useSelector((state: RootState) => state.workbook.meta.worksheetColumnName)
  const [data, columnNames] = useMemo( () => worksheetColumnName && mergeWorksheets(workbook, worksheetColumnName) || [],
  [workbook])

  return (
    data?.length ? <Table data={data} columnNames={columnNames} /> : "Upload a Spreadsheet"
  )
}

export default DecodedDataTable
