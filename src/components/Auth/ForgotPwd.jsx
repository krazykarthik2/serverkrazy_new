import React, { useContext, useEffect, useState } from "react";
import { firebaseContext } from "../App";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
function ForgotPwd() {
  const firebase = useContext(firebaseContext);
  const location = useLocation();
  const [email, setEmail] = useState("");
  useEffect(() => {
    setEmail(location.state.email);
  }, [location]);

  const navigate = useNavigate();
  function handleSendPassResetMail(e) {
    e.preventDefault();
    console.log("sending password reset mail...");
    firebase.sendPasswordResetEmailtoUser(email, () => {
      navigate("../pass_is_reset",{
        state:{email}
      });
    });
  }

  return (
    <div>
      <Form onSubmit={handleSendPassResetMail}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Button className="" type="submit">
          Send Password Reset Email
        </Button>
      </Form>
    </div>
  );
}

export default ForgotPwd;
