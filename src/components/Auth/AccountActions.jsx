import React, { useContext, useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { Back } from "../utils/Navigations";
import { Link, useNavigate } from "react-router-dom";
import {firebaseContext} from "../App"
function AccountActions() {
  const firebase = useContext(firebaseContext)
  const navigate = useNavigate();
  function handleSignOut() {
    if (firebase?.currentUser) {
      firebase.signout((e) => {
        navigate("/auth/login");
      });
    }
  }
  function handleLinkGoogle() {
    
  }
  function handleLinkFacebook() {}
  function handleUnlinkGoogle() {}
  function handleUnlinkFacebook() {}
  function handleDeleteAcc() {}
  const [lastSignInTime, setLastSignInTime] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);

  useEffect(() => {
    if (firebase?.currentUser) {
      setLastSignInTime(
        new Date(firebase?.currentUser?.metadata?.lastSignInTime)
      );
      setCreatedAt(
        new Date(Number(firebase?.currentUser?.metadata?.createdAt))
      );
    }
  }, [firebase]);
  return (
    <div className="w-100 vh-100 d-flex flex-column">
      <Back to="/" />
      Hey,
      <p>{firebase?.currentUser?.displayName}</p>
      <Button onClick={() => handleSignOut()} className="btn btn-outline">
        Sign Out
      </Button>
      <Link to="/profile/edit">Edit Profile</Link>
      <Link to="../changepass">Change Password</Link>
      {firebase.providers().find((provider) => provider === "google.com") ? (
        <Button onClick={() => handleUnlinkGoogle()}>Unlink Google</Button>
      ) : (
        <Button onClick={() => handleLinkGoogle()}>Link Google</Button>
      )}
      {firebase.providers().find((provider) => provider === "facebook.com") ? (
        <Button onClick={() => handleUnlinkFacebook()}>Unlink Facebook</Button>
      ) : (
        <Button onClick={() => handleLinkFacebook()}>Link Facebook</Button>
      )}
      <Link to="/auth/deleteAcc/continue/auth>actions">Delete Account</Link>
      <Alert>
        <Alert.Heading>Last Signed In</Alert.Heading>
        <p>{lastSignInTime?.toString()}</p>
      </Alert>{" "}
      <Alert>
        <Alert.Heading>Account Created At</Alert.Heading>

        <p>{createdAt?.toString()}</p>
      </Alert>
    </div>
  );
}

export default AccountActions;
