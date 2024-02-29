import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Back } from "./utils/Navigations";
import QRScan from "./utils/QRScan";
import { firebaseContext, serverContext } from "./App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Loading from "./utils/Loading";
function JumpToServer() {
  const server = useContext(serverContext);
  const params_server_url = useParams()["server"];
  const [serverName, setServerName] = useState("");
  const [showInterface, setShowInterface] = useState(false);
  const firebase = useContext(firebaseContext);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.state?.isReloaded) setShowInterface(false);
    else setShowInterface(true);
  }, [location]);
  function handleNotAuthed(s_name) {
    navigate("/auth/login", {
      state: { ...location.state, continue__: "/jump/" + s_name },
    });
  }

  if (params_server_url) {
    tryServer(params_server_url, () => navigate("/jump"));
  }

  function isValidServerName(sname) {
    return sname.length == 8;
  }
  function tryServer(sname, ifNotFound = function () {}) {
    let s_name = validateServerName(sname);
    if (isValidServerName(s_name))
      if (firebase.currentUser)
        server.jumpToServer(
          s_name,
          () => handleNotAuthed(s_name),
          (e) => {
            if (e) {
              if (location.state?.continue__) {
                console.log("continue__", location.state.continue__);
                navigate(location.state.continue__);
              } else navigate("/server/" + s_name + "/chat");
            } else ifNotFound();
          }
        );
  }
  function validateServerName(e) {
    let s_name = e;
    if (e.startsWith("https://serverkrazy.web.app/?server="))
      s_name = e.replace("https://serverkrazy.web.app/?server=", "");
    else if (e.startsWith("https://serverkrazy.web.app?server="))
      s_name = e.replace("https://serverkrazy.web.app?server=", "");
    else if (e.startsWith("https://servercrazy.com/jump/"))
      s_name = e.replace("https://servercrazy.com/jump/", "");

    return s_name;
  }
  function handleSubmit(e) {
    e.preventDefault();
    tryServer(serverName);
  }
  return (
    <div className="bg-dark text-white w-100 h-100 d-flex flex-column justify-content-between align-items-center">
      <Back className="align-self-start" />
      {showInterface ? (
        <>
          <QRScan
            whenQr={(e) => {
              setServerName(validateServerName(e)); // console.log(e);
              tryServer(validateServerName(e));
            }}
            style={{ width: "40vmin", height: "40vmin" }}
          />
          <Form onSubmit={handleSubmit} className="d-center flex-column">
            <Form.Group className="mb-3 d-center vstack" controlId="formServerName">
              <Form.Label>Server Name</Form.Label>
              <div className="hstack">
                <Form.Control
                  type="text"
                  placeholder="Enter Server Name"
                  value={serverName}
                  onChange={(e) =>
                    setServerName(
                      e.target.value
                        .replaceAll(/[^a-zA-Z0-9]/gi, "")
                        .toLowerCase()
                    )
                  }
                  autoComplete="off"
                  required
                  maxLength={8}
                  minLength={8}
                  className={
                    isValidServerName(serverName) ? "is-valid" : "is-invalid"
                  }
                />
                
              </div>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </>
      ) : (
        <div className="d-center vh-100 vw-100">
          <Loading
            className="w-100 h-100 d-center flex-column"
            loadingText="loading jump interface"
          />
        </div>
      )}
      <div></div>
    </div>
  );
}

export default JumpToServer;
