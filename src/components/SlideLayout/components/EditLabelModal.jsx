import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "./../css/EditLabelModal.css"
import labelSlideIcon from "./../../../assets/slide-icon/label-slide-icon.svg"
import { addLabelList, setEditLabelModal, setLabelName, deleteLabel, updateLabel } from '../../../redux/labelModalSlice';
import { IoCheckmark } from 'react-icons/io5';
import { CgClose } from 'react-icons/cg';
import { GoPlus } from 'react-icons/go';
import { MdDelete, MdEdit, MdLabel } from 'react-icons/md';

function EditLabel() {

  const labelName = useSelector((state) => state.labelModal.labelName)
  const labelList = useSelector((state) => state.labelModal.labelList)

  const [isDeleteIcon, setIsDeleteIcon] = useState(null);
  const [isCreateInput, setIsCreateInput] = useState(true);
  const [editingName, setEditingName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const dispatch = useDispatch()
  const createLabelInputRef = useRef()

  const newLabel = {
    id: Date.now(),
    labelIcon: labelSlideIcon,
    name: labelName,
    path: `/label/${labelName}`,
  }

  const addNewLabel = () => {
    const trimmedName = labelName.trim()
    
    if (trimmedName === "") {
      alert("Please enter a label name.")
      return;
    }
    
    const isDuplicate = labelList.some(label => label.name.toLowerCase() === trimmedName.toLowerCase())
    if (isDuplicate) {
      alert("A label with this name already exists!")
      createLabelInputRef.current.value = "";
      return;
    }
    
    dispatch(addLabelList(newLabel));
    createLabelInputRef.current.value = "";
  }

  const startEdit = (label) => {
    setEditingId(label.id);
    setEditingName(label.name);
  }

  const saveEdit = () => {
    const isDuplicate = labelList.some(label => 
      (label.name.toLowerCase() === editingName.trim().toLowerCase()) && (label.id !== editingId)
    )

    if (isDuplicate) {
      alert("A label with this name already exists!")
      return;
    }
    
    if (editingName.trim() === "") {
      alert("Please enter a label name.")
      return;
    }
    
    dispatch(updateLabel({ id: editingId, newLabelName: editingName.trim() }));
    setEditingId(null);
  }

  const visibleDeleteIcon = (id) => setIsDeleteIcon(id)
  const hiddenDeleteIcon = () => setIsDeleteIcon(null)

  const deleteLabelById = (labelId) => dispatch(deleteLabel(labelId))

  return (
    <div className='label-editor'>
      <div className="label-editor__content">
        <h4 className='label-editor__title'>Edit labels</h4>
        <div className='label-editor__wrapper label-editor__create-wrapper'>
          {/* create label */}
          <div className='label-editor__input-group'>
            <button className='label-editor__control-btn btn sm-btn' onClick={() => setIsCreateInput(!isCreateInput)}>
              {
                isCreateInput ?
                  <CgClose /> :
                  <GoPlus />
              }
            </button>
            {
              isCreateInput ? <input
                type="text"
                className='label-editor__input'
                ref={createLabelInputRef}
                placeholder='Create new label'
                onChange={(e) => {
                  dispatch(setLabelName(e.target.value))
                }}
              /> : null
            }
          </div>
          {
            isCreateInput ? <button
              className='label-editor__add-btn btn sm-btn'
              onClick={addNewLabel}>
              <IoCheckmark />
            </button> : null
          }
        </div>
        {/* label list */}
        <div className='label-editor__list-wrapper '>
          {
            labelList.map((label) => {
              const isEditing = label.id === editingId;
              return (
                <div
                  className='label-editor__list-item label-editor__wrapper'
                  onMouseEnter={() => visibleDeleteIcon(label.id)}
                  onMouseLeave={() => hiddenDeleteIcon()}
                  key={label.id}
                >
                  <div className="label-editor__input-group">
                    {
                      (label.id === isDeleteIcon && !isEditing) ?
                        <button
                          data-tooltip-text="Delete label"
                          className='label-editor__add-btn btn sm-btn' 
                          onClick={() => deleteLabelById(label.id)}>
                          <MdDelete />
                        </button>
                        : <MdLabel />
                    }
                    {isEditing ? (
                      <input
                        type="text"
                        className='edit-input'
                        onChange={(e) => setEditingName(e.target.value)}
                        value={editingName}
                        autoFocus
                      />
                    ) : (
                      <p className='edit-text'>{label.name}</p>
                    )}
                  </div>
                  
                  {isEditing ? (
                    <button
                      data-tooltip-text="Save changes"
                      className='label-editor__add-btn btn sm-btn'
                      onClick={saveEdit}>
                      <IoCheckmark />
                    </button>
                  ) : (
                    <button
                      data-tooltip-text="Rename label"
                      className='label-editor__add-btn btn sm-btn' 
                      onClick={() => startEdit(label)}>
                      <MdEdit />
                    </button>
                  )}
                </div>
              );
            })
          }
        </div>
      </div>
      <hr />
      <div className='label-editor__comleted-btn-wrapper'>
        <button className='label-editor__comleted-btn lg-btn'
          onClick={() => dispatch(setEditLabelModal(false))}
        >Done</button>
      </div>
    </div >
  )
}

export default EditLabel