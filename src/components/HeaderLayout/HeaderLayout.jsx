import React from 'react'
import Header from './component/Header'
import "./HeaderLayout.css"
import Search from './component/Search'
import HeaderControls from './component/HeaderControls'
function HeaderLayout() {
  return (
    <div className='header-layout'>
<Header/>
<Search/>
<HeaderControls/>
    </div>
  )
}

export default HeaderLayout