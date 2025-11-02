import React from 'react'
import keepIcon from "./../../../assets/keep-icon.png"
import { useDispatch, useSelector } from 'react-redux'
import "../css/Header.css"
import { setIsCollapsed, setSlideModal } from '../../../redux/headerSlice'
function Header() {
    const dispatch = useDispatch()
    const activeLogo = useSelector((state) => state.header.activeLogo)


    return (

        <div className='header__logo-wrapper' >
            <button className='btn md-btn' data-tooltip-text="Main menu" onClick={() => { dispatch(setIsCollapsed()), dispatch(setSlideModal()) }}>
                <i className="fa-solid fa-bars"></i>
            </button>
            <div style={{ display: "flex", alignItems: "center" }}>
                {activeLogo == "Notes" ? <img className='logo' src={keepIcon} alt="" /> : null}

                {
                    activeLogo == "Notes" ? <h3 className='header__title keep-title'> Keep </h3> : <h3 className='header__title'>  {activeLogo} </h3>
                }

            </div>
        </div>
    )
}


export default Header