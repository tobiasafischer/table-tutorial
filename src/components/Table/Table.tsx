import styled from 'styled-components'

const Table = styled.table`
   border-collapse: collapse;
   width: 100%;
   box-sizing: border-box;

   border: 1px solid red;
`

export const TableHeader = styled.thead`
   width: 100%;
`

export const TableBody = styled.tbody`
   width: 100%;
`

export type TableRowHeadProps = {
   headers: string[]
   sortFields: string[]
   order: '' | 'up' | 'down'
   colName: string | null
   dispatchSort: (ord: '' | 'up' | 'down', headPayload: string) => void
   columnSpacing?: string
}

export default Table
