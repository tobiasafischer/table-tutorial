import React from 'react'
import styled from 'styled-components'
import { TableRowHeadProps } from '../Table'

const StyledButton = styled.button<{ active: boolean }>`
   display: flex;
   flex-direction: column;
   justify-content: center;
   border: none;
   background-color: transparent;
   height: 20px;
   p {
      font-size: 10px;
      color: #c5c5c5;
      font-weight: 600;
   }

   ${({ active }) =>
      active &&
      `
   p {
      &:first-child {
         margin-bottom: -10px;
      }
   }
   `}

   &:hover {
      cursor: pointer;
      #icon {
         color: #333333;
      }
   }
`

type UpDownButtonProps = Pick<TableRowHeadProps, 'order' | 'colName'> & {
   handleClickSort: () => void
   name: string
}

const UpDownButton: React.FC<UpDownButtonProps> = ({ order, colName, name, handleClickSort }) => {
   return (
      <StyledButton type="button" onClick={handleClickSort} active={colName !== name}>
         {colName === name && order === 'up' && <p>up</p>}
         {colName === name && order === 'down' && <p>down</p>}
         {colName !== name && (
            <>
               <p>up</p>
               <p>down</p>
            </>
         )}
      </StyledButton>
   )
}

export default UpDownButton
