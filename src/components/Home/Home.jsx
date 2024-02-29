import {
  faEdit,
  faSignOut,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { button, Card } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TerminalCxt, firebaseContext, serverContext } from "../App";
import Terminal from "../Terminal/Terminal";
import { To_chat } from "../utils/Navigations";
import "./index.sass";

function Home() {
  const firebase = useContext(firebaseContext);
  const server = useContext(serverContext);
  const location = useLocation();
  const terminalCxt = useContext(TerminalCxt);
  function setTerminalVisibility(e) {
    terminalCxt.setTerminalVisibility(e);
  }
  useEffect(() => {
    if (location.state?.serverToBeCreated == true) {
      createServer();
    }
  }, [location]);

  const navigate = useNavigate();
  function signOut() {
    firebase.signout();
  }
  function handleNotAuthed() {
    navigate("/auth/login", {
      state: { continue__: "/", serverToBeCreated: true },
    });
  }
  function createServer() {
    console.log("creating server");
    if (!server.server) {
      server.createServer(
        () => {
          handleNotAuthed();
        },
        (e) => navigate("/server/" + e)
      );
    }
    console.log("server created" + server.serverName);
  }
  function handleStop() {
    server.stopServer(() => navigate("/"));
  }
  function handleExit() {
    server.exitServer(() => navigate("/"));
  }
  return (
    <div className="home bg-dark vh-100 vw-100 text-white gap-5 d-flex flex-column justify-content-center w-100  align-items-center ">
      <Card className=" align-items-stretch rounded-3 w-75  mx-5 px-3 bg-glass text-white">
        <Card.Body>
          <div className="user">
            <div className="greet display-2">Hi,</div>
            <div className="user_name display-3">
              {firebase?.currentUser?.displayName}
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <div className="actions hstack gap-5 ml-auto">
              <Link to={"/auth/actions"} accessKey="x">
                <div className="edit text-white">
                  <FontAwesomeIcon icon={faEdit} size="3x" />
                </div>{" "}
              </Link>
              <button className="btn text-white" onClick={() => signOut()}>
                <div className="signout">
                  <FontAwesomeIcon icon={faSignOut} size="3x" />
                </div>
              </button>
            </div>
          </div>
        </Card.Body>
      </Card>
      {server.server ? (
        <div className="flex flex-column">
          <div className="display-1">{server.serverName}</div>
          {server.isMyServer() ? (
            <button
              className="btn text-white btn-danger "
              onClick={() => handleStop()}
            >
              Stop{" "}
            </button>
          ) : (
            <button
              className="btn text-white btn-danger"
              onClick={() => handleExit()}
            >
              Exit{" "}
            </button>
          )}

          <To_chat serverName={server.serverName} />
        </div>
      ) : (
        <div className="d-flex flex-column  align-items-center gap-4 w-75">
          <button
            onClick={(e) => createServer()}
            className="btn btn-primary display-3"
            accessKey="c"
          >
            Create Server
          </button>
          <Link
            to={"/jump"}
            className="btn btn-primary display-3"
            accessKey="j"
          >
            Jump to Server
          </Link>
        </div>
      )}
      {terminalCxt.isVisible ? (
        <Terminal prompt={"$home>"} />
      ) : (
        <button
          className="btn text-white terminal-btn"
          onClick={() => {
            setTerminalVisibility(true);
          }}
          accessKey="t"
        >
          <div className="terminal-btn">
            <FontAwesomeIcon icon={faTerminal} size="2x" />
          </div>
        </button>
      )}
    </div>
  );
}

export default Home;
