import { Route, Routes } from 'react-router-dom'
import './App.css'
import HeaderLayout from './components/HeaderLayout/HeaderLayout'
import Slide from './components/SlideLayout/Slide'
import HomePage from './pages/HomePage'
import RemindersPage from './pages/RemindersPage'
import ArchivePage from './pages/ArchivePage'
import TrashPage from './pages/TrashPage'



function App() {

  return (
    <div>

      <div className='headerSection'>
        <HeaderLayout />
      </div>

      <div className='mainSection'>
        <div className='slideSection'>
          <Slide />
        </div>
        <div className='homeSection'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/reminders' element={<RemindersPage />} />
            <Route path='/archive' element={<ArchivePage />} />
            <Route path='/trash' element={<TrashPage />} />
          </Routes>
        </div>
      </div>
    </div>


  )
}

export default App
