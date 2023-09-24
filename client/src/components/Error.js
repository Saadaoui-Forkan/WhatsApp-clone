import React from 'react'
import {Alert} from 'reactstrap'
function Error({error}) {
  return (
    <>
        {
            error 
            ? 
            <Alert color='danger'> {error} </Alert> 
            : 
            ""
        }
    </>
  )
}

export default Error