import React, { useContext, useState } from "react";
import { firebaseContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
function ReAuthSection({ providers, handleGoogleReauth, deleteWithPass }) {
  const [password, setPassword] = useState("");
  function handlePasswordDeletion(e) {
    e.preventDefault();
    deleteWithPass(password);
  }
  return (
    <div className="reauthSection vstack">
      {providers.includes("google.com") && (
        <button className="btn btn-danger" onClick={() => handleGoogleReauth()}>
          Re authenticate with Google to Delete
        </button>
      )}
      {providers.includes("password") && (
        <Form
          onSubmit={handlePasswordDeletion}
          className="d-flex flex-column justify-content-center card p-2 gap-3  align-items-center"
        >
          <Form.Group controlId="password_Deletion">
            <Form.Label>Enter Password</Form.Label>
            <Form.Control
              type="password"
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <button className="btn btn-danger" type="submit">
            Delete
          </button>
        </Form>
      )}
    </div>
  );
}
function DeleteAcc() {
  const params = useParams();
  const navigate = useNavigate();
  const firebase = useContext(firebaseContext);
  const [isReAuthed, setIsReAuthed] = useState(false);
  function handleDeleteAccount() {
    firebase.deleteAccount();
  }
  function handleGoogleReauth() {
    firebase.reAuthGoogle(() => {
      setIsReAuthed(true);
    });
  }
  function handleFacebookReauth() {
    firebase.reAuthFacebook(() => {
      setIsReAuthed(true);
    });
  }
  function deleteWithPass(password) {
    firebase.deleteAccount(password);
  }
  function handleCancel() {
    if (params.continue) navigate("/" + params.continue.split(">").join("/"));
  }
  console.log(firebase);
  return (
    <div className="w-100 vh-100 d-flex flex-column align-items-center justify-content-center">
      <div className="card border-3 rounded-3 p-3 d-flex flex-column gap-2">
        <button
          onClick={() => handleCancel()}
          className="btn cancel_modal position-absolute end-0 top-0"
        >
          <FontAwesomeIcon icon={faX} />
        </button>
        <div>Hey, {firebase.currentUser?.displayName}</div>
        <div> do you want to really delete your account?</div>
        {(firebase.credential!=null || isReAuthed )||(
          <div className="vstack">
            <div>if yes, then </div>
            <ReAuthSection
              providers={firebase.providers()}
              handleGoogleReauth={handleGoogleReauth}
              deleteWithPass={deleteWithPass}
            />
          </div>
        )}

        {(firebase.credential || isReAuthed) && (
          <div className="hstack justify-content-center gap-3">
            <button
              className="btn btn-danger hstack gap-2"
              onClick={() => firebase.deleteAccount()}
            >
              <FontAwesomeIcon icon={faCheck} />
              <span>Yes</span>
            </button>{" "}
            <button
              className="btn btn-success hstack gap-2"
              onClick={() => handleCancel()}
            >
              <FontAwesomeIcon icon={faX} />
              <span>No</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeleteAcc;
