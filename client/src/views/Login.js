import React, { useState } from 'react'
import { Card, Input, Button, Form } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom';
import Error from '../components/Error';
import axios from 'axios'

function Login({setIsLoggedIn}) {
  const [error, setError] = useState('')

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
      name: '',
      password: ''
  })

  const { name, password } = formData
  const onChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value})
  }
  
  const onSubmit = async e => {
    e.preventDefault()  
    axios.post('/api/auth/login', formData)
    .then(res => {
      setIsLoggedIn(true)
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/", { replace: true })
    })
    .catch(error => setError(error.response.data.message))
  }

  // const headers = new Headers({
  //   'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
  //   'Custom-Header': 'Header-Value'
  // });
  
  // const requestOptions = {
  //   method: 'GET', // or 'POST', 'PUT', 'DELETE', etc.
  //   headers: headers
  // };
  
  // fetch('https://example.com/api/endpoint', requestOptions)
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  //   .catch(error => console.error('Error:', error));

  return (
    <Card className="auth col-lg-3 col-sm-6">
      <Form onSubmit={onSubmit}>
        <img src="" alt="" width="200" />
        <h5 className="mb-4"> تسجيل الدخول</h5>
        <Error error={error} />
        <Input
          value={name}
          name="name"
          onChange={onChange}
          placeholder="الاسم"
          required
          autoFocus
        />
        <Input
          type="password"
          value={password}
          name="password"
          onChange={onChange}
          placeholder="كلمة المرور"
          required
        />
        <Button color="primary" block className="mb-3">
          {" "}
          تسجيل الدخول{" "}
        </Button>
        <small>
          <Link to="/register">إنشاء حساب جديد</Link>
        </small>
        <p className="m-3 text-muted">&copy; {new Date().getFullYear()}</p>
      </Form>
    </Card>
  );
}

export default Login