import React, { useContext, useEffect, useState } from "react";
import { Form, Container, Card, Button, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { firebaseContext } from "../App";

function Sign({ hasAccount }) {
  const firebase = useContext(firebaseContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log("Logging in with:", email, password);
    console.log(firebase);
    firebase.signInWithPass(email, password, (e) => {
      navigate("/");
    });
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    // Add your signup logic here
    console.log("Signing up with:", email, password);
    firebase.signUp(email, password, name, null, (e) => {
      navigate("/");
    });
  };

  function handleGoogleLogin() {
    firebase.signinGoogle((e) => {
      navigate("/");
    });
  }
  function handleFaceBookLogin() {
    firebase.signinFacebook((e) => {
      navigate("/home");
    });
  }

  return (
    <Container className="mt-5">
      <Card
        className="mx-auto align-items-stretch "
        style={{ maxWidth: "400px" }}
      >
        <Card.Body>
          <h2 className="text-center mb-4">
            {hasAccount ? "Login" : "Sign Up"}
          </h2>
          <Stack gap={3}>
            <Form onSubmit={hasAccount ? handleLogin : handleSignUp}>
              {hasAccount || (
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
              )}
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <div className="smallerItems align-items-center d-flex flex-column gap-2 mt-2">
                <div className="support ">
                  <div>
                    {hasAccount && (
                      <button
                        className="btn border-0 outline-0 p-0 m-0"
                        onClick={() => {
                          navigate("../forgotpass", {
                            state: { email },
                          });
                        }}
                      >
                        forgot password?
                      </button>
                    )}
                  </div>{" "}
                  <div>
                    {hasAccount ? (
                      <Link to="/auth/signup">
                        <Form.Text>don't have an account?Sign up.</Form.Text>
                      </Link>
                    ) : (
                      <Link to="/auth/login">
                        <Form.Text>already have an account?Login.</Form.Text>
                      </Link>
                    )}
                  </div>
                </div>
                <Button variant="primary" type="submit" block>
                  {hasAccount ? "Login" : "Sign Up"}
                </Button>
              </div>
            </Form>
          </Stack>
          <hr />
          <Stack gap={2}>
            <Button
              variant="primary"
              type="submit"
              block
              onClick={(e) => handleGoogleLogin()}
            >
              Continue with Google
            </Button>
            <Button
              variant="primary"
              type="submit"
              block
              onClick={(e) => handleFaceBookLogin()}
            >
              Continue with Facebook
            </Button>
          </Stack>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Sign;
