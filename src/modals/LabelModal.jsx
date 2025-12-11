import React, { useMemo, useState } from 'react'
import { GoPencil } from "react-icons/go";
import { useSelector } from 'react-redux';
function LabelModal() {
    const labelList = useSelector((state) => state.labelModal.labelList)
    const [seachText, setSearchText] = useState("")
    const filteredLabels = useMemo(()=> {
        if (seachText.trim() === "") {
            return labelList
        }
        const filteredLabelss = labelList.filter((label) => {
           return  label.name.toLowerCase().includes(seachText.trim().toLowerCase())
        })
        return filteredLabelss
    },[seachText,labelList])
  
    return (
        <div className='label-modal'>
            <div className='label-modal__header'>
                <h3>Etiket ekle</h3>
                <div className='search-label'>
                    <input
                        type="text"
                        onChange={(e)=>setSearchText(e.target.value)}
                    />
                    <GoPencil />
                </div>
                <div>
                    {
                        filteredLabels && filteredLabels.map((label) => (
                            <div className='label-lists'>
                                <input type="checkbox" />
                                <p> {label.name} </p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default LabelModal