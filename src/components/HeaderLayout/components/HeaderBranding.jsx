import React from 'react'
import keepIcon from "./../../../assets/keep-icon.png"

import { useDispatch, useSelector } from 'react-redux'
import "../css/HeaderBranding.css"

import { setIsCollapsed, setIsSlideModal } from '../../../redux/headerSlice'

import { HiBars3 } from "react-icons/hi2";

function HeaderBranding() {

    const dispatch = useDispatch()

    const activeLogo = useSelector((state) => state.header.activeLogo)

    let className = "header__title ";

    (activeLogo == "Notes") ? className += " keep-title" : null

    const handleMenuClick = () => {
        dispatch(setIsCollapsed())
        dispatch(setIsSlideModal())
    }


    return (
        <div className='header__logo-wrapper'>
            <button
                className='btn md-btn'
                data-tooltip-text="Main menu"
                onClick={handleMenuClick}>
                <HiBars3 />
            </button>

            <div className='header__brand-info'>
                {
                    activeLogo === "Notes"
                    && <img className='logo' src={keepIcon} alt="" />
                }

                <h3 className={className}>
                    {
                        activeLogo === "Notes"
                            ? "Keep"
                            : activeLogo
                    }
                </h3>
            </div>
        </div>
    )
}

export default HeaderBranding