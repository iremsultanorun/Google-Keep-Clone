import React, { useState } from 'react'
import './css/Modals.css'
import { MdOutlineFormatColorReset } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { resetAllBgColor, resetBgColor, setAllBgColor, setBgColor } from '../redux/todosSlice';
function TodoBgModal({ todoId, status }) {
  const COLOR_PALAETTE = ["#FAAFA9", "#F39F76", "#FFF8B8", "#E2F6D3", "#D4E4ED", "#AECCDC", "#D3BFDB", "#F6E2DD", "#E9E3D4", "#EFEFF1"]
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todo.todos)

  let todoBgColor;
  if (status === "selected") {
    const selectedTodos = todos.filter(t => t.selected);
    
    if (selectedTodos.length === 0) {
        todoBgColor = "white";
    } else {
        const firstColor = selectedTodos[0].bgColor;

        const allSameColor = selectedTodos.every(t => t.bgColor === firstColor);
        if (allSameColor) {
            todoBgColor = firstColor;
        } else {
            todoBgColor = null; 
        }
    }
} else {
    todoBgColor = todos.find((todo) => todo.id === todoId)?.bgColor || "white";
}

  const [hoverColor, setHoverColor] = useState(null)

  const handleMouseEnter = (color) => setHoverColor(color)
  const handleMouseLeave = () => setHoverColor(null)
  const selectedBorder = "#A142F4"
  const isResetSelected = todoBgColor === "white"
  const resetDefaultColor = "gray"
  const resetBorderColor =
    isResetSelected
      ? selectedBorder
      : (hoverColor === "gray" ? "black" : resetDefaultColor)
      const handleClickSetBgColor=(color)=>{
        if(status==="selected"){
            dispatch(setAllBgColor({color:color}))
        }else{
              dispatch(setBgColor({ id: todoId, color: color, status: status }))
        }
     }
      const handleClickResetBgColor=()=>{
        if(status==="selected"){
            dispatch(resetAllBgColor())
        }else{
          dispatch(resetBgColor())
        }
     }
  return (
    <div className={'bg-modal '}>
      <div className="bg-color">
        <div className="bg-color-modal">
          <button
            className={'btn color-btn non-selected ' + (isResetSelected ? "selected" : "white")}
            onClick={handleClickResetBgColor }
            onMouseEnter={() => handleMouseEnter("gray")}
            onMouseLeave={handleMouseLeave}
            style={{ borderColor: resetBorderColor }}
          >
            <MdOutlineFormatColorReset />
          </button>
          {
            COLOR_PALAETTE.map((color, id) => {
              const isSelected = todoBgColor === color;
              let currentBorderColor;
              if (isSelected) {
                currentBorderColor = selectedBorder;
              }
              else if (hoverColor === color) {

                currentBorderColor = "black";

              } else {
                currentBorderColor = color;
              }
              return (
                <button key={id}
                  onClick={()=>handleClickSetBgColor(color)}
                  className={"btn color-btn " + (todoBgColor == color ? "selected" : null)}
                  style={{ background: color, borderColor: currentBorderColor }}
                  onMouseEnter={() => handleMouseEnter(color)}
                  onMouseLeave={handleMouseLeave}
                >

                </button>
              )
            })
          }
        </div>


      </div>

    </div>
  )
}

export default TodoBgModal