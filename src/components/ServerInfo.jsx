import {
  faArrowRight,
  faCopy,
  faShareAlt,
  faShareNodes,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Back, To_chat } from "./utils/Navigations";
import { TerminalCxt, serverContext } from "./App";
import Terminal from "./Terminal/Terminal";
import {shareServer }from "./utils/js/utils";
function ServerInfo() {
  const server = useContext(serverContext);
  const terminalCxt = useContext(TerminalCxt);
  function setTerminalVisibility(e) {
    terminalCxt.setTerminalVisibility(e);
  }
  const navigate = useNavigate();
  function stopServer() {
    server.stopServer(() => navigate("/"));
  }
  function exitServer() {
    server.exitServer(() => navigate("/"));
  }
  return (
    <div className="vw-100 vh-100 bg-secondary">
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
          <div className="flex ">
            {server.isMyServer() ? (
              <Button className="" onClick={() => stopServer()}>
                Stop
              </Button>
            ) : (
              <Button className="" onClick={() => exitServer()}>
                Exit
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            <Button
              className=""
              onClick={() =>
                shareServer()
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
            <To_chat serverName={server.serverName} />
          </div>
        </div>
        {terminalCxt.isVisible ? (
          <Terminal prompt={"$home>"} />
        ) : (
          <Button
            onClick={() => {
              setTerminalVisibility(true);
            }}
            accessKey="T"
          >
            <div className="terminal-btn">
              <FontAwesomeIcon icon={faTerminal} size="2x" />
            </div>
          </Button>
        )}
      </div>
    </div>
  );

  
}

export default ServerInfo;
