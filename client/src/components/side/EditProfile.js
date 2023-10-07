import React, { useState, useRef } from 'react';
import Avatar from '../Avatar';
import Error from '../Error';
import { Row, Form, Input, Button } from "reactstrap";
import axios from 'axios'

function EditProfile(props) {
  const { editProfile, handleEditProfile, user, setCurrentUser } = props
  const [avatar, setAvatar] = useState(null)
  const [image, setImage] = useState(null)
  const [name, setName] = useState("")
  const [about, setAbout] = useState("")
  const [error, setError] = useState("")
  const fileUpload = useRef(null)

  const showFileUpload = () => {
    fileUpload.current.click()
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
      setAvatar(event.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem("user"));

    const formData = new FormData()
    formData.append('name', name)
    formData.append('about', about)
    if (avatar) {
      formData.append('avatar', avatar, avatar.name)
    }
    axios
      .post("/api/auth/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": user.data?.token,
        },
      })
      .then((res) => {
        setCurrentUser(res.data.data)
      })
      .catch((error) => setError(error.response.data.msg));
  }
  
  return (
    <div className={editProfile ? "side-profile open" : "side-profile"}>
      <Row className="heading">
        <div className="mr-2 nav-link" onClick={handleEditProfile}>
          <i className="fa fa-arrow-right" />
        </div>
        <div>الملف الشخصي</div>
      </Row>

      <div className="edit_profile d-flex flex-column">
        <Form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          {error && <Error error={error} />}

          <div
            className="text-center"
            onClick={showFileUpload}
          >
            <Avatar
              src={user?.avatar}
              file={image}
            />
          </div>

          <input
            type="file"
            className="d-none"
            accept="image/*"
            name='image'
            onChange={onImageChange}
            ref={fileUpload}
            // value={image}
          />

          <div className="bg-white px-4 py-2">
            <label className="text-muted">الاسم</label>
            <Input
              value={name}
              name="name"
              onChange={(e)=> setName(e.target.value)}
              required
              autoComplete="off"
            />
          </div>

          <div className="bg-white px-3 py-2">
            <label className="text-muted">رسالة الحالة</label>
            <Input
              value={about}
              name="about"
              onChange={(e)=> setAbout(e.target.value)}
              required
              autoComplete="off"
            />
          </div>

          <div className="bg-white px-3 py-2">
            <Button block className="mt-3">
              حفظ
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default EditProfile