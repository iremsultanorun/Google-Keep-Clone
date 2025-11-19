

import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "./../css/EditLabelModal.css"
import labelIcon from "./../../../assets/slide-icon/label-icon.svg"
import labelSlideIcon from "./../../../assets/slide-icon/label-slide-icon.svg"
import labelEditorIcon from "./../../../assets/slide-icon/label-editor-icon.svg"
import deleteLabelIcon from "./../../../assets/slide-icon/label-delete-icon.svg"
import { addLabelList, setLabelModal, setLabelName, deleteLabel, updateLabel } from '../../../redux/labelModalSlice';
import { IoCheckmark } from 'react-icons/io5';
import { CgClose } from 'react-icons/cg';
import { GoPlus } from 'react-icons/go';
function EditLabel() {

  const labelName = useSelector((state) => state.labelModal.labelName)
  const labelList = useSelector((state) => state.labelModal.labelList)

  const [isDeleteIcon, setIsDeleteIcon] = useState(false);
  const [isSaveIcon, setIsSaveIcon] = useState(false);
  const [isCreateInput, setIsCreateInput] = useState(true);
  const [editingName, setEditingName] = useState("");
  const [editingId, setEditingId] = useState(null);

  const dispatch = useDispatch()
  const createLabelInputRef = useRef()

  const newLabel = {
    id: Date.now(),
    labelIcon: labelSlideIcon,
    name: labelName,
    path: "/label",
  }


  const addNewLabel = () => {
    if (labelName.trim() === " ") return;
    dispatch(addLabelList(newLabel));
    createLabelInputRef.current.value = "";
  }

  const startEdit = (label) => {
    setEditingId(label.id);
    setEditingName(label.name);
    setIsSaveIcon(true)
  }

  const saveEdit = () => {
    if (editingName.trim() === "") return;
    dispatch(updateLabel({ id: editingId, newLabelName: editingName }));
    setIsSaveIcon(false)
  }

  const visibleDeleteIcon = () => setIsDeleteIcon(true)
  const hiddenDeleteIcon = () => setIsDeleteIcon(false)

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
                onChange={(e) => dispatch(setLabelName(e.target.value))}
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
              let isEditing = label.id === editingId;
              return (
                <div
                  className='label-editor__list-item label-editor__wrapper'
                  onMouseOver={visibleDeleteIcon}
                  onMouseOut={hiddenDeleteIcon}
                  key={label.id}
                >
                  <div className="label-editor__input-group">
                    {
                      isDeleteIcon ?
                        <button className='label-editor__add-btn btn sm-btn' onClick={() => deleteLabelById(label.id)}><img src={deleteLabelIcon} alt="" /> </button>
                        : <img src={labelIcon} alt="" />
                    }
                    {isEditing ? isSaveIcon ?
                      (
                        <input
                          type="text"
                          className='reset-input'
                          onChange={(e) => setEditingName(e.target.value)}
                          value={editingName}
                          autoFocus
                        />
                      ) : (
                        <p> {label.name} </p>
                      )

                      : <p> {label.name} </p>}
                  </div>
                  {isSaveIcon ? (
                    <button className='label-editor__add-btn btn sm-btn' onClick={saveEdit}>
                     <IoCheckmark />
                    </button>
                  ) : (
                    <button className='label-editor__add-btn btn sm-btn' onClick={() => { startEdit(label) }}>
                      <img src={labelEditorIcon} alt="" />
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
          onClick={() => dispatch(setLabelModal(false))}
        >Completed</button>
      </div>
    </div >
  )
}

export default EditLabel