import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  Container,
  Card,
  Button,
  Stack,
  FormFloating,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { firebaseContext } from "../../App";
import {
  Floating_Control_Label,
  Floating_Password_Label,
} from "../../utils/FormComp";
import "./index.css";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Sign({ hasAccount }) {
  const firebase = useContext(firebaseContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [continue__, setContinue__] = useState("");
  const location = useLocation();
  function afterSignUp() {
    navigate(continue__ ? continue__ : "/", {
      state: { ...location.state, continue__: null },
    });
  }
  useEffect(() => {
    if (location.state?.continue__) {
      setContinue__(location.state.continue__);
    }
  }, [location]);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log("Logging in with:", email, password);
    console.log(firebase);
    firebase.signInWithPass(email, password, (e) => {
      afterSignUp();
    });
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    // Add your signup logic here
    console.log("Signing up with:", email, password);
    firebase.signUp(email, password, name, null, (e) => {
      afterSignUp();
    });
  };

  function handleGoogleLogin() {
    firebase.signinGoogle((e) => {
      afterSignUp();
    });
  }
  function handleFaceBookLogin() {
    firebase.signinFacebook((e) => {
      afterSignUp();
    });
  }

  return (
    <div className="sign vh-100 vw-100 d-flex align-items-center justify-content-center">
      <Card className=" align-items-stretch h-fit-content">
        <Card.Body>
          <h2 className="text-center mb-4">
            {hasAccount ? "Login" : "Sign Up"}
          </h2>
          <Form
            onSubmit={hasAccount ? handleLogin : handleSignUp}
            className="vstack gap-3"
          >
            {hasAccount || (
              <Floating_Control_Label
                id="name"
                type="text"
                placeholder="Enter your name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Name"
              />
              // <Form.Group>
              //   <Form.Label>Name</Form.Label>
              //   <Form.Control
              //     type="text"
              //     placeholder="Enter your name"
              //     autoComplete="name"
              //     value={name}
              //     onChange={(e) => setName(e.target.value)}
              //   />
              // </Form.Group>
            )}
            <Floating_Control_Label
              id="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
            />
            {/* <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group> */}
            <Floating_Password_Label
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
            />
            {/* <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group> */}
            <div className="smaller-items w-100 justify-content-between px-5 align-items-center  gap-2 mt-2">
              <div className="support ">
                <div>
                  {hasAccount && (
                    <button
                      className="a btn border-0 outline-0 p-0 m-0"
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
              <Button variant="primary" type="submit"  className="login w-100">
                {hasAccount ? "Login" : "Sign Up"}
              </Button>
            </div>
          </Form>
          <hr />
          <Stack gap={2}>
            <Button
              variant="primary"
              type="submit"
              block
              onClick={(e) => handleGoogleLogin()}
              className="hstack align-items-center justify-content-center gap-2"
            >
              <div className="span">Continue with Google</div>
              <FontAwesomeIcon className="google-icon icon" icon={faGoogle} />
            </Button>
            <Button
              variant="primary"
              type="submit"
              block
              className="hstack align-items-center justify-content-center gap-2"
              onClick={(e) => handleFaceBookLogin()}
            >
              <div className="span">Continue with Facebook</div>
              <FontAwesomeIcon
                className="facebook-icon icon"
                icon={faFacebook}
              />
            </Button>
          </Stack>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Sign;
