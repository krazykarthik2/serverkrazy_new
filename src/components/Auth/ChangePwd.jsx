import React, { useContext, useState } from "react";
import { Form, Container, Card, Button, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { firebaseContext } from "../App";

/**
 * Change user password in the UI and in the Firebase backend.
 *
 * @param {object} e - The event object.
 * @return {void} 
 */
function ChangePwd() {
  const firebase = useContext(firebaseContext)
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const handlePassChange = (e) => {
    e.preventDefault();
    // Add your login logic here
    firebase.changePassword(newPassword,oldPassword,() => {
          navigate("/home");
    });
  };


  return (
    <Container className="mt-5">
      <Card
        className="mx-auto align-items-stretch "
        style={{ maxWidth: "400px" }}
      >
        <Card.Body>
          <h2 className="text-center mb-4">
            Change Password
          </h2>
          <Stack gap={3}>
            <Form onSubmit={handlePassChange}>
             {firebase.credential||
            <Form.Group>
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your current password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </Form.Group>}
               <Form.Group>
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  autoComplete="off"
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>
                <Button variant="primary" type="submit" >
                 Change Passworrd
                </Button>
             
            </Form>
          </Stack>
          <hr />
          <Stack gap={2}>
            <Button
              variant="primary"
              type="submit"
              block
              // onClick={(e) => handleGoogleLogin()}
            >
              Continue with Google
            </Button>
            <Button
              variant="primary"
              type="submit"
              block
              // onClick={(e) => handleFaceBookLogin()}
            >
              Continue with Facebook
            </Button>
          </Stack>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ChangePwd;
