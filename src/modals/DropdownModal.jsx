import React from 'react'
import './css/Modals.css'
import { useDispatch, useSelector } from 'react-redux'
import { setDeleteTodo } from '../redux/todosSlice'

function DropdownModal({ todoId, status }) {
  const dispatch = useDispatch()
  let dropdownText = []
  const COMMON_DROPDOWN_TEXT = ["Add label", "Add drawing", "Show checkboxes", "Version history"]
  let modalClassName = "modalClassName"
  const todoDetailHeights = useSelector((state) => state.todo.todoDetailHeight)
  const todoDetailHeight = todoDetailHeights[todoId] || 0
  const createTodoHeight = useSelector((state) => state.todo.createTodoHeight)

console.log(createTodoHeight);
  const HEIGHT_THRESHOLD = 400
  switch (status) {
    case "create":
      dropdownText = COMMON_DROPDOWN_TEXT
      modalClassName += " modalClassName__create"
      if(createTodoHeight>HEIGHT_THRESHOLD){
        modalClassName += " modalClassName__create-top"
      }else{
         modalClassName += " modalClassName__create-bottom"
      }
      break
    case "note":
      dropdownText = ["Delete note", "Add label", "Add drawing", "Make a copy", "Show checkboxes", "Copy to Google Docs", "Version history"]
      if(todoDetailHeight>HEIGHT_THRESHOLD){
        modalClassName += " modalClassName__note-top"
      }else{
         modalClassName += " modalClassName__note-bottom"
      }
      break
    case "todo":
      dropdownText =["Delete note", "Add label", "Add drawing", "Make a copy", "Show checkboxes", "Copy to Google Docs", "Version history"]
      modalClassName += " modalClassName__todo"
      break
    case "setting":
      dropdownText = ["Settings", "Enable dark theme", "Send feedback", "Help", "Application downloads", "Keyboard shortcuts"]
      modalClassName += " modalClassName__setting"
      break
  }

  const handleAction = (dispatch, itemText, todoId) => {
    switch (itemText) {
      case "Delete note":
        dispatch(setDeleteTodo(todoId))
        break;
    }
  }

  return (
    <div className={modalClassName}>
      {
        dropdownText.map((itemText,index) => (
          <button key={index} onClick={() => handleAction(dispatch, itemText, index)} className='dropdownModal__item'><p className='dropdownModal__text'> {itemText} </p></button>
        ))
      }
    </div>
  )
}

export default DropdownModal