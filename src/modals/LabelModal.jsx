import React from 'react'
import { GoPencil } from "react-icons/go";
import { useSelector } from 'react-redux';
function LabelModal() {
    const labelList = useSelector((state) => state.labelModal.labelList)
    const isLabelModal = useSelector((state) => state.labelModal.isLabelModal)
    return (
        <div>
            <div>
                <h3>Etiket ekle</h3>
                <div>
                    <input type="text" />
                    <GoPencil />
                </div>
                <div>
                    {
                        labelList && labelList.map((label) => (
                            <div>
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