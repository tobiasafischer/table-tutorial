import React from 'react'
import styled from 'styled-components'
import { TableBody, TableData, TableRow } from '../Table'

const Button = styled.button`
   border: none;
   background-color: transparent;
   width: auto;
   height: 14px;
   align-items: center;
   padding: 0px;
   font-size: 12px;
   color: #c5c5c5;
   cursor: pointer;
`

type Props = {
   data: Array<any>
   columnSpacing: string
   handleRemove: (id: any) => void
   handleDuplicate: (i: number) => void
}

const TaskTableBody: React.FC<Props> = ({ data, columnSpacing, handleRemove, handleDuplicate }) => (
   <TableBody>
      {data.map((row, i) => (
         <TableRow
            key={row.id}
            columnLength={Object.entries(row).length || 0}
            columnSpacing={columnSpacing}
         >
            <TableData>
               <Button onClick={() => handleRemove(i)}>check</Button>
            </TableData>

            {Object.values(row)
               .slice(1)
               .map((item: any) => (
                  <TableData key={item}>
                     {item instanceof Date ? item.toLocaleDateString() : item}
                  </TableData>
               ))}

            <TableData>
               <Button onClick={() => handleDuplicate(i)}>duplicate</Button>
            </TableData>
            <TableData>
               <Button onClick={() => handleRemove(row.id)}>remove</Button>
            </TableData>
         </TableRow>
      ))}
   </TableBody>
)

export default TaskTableBody
