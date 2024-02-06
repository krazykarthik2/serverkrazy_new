import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { fb, msgBucket, server } from "../frontend";
import AccountActions from "./Auth/AccountActions";
import ChangePwd from "./Auth/ChangePwd";
import Sign from "./Auth/Sign";
import ServerChat from "./Chatting_Screen/ServerChat";
import Home from "./Home";
import JumpToServer from "./JumpToServer";
import ServerInfo from "./ServerInfo";
import EditProfile from "./Profile/Edit/EditProfile";
import DeleteAcc from "./Auth/DeleteAcc";
const firebaseContext = React.createContext();
const serverContext = React.createContext();
const msgBucketContext = React.createContext();

function App() {
  const [__fb, setFb] = useState(fb);
  const [__server, setServer] = useState(server);
  const [__msgBucket, setMsgBucket] = useState(msgBucket);

  window._ = { __fb, __server, __msgBucket };

  useEffect(() => {
    const handleServerChange = () => {
      setServer({ ...server });
      console.log("triggered server change @App.js");
    };

    const handleFbUpdate = () => {
      setFb({ ...fb });
      console.log("triggered firebase change @App.js");
    };

    const handleMsgUpdate = () => {
      setMsgBucket([...msgBucket]);

      console.log("triggered bucket change @App.js");
    };

    server.onServChange = handleServerChange;
    fb.onUpdate = handleFbUpdate;
    server.onMsgUpdate = handleMsgUpdate;

    return () => {
      server.onServChange = null;
      fb.onUpdate = null;
      server.onMsgUpdate = null;
    };
  }, [server, fb, msgBucket]);

  return (
    <div>
      <firebaseContext.Provider value={__fb}>
        <serverContext.Provider value={__server}>
          <msgBucketContext.Provider value={__msgBucket}>
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={<Home firebase={__fb} server={__server} />}
                />
                <Route path="/server/:server">
                  <Route path="" element={<ServerInfo server={__server} />} />
                  <Route
                    path="chat"
                    element={
                      <ServerChat
                        msgBucket={__msgBucket}
                        server={__server}
                        firebase={__fb}
                      />
                    }
                  />
                </Route>

                <Route path="/auth">
                  <Route path="deleteAcc">
                    
                  <Route path="" element={<DeleteAcc />} />
                  <Route path="continue/:continue" element={<DeleteAcc />} />
                  </Route>
                  <Route
                    path="login"
                    element={<Sign hasAccount={true} firebase={__fb} />}
                  />
                  <Route
                    path="signup"
                    element={<Sign hasAccount={false} firebase={__fb} />}
                  />
                  <Route
                    path="changepass"
                    element={<ChangePwd firebase={__fb} />}
                  />
                  <Route
                    path="actions"
                    element={<AccountActions firebase={__fb} />}
                  />
                </Route>
                <Route path="/profile">
                  <Route path="" element={<AccountActions firebase={__fb} />} />
                  <Route path="edit" element={<EditProfile />} />
                </Route>
                <Route path="jump">
                  <Route path="" element={<JumpToServer server={__server} />} />
                  <Route
                    path=":server"
                    element={<JumpToServer server={__server} />}
                  />
                </Route>
              </Routes>
            </BrowserRouter>
          </msgBucketContext.Provider>
        </serverContext.Provider>
      </firebaseContext.Provider>
    </div>
  );
}

export default App;
export { firebaseContext, msgBucketContext, serverContext };
