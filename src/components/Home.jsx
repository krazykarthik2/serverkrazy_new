import { faEdit, faQrcode, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { firebaseContext, serverContext } from "./App";
import {  To_chat } from "./utils/Navigations";
function Home() {
  const firebase = useContext(firebaseContext);
  const server = useContext(serverContext);
  const [user, setUser] = useState(firebase?.currentUser);
  const [serverName, setServerName] = useState(null);
  useEffect(() => {
    console.log("triggered firebase update in home");
    setUser(firebase?.currentUser);
  }, [firebase]);
  useEffect(() => {
    console.log("triggered server update in home");
    console.log(server);
    setServerName(server?.serverName);
  }, [server]);

  const navigate = useNavigate();
  function signOut() {
    firebase.signout();
  }
  function createServer() {
    console.log("creating server");
    server.createServer((e) => navigate("/server/" + e));
    console.log("server created" + server.serverName);
  }
  return (
    <>
      <div className="gap-5 d-flex flex-column justify-content-center w-100 mt-5 align-items-center ">
        <Card className=" align-items-stretch rounded-3 w-75  mx-5 px-3 ">
          <Card.Body>
            <div className="user">
              <div className="greet display-2">Hi,</div>
              <div className="user_name display-3">{user?.displayName}</div>
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
        {serverName ? (
          <div className="flex flex-column">
            <div className="display-1">{serverName}</div>
            <To_chat serverName={serverName} />
          </div>
        ) : (
          <div className="d-flex flex-column  align-items-center gap-4 w-75">
            <Button
              onClick={(e) => createServer()}
              className="btn btn-primary display-3"
            >
              Create Server
            </Button>
            <Link to={"/jump"} className="btn btn-primary display-3">
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
