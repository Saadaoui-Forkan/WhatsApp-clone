import React, { useState, useRef } from 'react';
import Avatar from '../Avatar';
import Error from '../Error';
import { Row, Form, Input, Button } from "reactstrap";
import axios from 'axios'

function EditProfile(props) {
  const { editProfile, handleEditProfile, user, setCurrentUser } = props
  // const [profileImage, setProfileImage] = useState(null)
  const fileUpload = useRef(null)
  const [error, setError] = useState(null)
  const [profileData, setProfileData] = useState({
    name: "",
    about: "",
    profileImage: null
  })

  const { name, about, profileImage } = profileData
  const onChange = (e) => {
    setProfileData({...profileData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log("msg: ", user)
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .post("/api/auth/profile", profileData, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": user.data?.token,
        },
      })
      .then((res) => {
        console.log("msg: ", user)
        setCurrentUser(res.data.data)
      })
      .catch((error) => setError(error.response.data.msg));
  }

  const onImageChange = (event) => {
    const file = event.target.files[0];
    if ( event.target.files[0] && event.target.files ) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData({
          name,
          about,
          profileImage: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  }

  const showFileUpload = () => {
    fileUpload.current.click()
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
        >
          <Error error={error} />

          <div
            className="text-center"
            onClick={showFileUpload}
          >
            <Avatar
              src={user?.avatar}
              file={profileData.profileImage}
            />
          </div>

          <input
            type="file"
            className="d-none"
            accept="image/*"
            onChange={onImageChange}
            ref={fileUpload}
            value={profileImage}
          />

          <div className="bg-white px-4 py-2">
            <label className="text-muted">الاسم</label>
            <Input
              value={name}
              name="name"
              onChange={(e)=> onChange(e)}
              required
              autoComplete="off"
            />
          </div>

          <div className="bg-white px-3 py-2">
            <label className="text-muted">رسالة الحالة</label>
            <Input
              value={about}
              name="about"
              onChange={(e)=> onChange(e)}
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