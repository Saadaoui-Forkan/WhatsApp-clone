import React, { useState } from 'react'
import { Card, Input, Button, Form } from 'reactstrap'
import { Link } from 'react-router-dom';
import Error from '../components/Error';

function Register({ error }) {
    const [formData, setFormData] = useState({
        name: '',
        password: ''
    });
    const { name, password } = formData
    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    const onSubmit = async e => {
        e.preventDefault()
        console.log("success")
    }
  return (
    <Card className="auth col-lg-3 col-sm-6">
      <Form onSubmit={onSubmit}>
        <img src={"Logo"} alt="" width="200" />
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

export default Register