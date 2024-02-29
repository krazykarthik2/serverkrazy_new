import { faClose, faTerminal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactTerminal } from "react-terminal";
import { TerminalCxt, firebaseContext, serverContext } from "../App";
import "./index.css";
import smallCommands from "./SmallCommands";
import { shareServer, shareThis } from "../utils/js/utils";
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
    if (server.server) {
      if (server.isMyServer()) {
        server.stopServer();
      }
      server.exitServer();
    }
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
      navigate("/server/" + server.serverName);
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
  function home() {
    navigate("/");
  }
  function create_server() {
    if (!server.server) {
      server.createServer(
        () => {
          return <>login first to continue...</>;
        },
        (e) => {
          navigate("/server/" + e);
          return "server created";
        }
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
      }
      server.sendMessage(x);
    } else return "server doesn't exist";
  }
  function send_location() {
    if (server.server) {
      server.sendLocation();
      return "sent location";
    } else return "server doesn't exist";
  }
  function refresh() {
    window.location.reload();
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
  function help_guides() {
    navigate("/guides/terminal");
  }

  async function copy_server_name() {
    await navigator.clipboard.writeText(server.serverName);
    return <>copied!</>;
  }
  async function copy_server_link() {
    await navigator.clipboard.writeText(server.getLink());
    return <>copied!</>;
  }
  function edit_profile() {
    navigate("/profile/edit");
  }
  function edit_auth() {
    navigate("/auth/actions");
  }
  function login() {
    navigate("/auth/login");
  }
  function signout() {
    firebase.signout();
  }
  function signup() {
    navigate("/auth/signup");
  }
  function share() {
    if (server.server) shareServer();
    else shareThis();
  }
  function this_share() {
    shareThis();
  }

  function type() {
    let x = smallCommands.do(...arguments)
    if(x=="[Object Object]")return "object";
    navigate("/server/" + server.serverName + "/chat", {
      state: { messageTyped:new String(x) },
    });
  }
  const commands__ = {
    clear: () => {
      console.log("clearing");
    },
    cls: () => {
      console.log("clearing");
    },
    "": () => {},
    ...{
      help: help_guides,
      guides: help_guides,
    },
    ...{
      go: go,
      chat: go,
      next: go,
      back: back,
      home: home,
      refresh: refresh,
    },
    ...{
      server: server_details,
      ["server.info"]: server_details,
      create: create_server,
      ["server.create"]: create_server,
      stop: stop_server,
      ["server.stop"]: stop_server,
      jump: jump,
      ["server.jump"]: jump,
    },
    ...{
      copy_name: copy_server_name,
      copy_link: copy_server_link,
      share: share,
      ["this.share"]: this_share,
    },
    ...{
      send: send,
      say: send,
      echo:e=>e,
      ["chat.type"]: type,
      type: type,
      ["chat.send"]: send,
      ["chat.send.location"]: send_location,
      send_location: send_location,
    },
    ...{
      ["profile.edit"]: edit_profile,
      ["auth.edit"]: edit_auth,
      ["auth.login"]: login,
      login: login,
      ["auth.logout"]: signout,
      signout: signout,
      ["auth.signup"]: signup,
      signup: signup,
      ["auth.signout"]: signout,
      signout: signout,
    },
    ...{
      exit: _close,
      close: _close,
      quit: _close,
    },
    ...{
      bye: bye,
      kill: bye,
      die: shutdown,
      shutdown: shutdown,
    },
    ...smallCommands,
  };
  const textboxRef = useRef();
  return (
    <div
      className="vstack terminal  user-select-none"
      onClick={() => {
        textboxRef?.current?.focus();
      }}
    >
      <div className="hstack justify-content-between">
        <div className="heading">
          <u>T</u>erminal
        </div>
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
      </div>
    </div>
  );
}

export default Terminal;
