import React, { useState, useRef } from 'react';
import Avatar from '../Avatar';
import Error from '../Error';
import { Row, Form, Input, Button } from "reactstrap";

function EditProfile(props) {
  const { editProfile, handleEditProfile, user } = props
  const [profileImage, setProfileImage] = useState(null)
  const fileUpload = useRef(null)
  //  Update Profile
  // useEffect(() => {
  //   const updateProfile = async() => {
  //     const user = JSON.parse(localStorage.getItem('user'))
  //       await axios.post('/api/auth/profile', {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'x-auth-token': user?.data?.token
  //         }})
  //       .then(res => console.log(res.data))
  //       .catch(err => console.log(err.response.data.msg))
  //   }
  //   updateProfile()
  // }, [])

  const onImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
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
        // onSubmit={this.onSubmit}
        >
          {/* <Error error={error} /> */}

          <div
            className="text-center"
            onClick={showFileUpload}
          >
            <Avatar
              src={user?.avatar}
              file={profileImage}
            />
          </div>

          <input
            type="file"
            className="d-none"
            // type="file"
            accept="image/*"
            onChange={onImageChange}
            ref={fileUpload}
          />

          <div className="bg-white px-4 py-2">
            <label className="text-muted">الاسم</label>
            <Input
              //   value={this.state.name}
              name="name"
              //   onChange={this.onChange}
              required
              autoComplete="off"
            />
          </div>

          <div className="bg-white px-3 py-2">
            <label className="text-muted">رسالة الحالة</label>
            <Input
              //   value={this.state.about}
              name="about"
              //   onChange={this.onChange}
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