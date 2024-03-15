import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Card, Form, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
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
    if (firebase?.currentUser) {
      firebase.updatePhoto(file, callback);
    }
  }
  function handleProfilePicRemove() {
    if (firebase?.currentUser) {
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
    if (!pfpFile) handleProfilePicChange(pfpFile);
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
            src={pfpUrl || firebase?.currentUser?.photoURL}
            className="rounded-circle border border-5 border-secondary"
            width={"200"}
          />
          <div className="actions d-flex">
            <Card title="pfp" className="p-2">
              <h1>
                <FontAwesomeIcon icon={faEdit} /> Change
              </h1>
              <FormControl type="file" onChange={handlePfpUpload} />
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
          <div className="text-center h4">
            {firebase?.currentUser?.displayName}
          </div>
          <div className="text-center">{firebase?.currentUser?.email}</div>
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
        <Button
          type="submit"
          className="btn"
          variant="primary"
          disabled={
            firebase?.currentUser?.email == email &&
            firebase?.currentUser?.displayName == username &&
            !pfpFile
          }
        >
          Update{" "}
          {[
            firebase?.currentUser?.email != email ? "Email" : "",
            firebase?.currentUser?.displayName != username ? "Username" : "",
          ]
            .filter((e) => e)
            .join(" and ")}
        </Button>
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
