import {
  faTerminal
} from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from "react";
import { TerminalCxt, firebaseContext, msgBucketContext, serverContext } from "../App";
import { Chatting } from "./Chatting";
import { ServerInfoHeading } from "./ServerInfoHeading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { _delete, _fileDelete } from "../../backend";
import InputType from "./InputType";

function ServerChat() {
  // { firebase, server, msgBucket }
  const firebase = useContext(firebaseContext);
  const server = useContext(serverContext);
  const msgBucket = useContext(msgBucketContext);
  const terminalCxt = useContext(TerminalCxt);
  function handleDelete(key) {
    _delete(server.serverName, key);
  }
  function handleFileDelete(filePath, key) {
    _fileDelete(filePath, server.serverName, key);
  }
  return (
    <div
      className="vw-100 vh-100 bg-dark text-white vstack "
      style={{
        maxHeight: "100vh",
      }}
    >
      <ServerInfoHeading
        firebase={firebase}
        server={server}
        className="w-100 "
      />
      <div className="hstack">
        <Chatting
          msgBucket={msgBucket.filter((e) => e)}
          className="w-100  overflow-auto"
          _delete={handleDelete}
          _fileDelete={handleFileDelete}
          downloadURL={server.downloadURL}
        />
        <div className="vstack">
          {terminalCxt.isVisible ||(
            <Button
              className="terminal_btn"
              accessKey="t"
              onClick={() => terminalCxt.setTerminalVisibility(true)}
            >
              <FontAwesomeIcon icon={faTerminal} size="2x" />
            </Button>
          )}
        </div>
      </div>
      <InputType server={server} className="w-100 " />
    </div>
  );
}

export default ServerChat;
