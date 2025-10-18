import React, { useRef } from 'react'
import labelIcon from "./../../../assets/slide-icon/label-icon.svg"
import "./EditLabelModal.css"
import { useDispatch, useSelector } from 'react-redux';
import { addLabelList, setLabelModal, setLabelName } from '../../../redux/labelModalSlice';
function EditLabel() {
  const labelName=useSelector((state)=>state.labelModal.labelName)
  const labelList=useSelector((state)=>state.labelModal.labelList)
  const dispatch=useDispatch()
 function handleClick(e){
dispatch(setLabelName(e.target.value))
}
const labelEditorInputRef=useRef()
const newLabel={
  labelIcon:labelIcon,
  name:labelName,
  path:"/label",
}
function addNewLabel() {
  dispatch(addLabelList(newLabel))
  console.log("add");
  labelEditorInputRef.current.value=" "
}

  return (
    <div className='label-editor'>
      <div className="label-editor__content">
        <h4 className='label-editor__title'>Edit labels</h4>
        <div className='label-editor__wrapper label-editor__create-wrapper'>
          <div className='label-editor__input-group'>
            <button className='label-editor__control-btn btn sm-btn'>
              <i className="fa-solid fa-xmark"></i>
              {/* <i className="fa-solid fa-plus"></i> */}
            </button>
            <input type="text" className='label-editor__input' ref={labelEditorInputRef} placeholder='Create new label'
            onChange={(e)=>handleClick(e)}
       
             />
          </div>
          <button className='label-editor__add-btn btn sm-btn'
          onClick={()=>addNewLabel()}
          >
            <i className="fa-solid fa-check"></i>
          </button>
        </div>
        <div className='label-editor__list-wrapper '>
         {
          labelList.map((label,id)=>(
            <div className='label-editor__list-item label-editor__wrapper' key={id}>
            <div className="label-editor__input-group">
              <button className='label-editor__add-btn btn sm-btn'>
                <i className="fa-solid fa-check"></i>
                {/* bu kısma hover olduğunda mouseon olduğunda etiket iconu çöp kutusu iconuna dönücel */}
                {/* <i className="fa-solid fa-xmark"></i> */}
              </button>
              <p>{label.name} </p>
            </div>

            <button className='label-editor__add-btn btn sm-btn'>
              <i className="fa-solid fa-xmark"></i>
              {/* bu kısma tıkşanıldığında etiket iconu tik kutusu iconuna dönücel */}
              {/* <i className="fa-solid fa-check"></i> */}
            </button>
          </div>
          ))
         }
        </div>
      </div>
      <hr />
      <div className='label-editor__comleted-btn-wrapper'>
        <button className='label-editor__comleted-btn lg-btn'
        onClick={()=>dispatch(setLabelModal(false))}
        >Completed</button>
      </div>
    </div>
  )
}

export default EditLabel