import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { fb, msgBucket, server } from "../frontend";
import AccountActions from "./Auth/AccountActions";
import ChangePwd from "./Auth/ChangePwd";
import DeleteAcc from "./Auth/DeleteAcc";
import ForgotPwd from "./Auth/ForgotPwd";
import ProfileActions from "./Auth/ProfileActions";
import Sign from "./Auth/Sign";
import ServerChat from "./Chatting_Screen/ServerChat";
import Home from "./Home";
import JumpToServer from "./JumpToServer";
import ServerInfo from "./ServerInfo";
import { TerminalContextProvider } from "react-terminal";
import { Cookies, useCookies, withCookies } from "react-cookie";
import Loading from "./utils/Loading";
const firebaseContext = React.createContext();
const serverContext = React.createContext();
const msgBucketContext = React.createContext();

const TerminalCxt = React.createContext();
function App() {
  const [__fb, setFb] = useState(fb);
  const [__server, setServer] = useState(server);
  const [__msgBucket, setMsgBucket] = useState(msgBucket);
  const [_terminalDetails, setTerminalDetails] = useState({ isVisible: false });
  function setTerminalVisibility(visibility) {
    setTerminalDetails((e) => {
      return { ...e, isVisible: visibility };
    });
  }
  const [cookies, setCookies] = useCookies(["serverName"]);
  window._ = { __fb, __server, __msgBucket, cookies };
  function setServCookie(serverName) {
    setCookies("serverName", serverName, { path: "/" });
  }
  const afterLoginTasks = [];
  function afterLogin(e) {
    afterLoginTasks.push(e);
  }
  server.setServCookie = setServCookie;
  useEffect(() => {
    if (cookies.serverName && !server.server) {
      afterLogin(() => {
        server.jumpToServer(cookies.serverName);
      });
    }
  }, [cookies]);
  useEffect(() => {
    const handleServerChange = () => {
      setServer({ ...server });
      console.log("triggered server change @App.js");
    };

    const handleFbUpdate = () => {
      if (fb.currentUser != null) {
        if (afterLoginTasks.length > 0) {
          afterLoginTasks.forEach((e) => e());
        }
      }
      setFb({ ...fb });
      console.log("triggered firebase change @App.js");
    };

    const handleMsgUpdate = () => {
      setMsgBucket([...msgBucket]);

      console.log("triggered bucket change @App.js");
    };

    server.onServerChange = handleServerChange;
    fb.onUpdate = handleFbUpdate;
    server.onMsgUpdate = handleMsgUpdate;

    return () => {
      server.onServerChange = null;
      fb.onUpdate = null;
      server.onMsgUpdate = null;
    };
  }, [server, fb, msgBucket]);

  return (
  
      <firebaseContext.Provider value={__fb}>
        <serverContext.Provider value={__server}>
          <msgBucketContext.Provider value={__msgBucket}>
            <TerminalCxt.Provider
              value={{
                ..._terminalDetails,
                setTerminalVisibility,
              }}
              prop="katre"
            >
              <TerminalContextProvider>
                <BrowserRouter>
                  <Routes>
                    <Route
                      path="/loading"
                      element={
                        <Loading
                          className="w-100 h-100 d-center flex-column"
                          loadingText="loading jump interface"
                        />
                      }
                    />
                    <Route path="/" element={<Home />} />
                    <Route path="/server/:server">
                      <Route path="" element={<ServerInfo />} />
                      <Route path="chat" element={<ServerChat />} />
                    </Route>

                    <Route path="/auth">
                      <Route path="deleteAcc">
                        <Route path="" element={<DeleteAcc />} />
                        <Route
                          path="continue/:continue"
                          element={<DeleteAcc />}
                        />
                      </Route>
                      <Route
                        path="login"
                        element={<Sign hasAccount={true} />}
                      />
                      <Route
                        path="signup"
                        element={<Sign hasAccount={false} />}
                      />
                      <Route path="changepass" element={<ChangePwd />} />
                      <Route path="actions" element={<AccountActions />} />
                      <Route path="forgotpass">
                        <Route path="" element={<ForgotPwd />} />
                        <Route path=":email" element={<ForgotPwd />} />
                      </Route>
                    </Route>
                    <Route path="profile">
                      <Route path="" element={<AccountActions />} />
                      <Route path="edit" element={<ProfileActions />} />
                    </Route>
                    <Route path="jump">
                      <Route path="" element={<JumpToServer />} />
                      <Route path=":server" element={<JumpToServer />} />
                    </Route>
                  </Routes>
                </BrowserRouter>
              </TerminalContextProvider>
            </TerminalCxt.Provider>
          </msgBucketContext.Provider>
        </serverContext.Provider>
      </firebaseContext.Provider>
    
  );
}

export default App;
export { firebaseContext, msgBucketContext, serverContext, TerminalCxt };
