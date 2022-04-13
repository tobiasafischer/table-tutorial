import React from 'react'
import { TableHead, TableRow } from '.'

export type TableRowHeadProps = {
   headers: string[]
   sortFields: string[]
   order: '' | 'up' | 'down'
   colName: string | null
   dispatchSort: (ord: '' | 'up' | 'down', headPayload: string) => void
   columnSpacing?: string
}

const TableRowHead: React.FC<TableRowHeadProps> = ({
   headers,
   sortFields,
   order,
   dispatchSort,
   colName,
   columnSpacing,
}) => (
   <TableRow columnLength={headers.length} columnSpacing={columnSpacing}>
      {headers.map((head, i) => (
         <TableHead
            key={`${head}${i}`}
            hasButton={sortFields.includes(head)}
            dispatchSort={dispatchSort}
            colName={colName}
            order={order}
         >
            {head}
         </TableHead>
      ))}
   </TableRow>
)

export default TableRowHead
