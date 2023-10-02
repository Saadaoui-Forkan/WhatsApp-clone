import React, { useState } from 'react'
import { Card, Input, Button, Form } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom';
import Error from '../components/Error';
import axios from 'axios'

function Register({ setIsLoggedIn }) {
  const [error, setError] = useState('')

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
      name: '',
      username: '',
      password: ''
  });

  const { name, username, password } = formData

  const onChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value})
  }
  
  const onSubmit = async e => {
    e.preventDefault()  
    axios.post('/api/auth/register', formData)
    .then(res => {
      setIsLoggedIn(true)
      // localStorage.setItem("user", JSON.stringify(res?.data));
      navigate("/login", { replace: true })
    })
    .catch(error => setError(error.response.data.message))
  }

  return (
    <Card className="auth col-lg-3 col-sm-6">
      <Form onSubmit={e =>onSubmit(e)}>
        <img src="" alt="" width="200" />
        <h5 className="mb-4">إنشاء حساب جديد</h5>
        <Error error={error} />
        <Input
          value={name}
          name="name"
          onChange={e =>onChange(e)}
          placeholder="الاسم"
          required
          autoFocus
        />
        <Input
          value={username}
          name="username"
          onChange={e =>onChange(e)}
          placeholder="اسم المستخدم"
          required
        />
        <Input
          type="password"
          value={password}
          name="password"
          onChange={e =>onChange(e)}
          placeholder="كلمة المرور"
          required
        />
        <Button color="primary" block className="mb-3">
          إنشاء
        </Button>
        <small>
          <Link to="/login">تسجيل الدخول</Link>
        </small>
        <p className="m-3 text-muted">&copy; {new Date().getFullYear()}</p>
      </Form>
    </Card>
  );
}

export default Register