import { Route, Routes } from 'react-router-dom'
import './App.css'

import Slide from './components/SlideLayout/components/Slide'
import HomePage from './pages/HomePage'
import RemindersPage from './pages/RemindersPage'
import ArchivePage from './pages/ArchivePage'
import TrashPage from './pages/TrashPage'
import LabelPage from './pages/LabelPage'
import EditLabel from './components/SlideLayout/components/EditLabelModal'
import { useSelector } from 'react-redux'
import SearchPage from './pages/SearchPage'
import TodoDetail from './pages/TodoDetail'
import HeaderLayout from './components/HeaderLayout/components/HeaderLayout'


function App() {
  const isEditLabelModal = useSelector((state) => state.labelModal.isEditLabelModal)
  const isSlideModal = useSelector((state) => state.header.isSlideModal);
  const selectedTodoId = useSelector((state) => state.todo.selectedTodoId)
  const todos = useSelector((state) => state.todo.todos)
  const archiveTodos = useSelector((state) => state.todo.archiveTodos)
  const trashTodos = useSelector((state) => state.todo.trashTodos)
  const ALLNOTES = [
    ...todos,
    ...archiveTodos,
    ...trashTodos
  ]
  const selectedTodo = ALLNOTES.find((todo) => todo.id === selectedTodoId
  )
  const isOpenTodoModal = selectedTodoId !== null

  return (
    <div>
      {
        isOpenTodoModal && <TodoDetail todo={selectedTodo} />
      }
      {
        isEditLabelModal ?
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
            <Route path="/label/:labelName" element={<LabelPage />} />
            <Route path='/archive' element={<ArchivePage />} />
            <Route path='/trash' element={<TrashPage />} />
          </Routes>


        </div>

      </div>
    </div>


  )
}

export default App
