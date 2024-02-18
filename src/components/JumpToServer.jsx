import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Back } from "./utils/Navigations";
import QRScan from "./utils/QRScan";
import { serverContext } from "./App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
function JumpToServer() {
  const server = useContext(serverContext);
  const params_server_url = useParams()["server"];

  if (params_server_url) {
    // console.log(params_server_url);
    tryServer(params_server_url);
  }

  const [serverName, setServerName] = useState("");
  const navigate = useNavigate();
  function isValidServerName(sname) {
    return sname.length == 8;
  }
  function tryServer(sname) {
    let s_name = validateServerName(sname);
    if (isValidServerName(s_name))
      server.jumpToServer(s_name, (e) => {
        if (e) navigate("/server/" + s_name + "/chat");
      });
  }
  function validateServerName(e) {
    let s_name = e;
    if (e.startsWith("https://serverkrazy.web.app/?server="))
      s_name = e.replace("https://serverkrazy.web.app/?server=", "");
    else if (e.startsWith("https://serverkrazy.web.app?server="))
      s_name = e.replace("https://serverkrazy.web.app?server=", "");
    else if (e.startsWith("https://servercrazy.com/server/"))
      s_name = e.replace("https://servercrazy.com/server/", "");

    return s_name;
  }
  function handleSubmit(e) {
    e.preventDefault();
    tryServer(serverName);
  }
  return (
    <div className="w-100 h-100 d-flex flex-column justify-content-between align-items-center">
      <Back className="align-self-start" />
      <QRScan
        whenQr={(e) => {
          setServerName(validateServerName(e)); // console.log(e);
          tryServer(validateServerName(e));
        }}
        style={{ width: "40vmin", height: "40vmin" }}
      />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formServerName">
          <Form.Label>Server Name</Form.Label>
          <div className="hstack">
            <Form.Control
              type="text"
              placeholder="Enter Server Name"
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
              autoComplete="off"
              required
              maxLength={8}
              minLength={8}
            />
            <FontAwesomeIcon icon={faCheck} className={isValidServerName(serverName)?"opacity-100":"opacity-0"}/>
          </div>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <div></div>
    </div>
  );
}

export default JumpToServer;
