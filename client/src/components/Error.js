import React from 'react'
import {Alert} from 'reactstrap'
function Error({error}) {
    // عرض الأخطاء القادمة من الخادم
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