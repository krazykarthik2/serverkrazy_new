import {
  faTerminal
} from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect } from "react";
import { TerminalCxt, firebaseContext, msgBucketContext, serverContext } from "../App";
import { Chatting } from "./Chatting";
import { ServerInfoHeading } from "./ServerInfoHeading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import { _delete, _fileDelete } from "../../backend";
import InputType from "./InputType";

function ServerChat() {
  // { firebase, server, msgBucket }
  const firebase = useContext(firebaseContext);
  const server = useContext(serverContext);
  const msgBucket = useContext(msgBucketContext);
  const terminalCxt = useContext(TerminalCxt);
  const navigate = useNavigate();
  
  function handleDelete(key) {
    _delete(server.serverName, key);
  }
  function handleFileDelete(filePath, key) {
    _fileDelete(filePath, server.serverName, key);
  }
  const params = useParams();
  useEffect(()=>{
    if(params.server){
      if(server.server ==null){
        navigate("/jump/"+params.server,{
          state:{
            continue__:"/server/"+params.server+"/chat",
            isReloaded:true
          }
        })
      }
    }
  },[params])
  return (
    <div
      className="vw-100 vh-100 bg-dark text-white vstack justify-content-between"
      style={{
        maxHeight: "100vh",
      }}
    >
      <ServerInfoHeading
        firebase={firebase}
        server={server}
        className="w-100 "
      />
      <div className="hstack h-100 align-items-end overflow-hidden">
        <Chatting
          msgBucket={msgBucket.filter((e) => e)}
          className="w-100 h-100  overflow-auto align-items-end d-center flex-column justify-content-end"
          _delete={handleDelete}
          _fileDelete={handleFileDelete}
          downloadURL={server.downloadURL}
        />
        <div className="vstack justify-content-end">
          {terminalCxt.isVisible ||(
            <button
            className="btn text-white terminal_btn"
              accessKey="t"
              onClick={() => terminalCxt.setTerminalVisibility(true)}
            >
              <FontAwesomeIcon icon={faTerminal} size="2x" />
            </button>
          )}
        </div>
      </div>
      <InputType server={server} className="w-100 " />
    </div>
  );
}

export default ServerChat;
