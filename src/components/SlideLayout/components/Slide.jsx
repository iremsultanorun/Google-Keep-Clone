import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { setLogoNames, setActiveLogo, setIsCollapsed } from '../../../redux/headerSlice';
import { MdLabelOutline, MdLightbulbOutline } from "react-icons/md";
import { AiOutlineBell } from "react-icons/ai";
import { GoPencil } from "react-icons/go";
import "./../css/Slide.css"
import {  setEditLabelModal } from '../../../redux/labelModalSlice';
import { RiInboxArchiveLine } from 'react-icons/ri';
import { IoTrashOutline } from 'react-icons/io5';


function Slide() {

  const dispatch = useDispatch()

  const isCollapsed = useSelector((state) => state.header.isCollapsed);
  const logoNames = useSelector((state) => state.header.logoNames);
  const labels = useSelector((state) => state.labelModal.labelList)
  const [active, setActive] = useState("Notes");

  const ICONS = {
    "MdLightbulbOutline": MdLightbulbOutline,
    "AiOutlineBell": AiOutlineBell,
    "GoPencil": GoPencil,
    "RiInboxArchiveLine": RiInboxArchiveLine,
    "IoTrashOutline": IoTrashOutline,
  }
  const SLIDE_MENU_LINKS = [
    {
      icon: "MdLightbulbOutline",
      name: "Notes",
      path: "/"
    },
    {
      icon: "AiOutlineBell",
      name: "Reminders",
      path: "/reminders"
    },
    {
      icon: "GoPencil",
      name: "Edit labels",
    },
    {
      icon: "RiInboxArchiveLine",
      name: "Archive",
      path: "/archive",
    },
    {
      icon: "IoTrashOutline",
      name: "Trash",
      path: "/trash",
    }
  ];

  const MOBILE_BREAKPOINT = 500;

  useEffect(() => {
    const NEW_SLIDE_MENU_LINKS = SLIDE_MENU_LINKS.map(item => {
      if (item.name === "Edit labels") {
        return { ...item, labels: labels };
      }
      return item;
    });
    dispatch(setLogoNames(NEW_SLIDE_MENU_LINKS))
  }, [dispatch, labels])

  const onMouseOver = () => {
    if (window.innerWidth >= MOBILE_BREAKPOINT) {
      if (isCollapsed) {
        dispatch(setIsCollapsed(false));
      }
    }
  }

  const onMouseOut = () => {
    if (window.innerWidth >= MOBILE_BREAKPOINT) {
      dispatch(setIsCollapsed(true));
    }

  }

  const handleClick = (name) => {
    dispatch(setActiveLogo(name))
    setActive(name)
    if (window.innerWidth >= 500) {
      dispatch(setIsCollapsed());
    }
  }

  return (

    <div
      className=
      {`slide 
        ${isCollapsed
          ? "slide__collapsed"
          : "slide__expanded"}
        `}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <div>
        {
          logoNames &&
          logoNames.map((logoname, id) => {

            const IconComponent = ICONS[logoname.icon]

            if (!IconComponent) {
              return null;
            }

            const isActive = active === logoname.name;
            let itemClasses = 'slide__item';
if(isActive){
  if(isCollapsed){
    itemClasses += ' sm-active';
  }else{
    itemClasses += ' active';
  }
}

            return (
              <div key={id}>

                {
                  logoname.path
                    ?
                    <Link
                      onClick={() => handleClick(logoname.name)}
                      to={logoname.path}
                    >
                      <button
                        className={itemClasses +
                          (
                            isCollapsed
                              ? " slide__collapsed-item"
                              : " slide__expanded-item"
                          )}
                      >
                        <div
                          className={`slideItem__icon 
                            ${isCollapsed
                              ? "slide__collapsed-item__icon "
                              : "slide__expanded-item__icon"
                            }`}
                        >
                          <IconComponent />
                        </div>

                        <h4
                          className={`slide__title 
                            ${isCollapsed
                              ? "slide__collapsed-item__title"
                              : "slide__expanded-item__title"
                            }`}
                        >
                          {logoname.name}
                        </h4>
                      </button>
                    </Link>
                    :
                    <button
                      className={itemClasses +
                        (
                          isCollapsed
                            ? " slide__collapsed-item"
                            : " slide__expanded-item")}

                      onClick={() => {
                        handleClick(logoname.name)
                        dispatch( setEditLabelModal(true))
                      }

                      }
                    >
                      <div
                        className={`slideItem__icon 
                          ${isCollapsed
                            ? "slide__collapsed-item__icon "
                            : "slide__expanded-item__icon"
                          }`}
                      >
                        <IconComponent />
                      </div>

                      <h4
                        className={`slide__title 
                          ${isCollapsed
                            ? "slide__collapsed-item__title"
                            : "slide__expanded-item__title"}
                           `}
                      >
                        {logoname.name}
                      </h4>
                    </button>
                }

                {
                  logoname.labels &&
                  logoname.labels.map((label, labelId) => {

                    const isActive = active === label.name;
                    let itemClasses = 'slide__item';

                    if(isActive){
                      if(isCollapsed){
                        itemClasses += ' sm-active';
                      }else{
                        itemClasses += ' active';
                      }
                    }

                    return (
                   
                        <Link
                        key={labelId}
                        onClick={() => handleClick(label.name)}
                        to={`/label/${label.name}`} 
                      >
                        <button
                          className={itemClasses +
                            (
                              isCollapsed
                                ? " slide__collapsed-item"
                                : " slide__expanded-item"
                            )}
                        >
                          <div
                            className={`slideItem__icon 
                              ${isCollapsed
                                ? "slide__collapsed-item__icon "
                                : "slide__expanded-item__icon"}
                              `}
                          >
                            <MdLabelOutline />
                          </div>

                          <h4
                            className={`slide__title 
                              ${isCollapsed
                                ? "slide__collapsed-item__title"
                                : "slide__expanded-item__title"
                              }`}
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

      <div className={`slide__footer
      ${isCollapsed
          ? "slide__collapsed-footer"
          : "slide__expanded-footer"
        }`}>
        <p className='slide__footer-text'>
          Open source licanses
        </p>
      </div>
    </div >
  )
}

export default Slide