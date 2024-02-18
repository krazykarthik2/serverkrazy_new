import React, { useContext, useEffect, useMemo } from "react";
import {
  faArrowLeft,
  faLocation,
  faLocationArrow,
  faLocationPinLock,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { firebaseContext, serverContext, msgBucketContext } from "../App";
import { ServerInfoHeading } from "./ServerInfoHeading";
import { Chatting } from "./Chatting";
import { InputType } from "./InputType";
import {_delete, _fileDelete} from "../../backend";
function ServerChat() {
  // { firebase, server, msgBucket }
  const firebase = useContext(firebaseContext);
  const server = useContext(serverContext);
  const msgBucket = useContext(msgBucketContext);
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
      <Chatting
        msgBucket={msgBucket.filter(e=>e)}
        className="w-100  overflow-auto"
        _delete={handleDelete}
        _fileDelete={handleFileDelete}
        downloadURL={server.downloadURL}
      />
      <InputType server={server} className="w-100 " />
    </div>
  );
}

export default ServerChat;
