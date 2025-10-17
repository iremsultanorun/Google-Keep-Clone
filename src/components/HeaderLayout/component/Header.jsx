import React from 'react'
import keepIcon from "./../../../assets/keep-icon.png"
import { useDispatch, useSelector } from 'react-redux'
import "../css/Header.css"
import { setIsCollapsed} from '../../../redux/headerSlice'
function Header() {
const isCollapsed=useSelector((state)=>state.header.isCollapsed)
const dispatch=useDispatch()
    const activeLogo = useSelector((state) => state.header.activeLogo)

   function slideModalFunc(){
    if(isCollapsed==false){
        dispatch(setIsCollapsed(true))
        console.log("açık");
    }
    if(isCollapsed==true){
        dispatch(setIsCollapsed(false))
        console.log("kapalı");
    }
   }


    return (

        <div className='header__logo-wrapper' >
            <button className='btn md-btn' data-tooltip-text="Main menu" onClick={slideModalFunc}>
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