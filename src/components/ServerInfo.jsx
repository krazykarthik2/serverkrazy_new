import {
  faArrowRight,
  faCopy,
  faShareAlt,
  faShareNodes,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Back, To_chat } from "./utils/Navigations";
import { TerminalCxt, serverContext } from "./App";
import Terminal from "./Terminal/Terminal";
import { shareServer } from "./utils/js/utils";
function ServerInfo() {
  const server = useContext(serverContext);
  const terminalCxt = useContext(TerminalCxt);
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    if (params.server) {
      if (server.server == null) {
        navigate("/jump/" + params.server, {
          state: {
            continue__: "/server/" + params.server,
            isReloaded: true,
          },
        });
      }
    }
  }, [params]);

  function setTerminalVisibility(e) {
    terminalCxt.setTerminalVisibility(e);
  }
  function stopServer() {
    server.stopServer(() => navigate("/"));
  }
  function exitServer() {
    server.exitServer(() => navigate("/"));
  }
  return (
    <div className="vw-100 vh-100 bg-dark">
      <div className="d-flex flex-column gap-4  h-100">
        <Back />
        <div className="serverInfo w-100 gap-4 justify-content-center vstack align-items-center">
          <div className="serverQr">
            <div className="qr">
              <img
                src={
                  "https://api.qrserver.com/v1/create-qr-code/?size=175x175&data=" +
                  server.getLink()
                }
                alt="server_qr"
              />
            </div>
          </div>
          <div className="serverName h4 fw-bold text-white">
            {server.serverName}
          </div>
          <div className="hstack w-100 justify-content-center gap-4 ">
            {server.isMyServer() ? (
              <button className="btn text-white btn-danger" onClick={() => stopServer()}>
                Stop
              </button>
            ) : (
              <button className="btn text-white" onClick={() => exitServer()}>
                Exit
              </button>
            )}
          </div>
          <div className="hstack w-100 justify-content-center gap-4">
            <button className="btn text-white" onClick={() => shareServer()}>
              <FontAwesomeIcon icon={faShareNodes} size="3x" />
            </button>
            <button
              className="btn text-white"
              onClick={() => navigator.clipboard.writeText(server.getLink())}
            >
              <FontAwesomeIcon icon={faCopy} size="3x" />
            </button>
            <To_chat serverName={server.serverName} />
          </div>
        </div>
        <div className="d-flex justify-content-end px-5">
          {terminalCxt.isVisible ? (
            <Terminal prompt={"$home>"} />
          ) : (
            <button
              className="btn text-white p-5 border-0 outline-0"
              onClick={() => {
                setTerminalVisibility(true);
              }}
              accessKey="T"
            >
              <div className="terminal-btn">
                <FontAwesomeIcon icon={faTerminal} size="2x" />
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ServerInfo;
