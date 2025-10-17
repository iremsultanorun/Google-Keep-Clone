import React from 'react'
import "./../css/TrashPage.css"
function TrashPage() {
  return (
    <div>
  <div className='trash__text-wrapper'>
  <p className='trash__text'>Notes in the Trash are deleted after 7 days.</p>
  <button className='trash__btn lg-btn'>Empty the Trash</button>
  </div>
  {/* silinen notları tutacak kısım */}
  <div>

  </div>
    </div>
  )
}

export default TrashPage