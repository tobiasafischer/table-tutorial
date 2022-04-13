// @ts-nocheck
import React from 'react'
import { v4 } from 'uuid'
import { ApiType } from '../../api'
import useTableSort from '../../useTableSort'
import { Table, TableHeader, TableRowHead } from '../Table'
import { Container } from './TaskTable.styled'
import TaskTableBody from './TaskTableBody'

type Props = {
   api: ApiType
}

const TaskTable: React.FC<Props> = ({ api }) => {
   const { order, colName, data, dispatchSort, updateData } = useTableSort(api.data)
   const headers = ['', ...Object.keys(api.data[0]).splice(1), '', '']
   const sortFields = Object.keys(api.data[0]).splice(1)

   const handleRemove = (id: any) => updateData(data.filter((item: any) => item.id !== id))

   const handleDuplicate = (i: number) =>
      updateData((prev: any) => {
         const newItem = { ...prev[i], id: v4() }
         return [...prev, newItem]
      })
   const spacing = '25% 25% 25% 25%'
   return (
      <Container>
         <Table>
            <TableHeader>
               <TableRowHead
                  headers={headers}
                  sortFields={sortFields}
                  dispatchSort={dispatchSort}
                  colName={colName}
                  order={order}
                  columnSpacing={spacing}
               />
            </TableHeader>
            <TaskTableBody
               data={data}
               columnSpacing={spacing}
               handleRemove={handleRemove}
               handleDuplicate={handleDuplicate}
            />
         </Table>
      </Container>
   )
}

export default TaskTable
