import React, { useState } from "react";
import "./index.css"
import defaultProfPic from "../../../../assets/default-profile-pic.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSignOut, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
function UserShowingProfile({
  username,
  picture,
  onRemoveProfilePic,
  onEditProfilePic,
  onSignout,
}) {
  return (
    <div className="User-showing-profile">
      <div className="hstack justify-content-between flex-wrap">
        <div className="hello-_user">
          <div className="vstack">
            <div className="hello">hello,</div>
            <Link to="/profile/edit" className="user hstack" accessKey="x">
              <div className="username">{username}</div>
              <FontAwesomeIcon icon={faEdit} className="edit" />
            </Link>
          </div>
        </div>
        <div className="profile-picture-cont gap-4 flex-wrap align-items-center justify-content-center">
          <div className="vstack">
            <div className="profile-picture">Profile Picture</div>
            <div className="vstack">
              <div className="d-flex align-items-center justify-content-end">
                <FontAwesomeIcon icon={faEdit} className="edit" />{" "}
                <div className="change">change</div>
              </div>
              <div className="d-flex align-items-center justify-content-end">
                <FontAwesomeIcon icon={faTrash} className="trash" />{" "}
                <div className="remove">remove</div>
              </div>
            </div>
          </div>
          <img
            src={picture || defaultProfPic}
            alt="Not Found"
            className="profile-pic"
          />
          <div className="h-100 d-flex align-items-center justify-content-center">
            <button className="sign-out-block btn border-0 flex-center" onClick={onSignout}>
              <FontAwesomeIcon icon={faSignOut} className="sign-out-icon" />
              <div className="sign-out">sign out</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserShowingProfile;
