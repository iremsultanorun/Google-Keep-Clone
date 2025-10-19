import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLogoNames, setActiveLogo, setIsCollapsed } from '../../redux/headerSlice';
import { Link } from 'react-router-dom';

import noteIcon from "./../../assets/slide-icon/note-icon.svg"
import reminderIcon from "./../../assets/slide-icon/reminder-icon.svg"
import labelSlideIcon from "./../../assets/slide-icon/label-slide-icon.svg"
import editLabelsIcon from "./../../assets/slide-icon/edit-labels-icon.svg"
import archiveIcon from "./../../assets/slide-icon/archive-icon.svg"
import trashIcon from "./../../assets/slide-icon/trash-icon.svg"
import "./Slide.css"
import { setLabelModal } from '../../redux/labelModalSlice';

function Slide() {
  const dispatch = useDispatch()
  const isCollapsed = useSelector((state) => state.header.isCollapsed);
  const logoNames = useSelector((state) => state.header.logoNames);
  const labels=useSelector((state)=>state.labelModal.labelList)
  let [active, setActive] = useState("Notes");
  let [isFixed, setIsfixed] = useState(false);
  const logoNameArr = [
    {
      icon: noteIcon,
      name: "Notes",
      path: "/"
    },
    {
      icon: reminderIcon,
      name: "Reminders",
      path: "/reminders"
    },
    {
      icon: editLabelsIcon,
      name: "Edit labels",

    
    },
    {
      icon: archiveIcon,
      name: "Archive",
      path: "/archive",
    },
    {
      icon: trashIcon,
      name: "Trash",
      path: "/trash",
    }
  ];

  useEffect(() => {
    const newLogoNameArr = logoNameArr.map(item => {
      if (item.name === "Edit labels") {
          return {...item,labels: labels }; 
      }
      return item;
  });
    dispatch(setLogoNames(newLogoNameArr))
  }, [dispatch,labels])

  function overFunc() {
    if (isCollapsed == false) {
      setTimeout(() => {
        dispatch(setIsCollapsed(true))
        setIsfixed(true)
      }, 1000)
    }
  }

  function outFunc() {
    if (isCollapsed == true) {
      dispatch(setIsCollapsed(false));
      setIsfixed(false);
    }
  }

  const handleClick = (name) => {
    dispatch(setActiveLogo(name))
    setActive(name)
  }

  return (
    <div className='slide'
      onMouseOver={!isCollapsed && !isFixed ? overFunc : null}
      onMouseOut={isFixed ? outFunc : null}
      style={{
        width: isCollapsed ? "280px" : "70px",
        padding: isCollapsed ? "15px 0 0 0" : "15px 0 0 11px",
        position: isFixed ? "fixed" : "static",
        zIndex: isFixed ? "10" : "10",
        boxShadow: isFixed ? ".5px 0px 10px gray" : "none"
      }}
    >
      <div>
        {
          logoNames.map((logoname, id) => {
            const itemClass = active == logoname.name ? "slide__item active" : "slide__item"
            const itemAClass = active == logoname.name ? isCollapsed ? "slide__item" : "slide__item sm-active" : "slide__item"

            return (
              <div key={id}>
                {
                  logoname.path ?
                    <Link
                      onClick={() => handleClick(logoname.name)}
                      style={{ fontSize: "20px" }}
                      to={logoname.path}
                    >
                      <button
                        className={isCollapsed ? itemClass : itemAClass}
                        style={{
                          borderRadius: isCollapsed ? "0 30px 30px 0" : "50%",
                          width: isCollapsed ? "100%" : "50px",
                          justifyContent: isCollapsed ? "flex-start" : "center"
                        }}
                      >
                        <img
                          className='slideItem__icon'
                          src={logoname.icon}
                          alt=""
                          style={{ paddingLeft: isCollapsed ? "8.5px" : "0" }}
                        />
                        <h4
                          style={{ display: isCollapsed ? "block" : "none" }}
                          className='slide__title'
                        >
                          {logoname.name}
                        </h4>
                      </button>
                    </Link>
                    :
                    <button
                      style={{
                        borderRadius: isCollapsed ? "0 30px 30px 0" : "50%",
                        width: isCollapsed ? "100%" : "50px",
                        justifyContent: isCollapsed ? "flex-start" : "center"
                      }}
                      className={isCollapsed ? itemClass : itemAClass}
                      onClick={() => {
                        handleClick(logoname.name)
                        dispatch(setLabelModal(true))
                      }
                            
                      }
                    >
                      <img
                        style={{ paddingLeft: isCollapsed ? "8.5px" : "0px" }}
                        className='slideItem__icon'
                        src={logoname.icon}
                        alt=""
                      />
                      <h4
                        style={{ display: isCollapsed ? "block" : "none" }}
                        className='slide__title'
                      >
                        {logoname.name}
                      </h4>
                    </button>
                }

                {
                  logoname.labels &&
                  logoname.labels.map((label, labelId) => {
                    const itemLClass = active == label.name ? "slide__item active" : "slide__item"
                    const itemLAClass = active == label.name ? isCollapsed ? "slide__item" : "slide__item sm-active" : "slide__item"

                    return (
                      <Link
                        key={labelId}
                        onClick={
                          () => handleClick(label.name)
                          }
                        style={{ fontSize: "20px" }}
                        to={label.path}
                      >
                        <button
                          className={isCollapsed ? itemLClass : itemLAClass}
                          style={{
                            borderRadius: isCollapsed ? "0 30px 30px 0" : "50%",
                            width: isCollapsed ? "100%" : "50px",
                            justifyContent: isCollapsed ? "flex-start" : "center"
                          }}
                        >
                          <img
                            className='slideItem__icon'
                            src={label.labelIcon}
                            alt=""
                            style={{ paddingLeft: isCollapsed ? "8.5px" : "0" }}
                          />
                          <h4
                            style={{ display: isCollapsed ? "block" : "none" }}
                            className='slide__title'
                          >
                            {label.name}
                          </h4>
                        </button>
                      </Link>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>

      <div className='slide__footer' style={{ display: isCollapsed ? "block" : "none" }}>
        <p className='slide__footer-text'>Open source licanses</p>
      </div>
    </div>
  )
}

export default Slide