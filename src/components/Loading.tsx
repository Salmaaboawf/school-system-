import React from 'react'
import '../assets/loading.css'


function Loading() {
  return ( 
<div className="loader">
        <div className="pencil">
            <p>Loading...</p>
            <div className="top"></div>
        </div>
        <div className="stroke">
        </div>
    </div>
  )
}

export default Loading