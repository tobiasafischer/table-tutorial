import React from 'react'
import styled from 'styled-components'
import { UpDownButton } from '.'
import { TableRowHeadProps } from '../Table'

const StyledTableHead = styled.th`
   display: flex;
   align-items: center;
   text-align: left;
   background-color: transparent;
   padding: 8px;

   font-size: 14px;
   font-weight: 400;
   line-height: 22px;
   text-transform: capitalize;
`

type TableHeadProps = Pick<TableRowHeadProps, 'order' | 'dispatchSort' | 'colName'> & {
   hasButton?: boolean
}

const TableHead: React.FC<TableHeadProps> = ({
   children,
   hasButton,
   order,
   colName,
   dispatchSort,
}) => {
   const handleClickSort = () => {
      if (children === colName && order === 'up') {
         dispatchSort(order === 'up' ? 'down' : 'up', `${children}`)
      } else dispatchSort('up', `${children}`)
   }

   return (
      <StyledTableHead>
         {children}
         {hasButton && (
            <UpDownButton
               order={order}
               handleClickSort={handleClickSort}
               name={`${children}`}
               colName={colName}
            />
         )}
      </StyledTableHead>
   )
}

export default TableHead
