import React from 'react'
import Contact from './Contact'
import { Row, Input } from 'reactstrap'

function Contacts() {
  return (
    <Row>
    <div className="p-2 w-100">
      <div className="mt-2">
        <Input
          className="search-input"
          placeholder="بحث عن جهات الاتصال"
        //   onChange={e => setSearchQuery(e.target.value)}
        //   value={searchQuery}
        />
      </div>
      <Contact/>
    </div>
  </Row>
  )
}

export default Contacts