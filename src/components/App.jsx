import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import {
  BrowserRouter,
  HashRouter,
  MemoryRouter,
  Route,
  Router,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { fb, msgBucket, server } from "../frontend";
import AccountActions from "./Auth/AccountActions";
import ChangePwd from "./Auth/ChangePwd";
import Sign from "./Auth/Sign";
import Home from "./Home";
import JumpToServer from "./JumpToServer";
import ServerChat from "./ServerChat";
import ServerInfo from "./ServerInfo";

const firebaseContext = React.createContext();
const serverContext = React.createContext();
const msgBucketContext = React.createContext();

function App() {
  const [__fb, setFb] = useState(fb);
  const [__server, setServer] = useState(server);
  const [__msgBucket, setMsgBucket] = useState(msgBucket);

  window.__fb = __fb;
  window.__server = __server;
  window.__msgBucket = __msgBucket;

  useEffect(() => {
    server.onServChange = () => {
      setServer(server);
      console.log("triggered server change @App.js");
    };
    fb.onUpdate = () => {
      setFb(fb);
      console.log("triggered firebase change @App.js");
    };

    server.onMsgUpdate = () => {
      setMsgBucket(msgBucket);
      console.log(
        msgBucket.length == 0
          ? ""
          : msgBucket[msgBucket.length - 1].data.message
      );
      console.log("triggered bucket change @App.js");
    };
  });

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
                <Route
                  path="jump"
                  element={<JumpToServer server={__server} />}
                />
              </Routes>
            </BrowserRouter>
          </msgBucketContext.Provider>
        </serverContext.Provider>
      </firebaseContext.Provider>
    </div>
  );
}

export default App;
export { firebaseContext, serverContext, msgBucketContext };
