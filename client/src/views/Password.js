import React, { useState } from 'react'
import { Card, Form, Input, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import Error from '../components/Error';
import axios from 'axios';

function Password() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [changePassward, setChangePassward] = useState({
    password: '',
    newPassword: ''
  })

  const { password, newPassword } = changePassward

  const onChange = (e) => {
      setChangePassward({...changePassward, [e.target.name]: e.target.value})
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .post("/api/auth/change_password", changePassward, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": user?.data?.token,
        },
      })
      .then((res) => {
        setChangePassward(res.data)
        navigate("/", { replace: true })
      })
      .catch((error) => setError(error.response.data.msg));
  };
  return (
    <Card className="auth col-lg-3 col-sm-6">
      <Form onSubmit={(e)=> onSubmit(e)}>
        <img  alt="" width="200" />
        <h5 className="mb-4">تغيير كلمة المرور</h5>
        <Error error={error}/>
        <Input
          type="password"
          value={password}
          name="password"
          onChange={(e)=> onChange(e)}
          placeholder="كلمة المرور الحالية"
          required
        />
        <Input
          type="password"
          value={newPassword}
          name="newPassword"
          onChange={(e)=> onChange(e)}
          placeholder="كلمة المرور الجديدة"
          required
        />
        <Button block className="mb-3">
          تغيير
        </Button>
        <small>
          <Link to="/">عودة</Link>
        </small>
        <p className="m-3 mb-3 text-muted">&copy; {new Date().getFullYear()}</p>
      </Form>
    </Card>
  );
}

export default Password