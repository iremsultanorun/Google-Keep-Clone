import React from 'react'
import './css/Modals.css'
import { useDispatch, useSelector } from 'react-redux'
import { moveSelectedTodosToTrash, moveTodoToTrash } from '../redux/todosSlice'
import LabelModal from './LabelModal'
import { setLabelModal } from '../redux/labelModalSlice'

function DropdownModal({ todoId, status }) {
  const dispatch = useDispatch()
  let dropdownText = []
  const COMMON_DROPDOWN_TEXT = ["Add label", "Add drawing", "Show checkboxes", "Version history"]
  let modalClassName = "modalClassName"
  const todoDetailHeights = useSelector((state) => state.todo.todoDetailHeight)
  const todoDetailHeight = todoDetailHeights[todoId] || 0
  const createTodoHeight = useSelector((state) => state.todo.createTodoHeight)
  const isLabelModal = useSelector((state) => state.labelModal.isLabelModal)
  const HEIGHT_THRESHOLD = 400

  switch (status) {
    case "create":
      dropdownText = COMMON_DROPDOWN_TEXT
      modalClassName += " modalClassName__create"
      if (createTodoHeight > HEIGHT_THRESHOLD) {
        modalClassName += " modalClassName__create-top"
      } else {
        modalClassName += " modalClassName__create-bottom"
      }
      break
    case "todoDetail":
      dropdownText = ["Delete todo", "Add label", "Add drawing", "Make a copy", "Show checkboxes", "Copy to Google Docs", "Version history"]
      if (todoDetailHeight > HEIGHT_THRESHOLD) {
        modalClassName += " modalClassName__todoDetail-top"
      } else {
        modalClassName += " modalClassName__todoDetail-bottom"
      }
      break
    case "home":
      dropdownText = ["Delete todo", "Add label", "Add drawing", "Make a copy", "Show checkboxes", "Copy to Google Docs", "Version history"]
      modalClassName += " modalClassName__todo"
      break
    case "archive":
      dropdownText = ["Delete todo", "Add label", "Add drawing", "Make a copy", "Show checkboxes", "Copy to Google Docs", "Version history"]
      modalClassName += " modalClassName__todo"
      break
    case "setting":
      dropdownText = ["Settings", "Enable dark theme", "Send feedback", "Help", "Application downloads", "Keyboard shortcuts"]
      modalClassName += " modalClassName__setting"
      break
    case "selected":
      dropdownText = ["Delete todo", "Add label", "Make a copy", "Copy to Google Docs", "Version history"]
      modalClassName += " modalClassName__selected"
      break
  }

  const handleAction = (itemText) => {
    switch (itemText) {
      case "Delete todo":
        dispatch(moveTodoToTrash({
          transferTodoId: todoId,
          status: status
        }))
        switch (status) {
          case "selected":
            dispatch(moveSelectedTodosToTrash(status))
            break
        }
        break
      case "Add label":
        dispatch(setLabelModal(true))
    }
    console.log(status);
  }

  return (
    <div className={modalClassName}>
      {
        isLabelModal
          ? <LabelModal status={status} todoId={todoId} />
          : dropdownText.map((itemText, index) => {
            const isDisabled = itemText !== "Delete todo" && itemText !== "Add label"
            const dropdownClassName = `dropdownModal__item ${isDisabled ? 'disabled' : ''}`

            return (
              <button
                key={index}
                onClick={() => handleAction(itemText)}
                className={dropdownClassName}
                disabled={isDisabled}
              >
                <p className='dropdownModal__text'>{itemText}</p>
              </button>
            )
          })
      }
    </div>
  )
}

export default DropdownModal