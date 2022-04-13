import './styles.css'
import { TaskTable } from './components/TaskTable'
import { api } from './api'
export default function App() {
   return (
      <div className="App">
         <TaskTable api={api} />
      </div>
   )
}
