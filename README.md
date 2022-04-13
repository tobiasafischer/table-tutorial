DOCUMENTATION I WROTE FOR DUBSADO

# Table

During our simplification process of components in our component library, we have found some pretty clever ways to handle some of the more heavy components. This will be a walkthrough on what the table does, how to implement it, and any other additional info

Bear with me on this code example, I don’t have access to my regular icons so just use your imagination ✨ [https://codesandbox.io/s/inspiring-heisenberg-o2hqs?file=/src/api.ts](https://codesandbox.io/s/inspiring-heisenberg-o2hqs?file=/src/api.ts)


So for table we got a few components to build it out RREEEEALLLLLL easy,

the simple outline of the jsx for a table is as follow

```tsx
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
  <TableBody>
     <TableData>Data</TableData>
  </TableBody>
</Table>
```

ok sick! now let’s hop into the props

SO, I got a little fancy when designing the table row head and we got some killer props to make your life soooo easy

| headers | array of strings to indicate what columns are to be displayed, empty string means blank column (use this for like icons) ORDER MATTERS |
| --- | --- |
| sortFields | array of strings directly corresponding to headers to determine which of the headers will be sortable i.e. headers = [’1’, ‘2’, ‘3’] sort = [’1’, ‘2’] 3 won’t be sortable |
| dispatchSort | this is from useTableSort() see hooks for code |
| colName | ^ |
| order | ^ |
| column spacing | this is a super cool string to let you determine the layout of the columns for instance
const spacing = '5% 50% 15% 15% 10% 2% 2%’
each % corresponds to a column |

awesome! now that we got that out of the way let’s run through an example!

Lets start out with a simple api with the types and data of 

```tsx
import { v4 } from 'uuid'

export type TableDataType = {
   summary: string
   project: string
   assignee: string
   due: Date
   id: any
}

type ApiType = {
   data: TableDataType[]
}

export const api: ApiType = {
   data: [
      {
         id: v4(),
         summary: 'summary1',
         project: 'pro123',
         assignee: 'assi123ee',
         due: new Date(),
      },
      {
         id: v4(),
         summary: 'another summary',
         project: 'fsdf',
         assignee: 'assignee',
         due: new Date(),
      },
      {
         id: v4(),
         summary: 'ssummary',
         project: 'prooj',
         assignee: 'assignee',
         due: new Date(),
      },
      {
         id: v4(),
         summary: 'sum',
         project: 'a proejcct',
         assignee: 'asrteetrsignee',
         due: new Date('11 21 2000'),
      },
      {
         id: v4(),
         summary: 'yrammus',
         project: 'this is a proj',
         assignee: 'atressignee',
         due: new Date('1 12 2002'),
      },
      {
         id: v4(),
         summary: 'ss',
         project: 'pp',
         assignee: 'assigneeee',
         due: new Date(),
      },
      {
         id: v4(),
         summary: 'z',
         project: '123123',
         assignee: 'qweassig',
         due: new Date(),
      },
   ],
}
```

Pretty simple right!, when we structure our data, the name is our headers, and the value is the values of those headers so make sure you’re settings those appropriately

Cool! so let’s set up our top level file

```tsx
import React from 'react'
import { v4 } from 'uuid'
import useTableSort from '../../useTableSort'
import { Table, TableHeader, TableRowHead } from '../Table'
import { Container } from './TaskTable.styled'
import TaskTableBody from './TaskTableBody'

type Props = {
   api: any
}

const TaskTable: React.FC<Props> = ({ api }) => {
   const { order, colName, data, dispatchSort, updateData } = useTableSort(api.data)
   const headers = ['', ...Object.keys(api.data[0]).splice(1), '', '']
   const sortFields = Object.keys(api.data[0]).splice(1)

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
            />
         </Table>
      </Container>
   )
}

export default TaskTable
```

OK DON’T WORRY ! I know this legit makes no sense so let’s break it down. So initially, lets declare our hook that ties into table very nicely by passing in our [api.data](http://api.data) which the is array of data objects


```tsx
const { order, colName, data, dispatchSort, updateData } = useTableSort(api.data)

// order is just used for sorting
// colName is just used for sorting
// dispatchSort is the function which handles sorting
// data is an array of our data objects
// updateData is our setState function
```

Awesome! Let’s move onto the header functionality. For this example of a task table, I would like to have a button before each row to be able to complete the task, and two at the end to be able to duplicate and remove a row.

```tsx
// the key of our data object acts as our headers for the table
// since we want to have extra columns for our buttons, we want to input empty 
// strings to make space for it, notice as well we are splicing the array
// from the first index to account for our id (bc lets not display that lol)
const headers = ['', ...Object.keys(api.data[0]).splice(1), '', '']
// because we want to sort by each of our headers, our sortFields will hold the
// same as our headers WITHOUT the extra spaces because we would rather not
// sort by buttons LOL
const sortFields = Object.keys(api.data[0]).splice(1)
```

```tsx
<Container>
   <Table>
      <TableHeader>
         <TableRowHead
            headers={headers}
            sortFields={sortFields}
            dispatchSort={dispatchSort}
            colName={colName}
            order={order}
         />
      </TableHeader>
      <TaskTableBody
         data={data}
      />
   </Table>
</Container>
```

notice that we want to wrap our table in the table component, directly followed by our header which holds the header row this takes in our header array, array of fields we want to be sorted, and then the items returned from our hook (we are putting our TableRowHead here bc there is only going to be one row for our header obvi)


this is immediately followed by our task table body which holds the array of objects returned from our hook

not too shabby right? let’s move onto the header functionality!

so btw, when you are implementing this i already got u covered and all you have to do is declare the headers as above and i'll take care of you <3 but let's see how this absolutely genius perfect 10000 iq code works


```tsx
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
            key={`${head}${i}`} // this is really just for the "" we place
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
```

Okay let’s peel back the curtains on this operation


So initially, we are wrapping our component with a TableRow which is basically just a formatting container shown here 

```tsx
import { times } from 'lodash'
import styled from 'styled-components'

// dont worry about this rn lol
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
```

```tsx
 <TableRow columnLength={headers.length} columnSpacing={columnSpacing}>
```

so with our TableRow, we are passing in the length of the headers (this is determining the spacing of our columns so we aren’t squished >.<, and then our column spacing which I discussed a little bit above ^ but we will get more in depth in a sec trust trust trussstttt

OK SICK let’s start mapping our headers, 

```tsx
{headers.map((head, i) => (
   <TableHead
      key={`${head}${i}`} // really just for our duplicate ""
      hasButton={sortFields.includes(head)}
      dispatchSort={dispatchSort}
      colName={colName}
      order={order}
   >
      {head}
   </TableHead>
))}
```

SO let’s remember that our headers is an array of strings so you guessed it, our head variable is just a string lol. So, we are familiar with the additional props onto TableHead from our hook, but we have this special fella called hasButton. This is legit just asking if our header has a sort button declared by seeing if the header is present inside of our sortFields array previously discussed.

Ok so simple right?! Let’s finish off strong with TableHead

```tsx
import React from 'react'
import styled from 'styled-components'
import { UpDownButton } from '.' // this is just our button for sorting
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
```

shh shh shh i know i know, what the h-e-double hockey sticks is this tobias? I promise it’s super simple, remember, our children is just our string, so we are going to put it inside of our TableHeader container which as you can see is just a styled TH tag, basic stuff. But you see this UpDownButton (very descriptive i know)  which is determined to render if the button is required discussed in the previous component as well as passing in our props from the hook. 

“Ok but what is handleClickSort?” I AM GETTING TO THAT BE PATIENT GEEZ

Lets break down handleClickSort rq, so with our hook, we are giving colName which is a string which contains the string of the currently active header, so if our children string lines up with with the current active we need to then have a boolean swap right ? 

Let’s say our functionality we want is a default display of up and down sorters, then once clicked for the first time, we want to sort in ascending order, then on the next press we want descending order. 

So if our order is up and the button is already active, then we want it to be order of down and then passing in our active header for determining the state of the button.

So after that mess of an explanation, lets dig into this button

```tsx
import React from 'react'
import styled from 'styled-components'
import { TableRowHeadProps } from '../Table'

// so that little active fella is so that when our top / down button
// is being displayed, we want to offset it so its aligned with the header
// title instead of its default position with the other button
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
```

So this is pretty self explanatory, or this fever dream of code only makes sense to me, but let’s just assume its clear lol. The only weird thing is those conditional statement, but really all it is saying is

1. am I active
2. if i am active is my order up 
3. if up display only “up”
4. if i am active is my order down
5. if down display only “down”
6. if I am not active or somehow you managed to inject code into my hook, lets display both as a default state

AWESOME NOW WE HAVE WORKING HEADERS CONGRATS 🥳 ✨

let’s move onto our body now

so remember that this is how we are setting it up in our top level

```tsx
<TaskTableBody
   data={data}
/>
```

so this is what our TaskTableBody is ‘gun look like

```tsx
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

const TaskTableBody: React.FC<Props> = ({ data, columnSpacing, handleRemove, handleDuplicate }) =>
	(
	  <TableBody>
	     {data.map((row, i) => (
	        <TableRow
	           key={row.id}
	           columnLength={Object.entries(row).length || 0}
	           columnSpacing={columnSpacing}
	        >
	           <TableData>
	              <Button onClick={() => handleRemove(row.id)}>check</Button>
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
```

ok i promise i know what i am doing this code is just a little bit on first glance, but its pretty simple. Let’s break it into pieces.

```tsx
	  <TableBody>
```

Lets wrap our body is our TableBody component which is a highly complex component that is very hard to understand but trust me it works, you don’t need to understand 

```tsx
export const TableBody = styled.tbody`
   width: 100%;
`
```

I know what you’re thinking: “WHAT IS THIS WIZARDRY?!” don’t worry ab it, it’s some big brain stuff

OKAY let’s map it out

```tsx
{data.map((row, i) => (

// remember, data is just our array of data objects, so each row
// is going to be our data object (we want that index too)
```

now let’s put this bad boy into our TableRow which we know from our TableRowHeadComponent

```tsx
<TableRow
   key={row.id}
   columnLength={Object.entries(row).length || 0}
   columnSpacing={columnSpacing}
>
```

SO for our TableData,

```tsx
import styled from 'styled-components'

const TableData = styled.td`
   text-align: left;
   font-size: 14px;
   padding: 8px;
   color: #292e35;

   height: 41px;
   display: flex;
   align-items: center;
   td {
      font-size: 0.75rem;
      line-height: 22px;
      color: #4b5562;
   }
`

export default TableData
```

It is just a container for our string / date / number / button / ANYTHING which is great so we can add our buttons as previously discussed, so remember our headers look like this

```tsx
"", ...headers, "", ""
```

so let’s try to reflect that in our data.

```tsx
// ""
<TableData>
	 {/* important for later, but we are passing in the id to handleRemove */}
   <Button onClick={() => handleRemove(row.id)}>check</Button>
</TableData>

// ...headers
{Object.values(row)
   .slice(1)
   .map((item: any) => (
      <TableData key={item}>
         {item instanceof Date ? item.toLocaleDateString() : item}
      </TableData>
   ))}

// ""
<TableData>
	 {/* important for later, but we are passing the row index to handleDuplicate */}
   <Button onClick={() => handleDuplicate(i)}>duplicate</Button>
</TableData>
// ""
<TableData>
	 {/* important for later, we are passing in the id to handleRemove */}
   <Button onClick={() => handleRemove(row.id)}>remove</Button>
</TableData>
```

SIMPLE RIGHT ?! and this is super customizable for legit anything you would want to fit into a td for whatever reason (i know some workarounds are painful, i’m with you in this struggle)


so, we will get into those functions in a sec but let’s go into the mapping rq

```tsx
{Object.values(row)
   .slice(1) // bye bye id
   .map((item: any) => (
      <TableData key={item}> key is our item because we are l a z y
				 {/* 
					aight this is weird but basically our date object if not
					converted into a string will give us an error of "react can't
					take an object as a child blah blah blah wah wah *throws tantrum*"
					so lets say if it's an instance of date we'll convert it to a string,
					if it's just a number or string we can just display that directly so
					it's chill
				 */}
         {item instanceof Date ? item.toLocaleDateString() : item}
      </TableData>
   ))}
```

okie dokie we have a table that displays wooo congrats !!!!!! but the spacing is a little weird and cluttered, let’s try to fix that. We are going to pop up to our top level again and get that handled.

```tsx
const spacing = '10% 30% 15% 15% 10% 10% 10%'
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
                columnSpacing={spacing} // look wowsers omg
             />
          </TableHeader>
          <TaskTableBody
             data={data}
             columnSpacing={spacing} // look wow omg
          />
       </Table>
    </Container>
 )
```

so let’s remember we got 7 headers with 3 of them being buttons. So lets audit our data to see its length needs.

```tsx
// this won't be displayed so who cares
id: v4()
// summary will be pretty long because it will be potentially multiple words
// so lets dedicate most of our spacing here
summary: 'summary1',
// a project name will be about mediumish size so lets dedicate some space to it
project: 'pro123',
// an assignee is really just going to be a name, it could be decently long
// but not too long so it'll probably be the same as project
assignee: 'assi123ee',
// date is going to be just a mm/dd/yyyy so it won't need to be very large at all
due: new Date(),

// our buttons are small (will be smaller with actual icons but we 
// are going to use strings for now so lets just say its same size as date)
      
```

so with all that being said let’s do this: 

```tsx
// 1st % is individual, the second = is the total so far
date, buttons = 10% * 4 = 40%
summary = 30% + 40% = 70%
project, assignee = 15% * 2 = 30% + 70% = 100%
```

Cool! we did our math correctly and landed at 100%! This serves two purposes: 

1. lets us organize our spacing by needs of sizes
2. makes our table semi-responsive list

this gives us

```tsx
const spacing = '10% 30% 15% 15% 10% 10% 10%'
```

which when inputted into our components turns our jsx into

```tsx
<Container>
 <Table>
    <TableHeader>
       <TableRowHead
          headers={headers}
          sortFields={sortFields}
          dispatchSort={dispatchSort}
          colName={colName}
          order={order}
          columnSpacing={spacing} // look wowsers omg
       />
    </TableHeader>
    <TaskTableBody
       data={data}
       columnSpacing={spacing} // look wow omg
    />
 </Table>
</Container>
```

now that we have all of our presentational components fulfilled, lets flesh out that duplication and remove functionality

```tsx
const handleRemove = (id: any) => updateData(data.filter((item: any) => item.id !== id))
```

alrighty, lets utilize that nifty updateData function provided by our hook to manipulate our data array by filtering out the row id and returning the array without that item

SUPER EASY RIGHT ?! you’re ready to pass a google code test trust

alright so this next one is a little more complex but i promise it’s actually mad easy

```tsx
const handleDuplicate = (i: number) =>
			// this function is taken from our hook
			// lets duplicate the array from our functionality in
		  // setState so we aren't directly touching the array
      updateData((prev: any) => {
				 // lets isolate the row from the index being passed 
				 // back into the function from the lower levels of our component tree
				 const newItem = prev[i]
				 // since our ids need to be unique, lets replace the duplicated
				 // id with a fresh one so our keys don't get messed up (also if you
				 // see with the handleRemove, it will remove both because the id's 
				 // are identical)
         newItem.id = v4()
				 // you can return it like this or prev.push(newItem), return prev
				 // but this is a cleaner approach by destructuring the array
				 // through the spread operaor, and placing the new item at the end
         return [...prev, newItem]
      })
```

SICK now it works so lets plug it into our jsx tree for the final level being

```tsx
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

   const handleRemove = (id: any) =>
      updateData((prev) => prev.filter((item: any) => item.id !== id))

   const handleDuplicate = (i: number) =>
      updateData((prev: any) => {
         const newItem = prev[i]
         newItem.id = v4()
         return [...prev, newItem]
      })
   const spacing = '10% 30% 15% 15% 10% 10% 10%'
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
               handleRemove={handleRemove} // look 
               handleDuplicate={handleDuplicate} // look
            />
         </Table>
      </Container>
   )
}

export default TaskTable
```

cool thanks for reading!!
