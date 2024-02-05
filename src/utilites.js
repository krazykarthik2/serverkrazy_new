function processForParams(hypertext) {
  var idx = hypertext.indexOf("?");
  var params = new Array();
  if (idx != -1) {
    var pairs = hypertext.substring(idx + 1, hypertext.length).split("&");
    for (var i = 0; i < pairs.length; i++) {
      let nameVal = pairs[i].split("=");
      params[nameVal[0]] = unescape(nameVal[1]);
    }
  }
  return params;
}
let _ = (e) => document.querySelector(e);
let log = (e) => {
  console.log(e);
  return e;
};
function getParams() {
  return processForParams(document.URL);
}
function manageErrorFireBase(error) {
  if (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var errCredential = error.credential;
    console.error(
      "code:" + errorCode,
      "message:" + errorMessage,
      "error email:" + email,
      "cred:" + errCredential
    );

    switch (errorCode) {
      case "auth/email-already-in-use":
        alert("YouAlrRegistered");
        break;
      case "auth/wrong-password":
        alert("wrongPassword3rd");
        break;
      case "auth/too-many-requests":
        alert("too  many requests account has been temporarily disabled...");
        break;
      case "auth/user-not-found":
        alert("userNotFound");
        break;
      case "auth/invalid-email":
        alert("invalidEmail");
        break;
      case "auth/user-mismatch":
        alert("User mis matched.Use same account");
        break;
      case "auth/operation-not-allowed":
        alert("operationNotAllowed");
        break;
      case "auth/weak-password":
        alert("weakPassword");
        break;
      case "auth/invalid-credential":
        alert("invalidCredential");
        break;
      case "auth/popup-blocked":
        alert("give permission for pop up and try again");
        break;
      case "auth/network-request-failed":
        alert("networkRequestFailed");
        break;
      case "auth/invalid-login-credentials":
        alert("invalidLoginCredentials");
        break;
    }
  }
}
function getThumb(link, size, callback = function () {}) {
  let img = document.createElement("img");
  img.crossOrigin = "anonymous";
  img.addEventListener("load", () => {
    let canv = document.createElement("canvas");
    canv.width = canv.height = size;
    let ctx = canv.getContext("2d");
    ctx.drawImage(img, 0, 0, size, size);
    callback(canv.toDataURL());
  });
  img.src = link;
}
///////////////////////////
function auto_height(elem) {
  /* javascript */
  elem.style.height = "1px";
  elem.style.height = elem.scrollHeight + "px";
}

function getRandomString(length) {
  return Math.random()
    .toString(36)
    .slice(2, 2 + length);
}
function fallbackutil(real, fallback) {
  return real == null || real == undefined || real == "" ? fallback : real;
}
function timestamp() {
  let date_now_ms = new Date();
  return date_now_ms.valueOf();
}
function isMobile() {
  const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent);
}

export {
  _,
  log,
  getThumb,
  getRandomString,
  auto_height,
  fallbackutil,
  timestamp,
  getParams,
  manageErrorFireBase,
  isMobile,
};
