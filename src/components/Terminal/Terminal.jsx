import { faClose, faTerminal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactTerminal } from "react-terminal";
import { TerminalCxt, firebaseContext, serverContext } from "../App";
import "./index.css";
import smallCommands from "./SmallCommands";
function Terminal({ close = function () {}, prompt }) {
  const firebase = useContext(firebaseContext);
  const server = useContext(serverContext);
  const location = useLocation();
  const context = useContext(TerminalCxt);
  const navigate = useNavigate();
  function _close() {
    context.setTerminalVisibility(false);
    close();
  }
  function bye() {
    if (server.server) server.stopServer();
    firebase.signout();
    _close();
  }
  function shutdown() {
    bye();
    //should be able to close the window or something\
    //but is not possible
  }
  function server_details() {
    if (server.server) {
      return (
        <>
          server name: {server.serverName}
          <br />
          {server.isMyServer() ? (
            <>owned by you</>
          ) : (
            <>owner: {server.serverOwner}</>
          )}
          <br />
          server link: {server.getLink()}
        </>
      );
    } else {
      return (
        <>
          server doesn't exist.
          <br />
          use 'create' to create a server.
        </>
      );
    }
  }
  function create_server() {
    if (!server.server) {
      server.createServer(
        () => {
          return <>login first to continue...</>;
        },
        (e) => navigate("/server/" + e)
      );
    } else return "server already exists";
  }
  function stop_server() {
    if (server.server) {
      let x = "stopping server " + server.serverName;
      server.stopServer((e) => {
        navigate("/");
      });
      return x;
    }
    return "server doesn't exist";
  }
  function go() {
    if (server.server) {
      if (!location.pathname.includes("/chat"))
        navigate("/server/" + server.serverName + "/chat");
    }
  }
  function back() {
    if (location.pathname.includes("/chat"))
      navigate("/server/" + server.serverName);
    if (location.pathname.includes("/server/")) {
      navigate("/");
    }
    if (location.pathname.includes("/guides/")) {
      navigate("/");
    }
    if (location.pathname.includes("/jump/")) {
      navigate("/");
    }
  }
  function send(x) {
    if (server.server) {
      if (!location.pathname.includes("/chat")) {
        navigate("/server/" + server.serverName + "/chat");
        server.sendMessage(x);
      }
    } else return "server doesn't exist";
  }
  function send_location() {
    server.sendLocation();
  }
  function ifNotAuthed() {
    console.log("not authed");
  }
  function jump(servName) {
    if (servName) {
      let result = server.jumpToServer(servName, ifNotAuthed);
      if (result) {
        navigate("/server/" + servName + "/chat");
        return <>jumped to server {servName}</>;
      } else {
        return <>unable to jump to server {servName}</>;
      }
    } else {
      navigate("/jump");
      return <>navigating to jump...</>;
    }
  }
  async function copy_server_name() {
    await navigator.clipboard.writeText(server.serverName);
    return <>copied!</>;
  }
  const commands__ = {
    clear: () => {
      console.log("clearing");
    },
    cls: () => {
      console.log("clearing");
    },
    "": () => {},
    help: () => {
      navigate("/guides/terminal");
    },
    ...{
      go: go,
      next: go,
      back: back,
    },
    ...{
      server: server_details,
      create: create_server,
      stop: stop_server,
      jump: jump,
    },
    ...{
      copy_name: copy_server_name,
    },
    ...{
      send: send,
      send_location: send_location,
    },
    ...{
      exit: () => _close(),
      close: () => _close(),
      quit: () => _close(),
      kill: () => _close(),
    },
    bye: () => bye(),
    ...{
      die: () => shutdown(),
      shutdown: () => shutdown(),
    },
    ...smallCommands,
  };
  const textboxRef = useRef();
  return (
    <div
      className="vstack terminal"
      onClick={() => {
        textboxRef?.current?.focus();
      }}
    >
      <div className="hstack justify-content-between">
        <div className="heading">Terminal</div>
        <div className="next hstack gap-2">
          <div className="sub">for the nerds</div>
          <button
            onClick={() => {
              _close();
            }}
            className="btn border-0"
          >
            <div className="terminal-btn">
              <FontAwesomeIcon icon={faClose} size="2x" />
            </div>
          </button>
        </div>
      </div>
      <div className="vstack" style={{ height: "175px" }}>
        <ReactTerminal
          commands={commands__}
          prompt={prompt}
          showControlBar={false}
          errorMessage={<>Command not found</>}
          enableInput={true}
          showControlButtons={false}
          theme={"matrix"}
          themes={{
            matrix: {
              themeBGColor: "transparent",
              themeToolbarColor: "#0D0208",
              themeColor: "#00FF41",
              themePromptColor: "#008F11",
            },
          }}
        />
        {/* <div className="vstack">
          {commandHistory.map((cmd, index) => (
            <div className="terminal-show-prompt" key={index}>
              {cmd}
            </div>
          ))}
        </div>
        <div className="hstack align-items-start">
          <div className="terminal-show-prompt">$home/</div>

          <div className="terminal-real-command w-100">
            <form onSubmit={handleSubmit} className="w-100">
              <input
                type="text"
                ref={textboxRef}
                value={command}
                onChange={(e) => {
                  setCommand(e.target.value);
                }}
                className="terminal-input  outline-0 border-0 w-100 h-100"
              />
            </form>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Terminal;
