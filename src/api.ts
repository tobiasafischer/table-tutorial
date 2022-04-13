import { v4 } from 'uuid'

export type TableDataType = {
   summary: string
  
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
        
      },
      {
         id: v4(),
         summary: 'another summary',
       
      },
      {
         id: v4(),
         summary: 'ssummary',
         
      },
      {
         id: v4(),
         summary: 'sum',
        
      },
      {
         id: v4(),
         summary: 'yrammus',
        
      },
      {
         id: v4(),
         summary: 'ss',
    
      },
      {
         id: v4(),
         summary: 'z',
     
      },
   ],
}
