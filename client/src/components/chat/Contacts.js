import React, { useState } from 'react'
import Contact from './Contact'
import { Row, Input } from 'reactstrap'

function Contacts({ users, handleSenderId }) {
  const [searchQuery, setSearchQuery] = useState('')

  const searchUser = users.filter(user => (
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  ))

  return (
    <Row>
    <div className="p-2 w-100">
      <div className="mt-2">
        <Input
          className="search-input"
          placeholder="بحث عن جهات الاتصال"
          onChange={e => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
      </div>
      {
        searchUser.map((u, index) => (
          <Contact
            key = {index}
            user = { u }
            handleSenderId = { handleSenderId }
          />
        ))
      }
    </div>
  </Row>
  )
}

export default Contacts