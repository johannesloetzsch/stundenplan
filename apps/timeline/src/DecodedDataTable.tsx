import Table from './Table';
import type { RootState } from './store'
import { useSelector } from 'react-redux'

const DecodedDataTable = () => {
  const workbook = useSelector((state: RootState) => state.workbook.value)
  const worksheetNames = workbook && Object.keys(workbook)
  const data = worksheetNames.reduce((acc: any, worksheetName:any) => (
    [...acc, ...workbook[worksheetName]?.worksheet]
  ), [])
  const columnNames = workbook[worksheetNames[0]]?.columnNames

  return (
    data?.length ? <Table data={data} columnNames={columnNames} /> : "Upload a Spreadsheet"
  )
}

export default DecodedDataTable
