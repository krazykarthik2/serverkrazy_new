import { createContext } from "react";
import FBmanage, { Server } from "../src/backend";

import fbconfig from "../src/json/firebaseConfig";

let fb = new FBmanage(fbconfig);

console.log(fb);
fb.init();

fb.whenSignOut = () => {
  if (
    window.location.pathname == "/auth/login" ||
    window.location.pathname == "/auth/signup"
  ) {
  } else {
    window.location.pathname = "/auth/login";
  }
};
let msgBucket = [];
let server = new Server(fb, msgBucket);
window.server = server;
window.firebase = fb;
window.msgBucket = msgBucket;
export { fb, server, msgBucket };
