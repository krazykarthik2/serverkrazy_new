import {
  faArrowRight,
  faCopy,
  faShareAlt,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Back, ServerInfo_to_chat } from "./utils/Navigations";
function ServerInfo({server}) {
  const navigate = useNavigate();
  function stopServer() {
    server.stopServer(() => navigate("/"));
  } 
  function exitServer() {
    server.exitServer(() => navigate("/"));
  }
  return (
    <div className="w-100 h-100">
      <div className="d-flex flex-column gap-3">
        <Back />
        <div className="serverInfo">
          <div className="serverQr">
            <div className="qr">
              <img
                src={
                  "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
                  server.getLink()
                }
                alt="server_qr"
              />
            </div>
          </div>
          <div className="serverName">{server.serverName}</div>
          <div className="flex gap-3">
            <Button className="" onClick={() => stopServer()}>
              Stop
            </Button>
            <Button className="" onClick={() => exitServer()}>
              Exit
            </Button>
          </div>
          <div className="flex gap-3">
            <Button
              className=""
              onClick={() =>
                navigator.share({
                  title: "Jump in to " + server.getLink(),
                  text: server.getLink(),
                  url: server.getLink(),
                })
              }
            >
              <FontAwesomeIcon icon={faShareNodes} size="3x" />
          </Button>
            <Button
              className=""
              onClick={() => navigator.clipboard.writeText(server.getLink())}
            >
              <FontAwesomeIcon icon={faCopy} size="3x" />
            </Button>
            <ServerInfo_to_chat />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServerInfo;
