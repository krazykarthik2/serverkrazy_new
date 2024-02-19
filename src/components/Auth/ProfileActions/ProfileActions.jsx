import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { Floating_Control_Label } from "../../utils/FormComp";
import { firebaseContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { Back } from "../../utils/Navigations";

function ProfileActions() {
  const firebase = useContext(firebaseContext);
  const [username, setUsername] = useState(firebase?.currentUser?.displayName);
  const [email, setEmail] = useState(firebase?.currentUser?.email);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setUsername(firebase?.currentUser?.displayName);
    setEmail(firebase?.currentUser?.email);
  }, [firebase]);
  window.navigate = navigate
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
  }
  return (
    <div className="vw-100 bg-secondary vh-100 d-flex flex-column align-items-center justify-content-between">
      <div className="d-flex w-100 justify-content-start p-3">
        <Back />
      </div>
      <Form className="card vstack p-2" onSubmit={handleUpdateProfile}>
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
            firebase?.currentUser?.displayName == username
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
