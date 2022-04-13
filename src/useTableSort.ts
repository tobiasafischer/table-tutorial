import { useEffect, useState } from 'react'

// order === direction to sort
// colName === sorted column
// need to consider diff endpoint

function useTableSort<D>(initialData: any) {
   const [order, setOrder] = useState<'up' | 'down' | ''>('up')
   const [colName, setColName] = useState<string>('')
   const [data, setData] = useState<D[]>([])

   const dispatchSort = (ord: 'up' | 'down' | '', col: string) => {
      // set order and column name state
      // trigger rerender
      setOrder(ord)
      setColName(col)
   }

   const updateData = (newData: D[]) => setData(newData)

   useEffect(() => {
      // going to be pulled from api
      setData(initialData)
   }, [])

   useEffect(() => {
      // query api w/
      // when backend all this will do is trigger a sort query
      const handleSort = () => {
         switch (colName) {
            case 'date':
               setData((d) =>
                  d.sort((a: any, b: any) => {
                     if (a.date === b.date) return 0
                     if (order === 'up') return a.date!.getTime() > b.date!.getTime() ? 1 : -1
                     return a.date!.getTime() < b.date!.getTime() ? 1 : -1
                  }),
               )
               break
            default:
               setData((d) =>
                  d.sort((a: any, b: any) => {
                     if (a[colName] === b[colName]) return 0
                     if (order === 'up') return a[colName] > b[colName] ? 1 : -1
                     return a[colName] < b[colName] ? 1 : -1
                  }),
               )
               break
         }
      }
      handleSort()
   }, [order, colName])

   return { order, colName, data, dispatchSort, updateData }
}

export default useTableSort
