import { Route, Routes } from 'react-router-dom'
import './App.css'
import HeaderLayout from './components/HeaderLayout/HeaderLayout'
import Slide from './components/SlideLayout/Slide'
import HomePage from './pages/HomePage'
import RemindersPage from './pages/RemindersPage'
import ArchivePage from './pages/ArchivePage'
import TrashPage from './pages/TrashPage'
import LabelPage from './pages/LabelPage'
import EditLabel from './components/SlideLayout/component/EditLabelModal'
import { useSelector } from 'react-redux'
import SearchPage from './pages/SearchPage'
import Note from './pages/Note'


function App() {
  const labelModal = useSelector((state) => state.labelModal.isLabelModal)
  const isSlideModal = useSelector((state) => state.header.isSlideModal);
  const selectedTodoId = useSelector((state) => state.todo.selectedTodoId)
  const todos = useSelector((state) => state.todo.todos)
  const selectedTodo=todos.find((todo)=>todo.id===selectedTodoId)
const isOpenTodoModal=selectedTodoId!==null 
  return (
    <div>
   {
    isOpenTodoModal?<Note todo={selectedTodo} />:null
   }
      {
        labelModal ?
          <div className='create-label-modal'>
            <EditLabel />
          </div> : null
      }
      <div className='headerSection'>
        <HeaderLayout />
      </div>

      <div className='mainSection'>
        <div className='slideSection' data-menu-open={isSlideModal}>
          <Slide />
        </div>
        
          <div className='homeSection'>
           <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/reminders' element={<RemindersPage />} />
            <Route path='/label' element={<LabelPage />} />
            <Route path='/archive' element={<ArchivePage />} />
            <Route path='/trash' element={<TrashPage />} />
          </Routes>
            
              
            </div>
        
      </div>
    </div>


  )
}

export default App
