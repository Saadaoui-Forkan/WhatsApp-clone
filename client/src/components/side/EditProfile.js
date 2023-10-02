import React from 'react'
import Avatar from '../Avatar';
import Error from '../Error';
import { Row, Form, Input, Button } from "reactstrap";

function EditProfile(props) {

  const { editProfile, handleEditProfile } = props
  return (
    <div 
      // className='"side-profile open"'
      className={editProfile ? "side-profile open" : "side-profile"}
    >
      <Row className="heading">
        <div className="mr-2 nav-link" onClick={handleEditProfile}>
          <i className="fa fa-arrow-right" />
        </div>
        <div>الملف الشخصي</div>
      </Row>

      <div className="d-flex flex-column" style={{ overflow: "auto" }}>
        <Form 
            // onSubmit={this.onSubmit}
        >
          {/* <Error error={error} /> */}

          <div 
            className="text-center" 
            // onClick={showFileUpload}
          >
            <Avatar 
                // src={this.props.user.avatar} 
                // file={this.state.image} 
            />
          </div>

          <input
            type="file"
            // ref={this.fileUpload}
            // onChange={this.onImageChange}
            className="d-none"
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