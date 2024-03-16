import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Card, Form, FormControl } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { firebaseContext } from "../../App";
import { Floating_Control_Label } from "../../utils/FormComp";
import { Back } from "../../utils/Navigations";

function ProfileActions() {
  const firebase = useContext(firebaseContext);
  const [username, setUsername] = useState(firebase?.currentUser?.displayName);
  const [email, setEmail] = useState(firebase?.currentUser?.email);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [pfpFile, setPfpFile] = useState(null);
  const [pfpUrl, setPfpUrl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location?.state?.command == "profile.pic.edit") {
      location.state = null;
      uploadProfilePicForce();
    }
    if (location?.state?.command == "profile.pic.remove") {
      handleProfilePicRemove();
    }
  }, [location]);

  function uploadProfilePicForce() {
    document.getElementById("profile-pic-new")?.click();
  }

  function handlePfpUpload(e) {
    e.preventDefault();
    setPfpFile(e.target.files[0]);
  }
  useEffect(() => {
    if (pfpFile) {
      setPfpUrl(URL.createObjectURL(pfpFile));
    }
  }, [pfpFile]);
  window.pfpFile = pfpFile;
  window.pfpURL = pfpUrl;

  function handleProfilePicChange(file, callback = function () {}) {
    if (firebase)
      if (firebase.currentUser) {
        firebase.updatePhoto(file, callback);
      }
  }
  function handleProfilePicRemove() {
    if (firebase)
      if (firebase.currentUser) {
        firebase.removeProfilePic();
      }
  }

  useEffect(() => {
    setUsername(firebase?.currentUser?.displayName);
    setEmail(firebase?.currentUser?.email);
  }, [firebase]);
  window.navigate = navigate;
  function notRecentlyAuthed() {
    console.log("not recently authed");
    navigate("/auth/login", {
      state: {
        emailToBeResetTo: firebase?.currentUser?.email,
        continue__: "/profile/edit",
      },
    });
  }
  function handleUpdateProfile(e) {
    e.preventDefault();
    if (firebase?.currentUser?.email != email)
      firebase.updateEmail(email, notRecentlyAuthed, setIsEmailSent(true));
    if (firebase?.currentUser?.displayName != username)
      firebase.updateDisplayName(username);
    if (pfpFile)
      handleProfilePicChange(pfpFile, () => {
        alert("profile pic updated");
        setPfpFile(null);
      });
  }
  return (
    <div className="vw-100  vh-100 d-flex flex-column align-items-center justify-content-between">
      <div className="d-flex w-100 justify-content-start p-3 bg-dark">
        <Back />
      </div>
      <Form className="card vstack p-2 " onSubmit={handleUpdateProfile}>
        <h1 className="d-center">Update Profile</h1>
        <div className="d-center flex-column">
          <img
            src={pfpUrl || firebase?.profilePic}
            className="rounded-circle border border-5 border-secondary"
            width={"200"}
          />
          <div className="actions d-flex justify-content-center w-100 gap-2">
            <Card title="pfp" className="p-2 ps-4">
              <h1>
                <FontAwesomeIcon icon={faEdit} /> Change
              </h1>

              <FormControl
                type="file"
                id="profile-pic-new"
                onChange={handlePfpUpload}
              />
            </Card>
            <Button
              className="btn border-0 btn-danger"
              onClick={() => handleProfilePicRemove()}
            >
              <FontAwesomeIcon icon={faTrash} />
              <div className="line">Remove</div>
              <div className="line">Profile Pic</div>
            </Button>
          </div>
        </div>

        <Floating_Control_Label
          id="username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Floating_Control_Label
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="d-center">
          <button
            type="submit"
            className="btn d-center btn-primary "
            disabled={
              firebase?.currentUser?.email == email &&
              firebase?.currentUser?.displayName == username &&
              !pfpFile
            }
          >
            <span className="h3 fw-normal">
              Update{" "}
              {[
                firebase?.currentUser?.email != email ? "Email" : "",
                firebase?.currentUser?.displayName != username
                  ? "Username"
                  : "",
              ]
                .filter((e) => e)
                .join(" and ")}
            </span>
          </button>
        </div>
      </Form>
      {isEmailSent && (
        <Alert>
          hey {firebase?.currentUser?.displayName},<br />
          Email is sent to {email}
        </Alert>
      )}
    </div>
  );
}

export default ProfileActions;
