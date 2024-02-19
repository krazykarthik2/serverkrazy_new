import { faEdit, faQrcode, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { firebaseContext, serverContext } from "./App";
import { To_chat } from "./utils/Navigations";
function Home() {
  const firebase = useContext(firebaseContext);
  const server = useContext(serverContext);
  const location = useLocation();

  useEffect(() => {
    console.log(location);
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
      server.createServer(()=>{handleNotAuthed();}, (e) => navigate("/server/" + e));
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
    <>
      <div className="gap-5 d-flex flex-column justify-content-center w-100 mt-5 align-items-center ">
        <Card className=" align-items-stretch rounded-3 w-75  mx-5 px-3 ">
          <Card.Body>
            <div className="user">
              <div className="greet display-2">Hi,</div>
              <div className="user_name display-3">
                {firebase?.currentUser?.displayName}
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <div className="actions hstack gap-5 ml-auto">
                <Link to={"/auth/actions"}>
                  <div className="edit">
                    <FontAwesomeIcon icon={faEdit} size="3x" />
                  </div>{" "}
                </Link>
                <Button onClick={() => signOut()}>
                  <div className="signout">
                    <FontAwesomeIcon icon={faSignOut} size="3x" />
                  </div>
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
        {server.server ? (
          <div className="flex flex-column">
            <div className="display-1">{server.serverName}</div>

            <Button onClick={() => handleStop()}>Stop </Button>
            <Button onClick={() => handleExit()}>Exit </Button>

            <To_chat serverName={server.serverName} />
          </div>
        ) : (
          <div className="d-flex flex-column  align-items-center gap-4 w-75">
            <Button
              onClick={(e) => createServer()}
              className="btn btn-primary display-3"
              accessKey="c"
            >
              Create Server
            </Button>
            <Link
              to={"/jump"}
              className="btn btn-primary display-3"
              accessKey="j"
            >
              Jump to Server
            </Link>
            <Link to={"/jump"} className="btn btn-primary rounded-3">
              <FontAwesomeIcon icon={faQrcode} size="6x" />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
