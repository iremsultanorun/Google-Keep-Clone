import React from 'react'
import "./../css/Header.css"
import HeaderBranding from './HeaderBranding'
import Search from './Search'
import HeaderControls from './HeaderControls'
import SelectionBar from './SelectionBar'
function HeaderLayout() {

  return (
    <div>
      <div className='header-layout'>
        <HeaderBranding />
        <Search />
        <HeaderControls />
      </div>
      <SelectionBar />
    </div>

  )
}

export default HeaderLayout