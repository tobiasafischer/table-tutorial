import { times } from 'lodash'
import styled from 'styled-components'

type TableRowProps = {
   columnLength: number
   columnSpacing?: string
}

const TableRow = styled.tr<TableRowProps>`
   display: grid;
   grid-template-columns: ${({ columnLength, columnSpacing }) =>
      columnSpacing ? columnSpacing : times(columnLength).map(() => `${100 / columnLength}% `)};
   width: 100%;
   align-items: center;
   text-align: left;
   padding: 0px 5px;
   border-radius: 3px;

   font-size: 0.875rem;
   transition: 0.2s;

   border-bottom: 1px solid #d2d6da;
`

export default TableRow
