import React from 'react'
import './Loader.css'
import { SyncLoader } from 'react-spinners'
const Loader = () => {
  return (
    <div className='loader'>
<SyncLoader
  color="#06cdbb"
  cssOverride={{}}
  speedMultiplier={1}
  size={30}
/>
    </div>
  )
}

export default Loader