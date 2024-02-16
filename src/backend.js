// import { HTMLforFile } from "./utilComponents/HTMLforFile";
// import TEMPLATEfile from "./utilComponents/TEMPLATEfile";
// import TEMPLATEmsg from "./utilComponents/TEMPLATEmsg";
import {
  ref as refStorage,
  put,
  uploadBytesResumable,
  getStorage,
  deleteObject,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  getAuth,
  updatePassword,
  reauthenticateWithPopup,
  updateProfile,
  sendEmailVerification,
  reauthenticateWithCredential,
  linkWithPopup,
  unlink as unlinkProvider,
  reload,
  AuthCredential,
  EmailAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  child,
  getDatabase,
  off,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  onValue,
  push,
  ref,
  remove,
  update,
} from "firebase/database";
import {
  getThumb,
  manageErrorFireBase,
  log,
  _,
  getRandomString,
  getParams,
  timestamp,
} from "./utilites.js";
let TEMPLATEfile = () => {};
let HTMLforFile = () => {};
let TEMPLATEmsg = () => {};

const firebase = {
  storage: getStorage,
  database: getDatabase,
  auth: getAuth,
};
function updateSettings() {}
let _delete = (key, dbkey) => {
  remove(child(ref(firebase.database(), key + "/data"), dbkey));
};
let _fileDelete = (filePath, servkey, key) => {
  // Delete the file
  deleteObject(refStorage(firebase.storage(), "/" + filePath)).then(() => {
    log("File deleted successfully");
    _delete(servkey, key);
  });
};
// function whenSignOut() {

// }
// function whenSignIn(user) {

//     // _("#DeepDsetails #isAnon").innerHTML = (user.isAnonymous) ? 'Anonymous' : 'Not Anonymous';
//     // _("#DeepDetails #EmailVer").innerHTML = (user.emailVerified) ? 'Verified' : 'Not Verified';
//     // _("#DeepDetails #providerDetails").innerHTML = '';
//     // _("#DeepDetails").classList.value = '';

//     // user.providerData.forEach(provDat => {
//     //     _("#DeepDetails").classList.value += ' ' + provDat.providerId.replaceAll('.com', '');

//     //     _("#DeepDetails #providerDetails").innerHTML +=
//     //         `< div class="dat"   >
//     //     <img class="provImg" src="${provDat.photoURL}">
//     //     <div class="provDatAcDet">
//     //         <div class="provName">${provDat.displayName}</div>
//     //         <div class="provId">${provDat.providerId}</div>
//     //         <div class="provEmail">${provDat.email}</div>
//     //         <div class="provuid">${provDat.uid}</div>
//     //     </div>`
//     //         + ((user.providerData.length != 1) ?
//     //             `<button class="unlinkprov" iconRound onclick="unlink('${provDat.providerId}')">link_off</button>` : ``)
//     //         + `</div>`;
//     // });

// }

class Server {
  constructor(fbObject, msgbucket) {
    this.server = null;
    this.serverName = null;
    this.serverOwner = null;
    this.msgbucket = msgbucket;
    this.fbobj = fbObject;
    this.paramsURL = getParams();
  }
  getLink = () => {
    return "https://servercrazy.web.app/jump/" + this.serverName;
  };
  onServChange = () => {};
  onMsgUpdate = () => {};

  downloadURL = async (filePath) => {
    return await getDownloadURL(refStorage(firebase.storage(), filePath));
  };
  handlemsg = (data, mine) => {
    let msgData = { ...data.val(), key: data.key };

    this.msgbucket.push({ ...msgData, mine });
    this.onMsgUpdate();
  };
  handlemsgChange = (data, mine) => {
    let msgData = { ...data.val(), key: data.key };
    this.msgbucket[
      this.msgbucket.findIndex((msg) => msg && msg.key == data.key)
    ] = {
      ...msgData,
      mine,
    };
    this.onMsgUpdate();
  };
  handlemsgDelete = (key) => {
    // console.log(...args);
    // DeleteMessageUI(data.key);
    console.log(key + " deleted");

    delete this.msgbucket[this.msgbucket.findIndex((msg) => msg?.key == key)];
    this.onMsgUpdate();
  };
  findFileInURL = () => {
    if (this.paramsURL["server"]) {
      this.jumpToServer(this.paramsURL["server"]);
      delete this.paramsURL["server"];
    }
    if (this.paramsURL["img"]) {
      getDownloadURL(
        refStorage(firebase.storage(), "/" + this.paramsURL["img"])
      ).then((fileURL) => {
        alert(
          `<section class="impNotify screen">${HTMLforFile(
            "image",
            fileURL
          )}<a class="icon link" target="_blank" href="${
            window.location.origin +
            window.location.pathname +
            "?img=" +
            this.paramsURL["img"]
          }"></a> </section>`
        );
      });
    }
    if (this.paramsURL["vid"]) {
      firebase
        .storage()
        .ref(this.paramsURL["vid"])
        .getDownloadURL()
        .then((fileURL) => {
          alert(
            `<section class="impNotify screen">${HTMLforFile(
              "video",
              fileURL,
              ""
            )}<a class="icon link" target="_blank" href="${
              window.location.origin +
              window.location.pathname +
              "?vid=" +
              this.paramsURL["vid"]
            }"></a> </section>`
          );
        });
    }
    if (this.paramsURL["aud"]) {
      firebase
        .storage()
        .ref(this.paramsURL["aud"])
        .getDownloadURL()
        .then((fileURL) => {
          alert(
            `<section class="impNotify screen">${HTMLforFile(
              "audio",
              fileURL,
              ""
            )}<a class="icon link" target="_blank" href="${
              window.location.origin +
              window.location.pathname +
              "?aud=" +
              this.paramsURL["aud"]
            }"></a> </section>`
          );
        });
    }
    if (this.paramsURL["file"]) {
      firebase
        .storage()
        .ref(this.paramsURL["file"])
        .getDownloadURL()
        .then((fileURL) => {
          alert(
            `<section class="impNotify screen">${HTMLforFile(
              "",
              fileURL,
              ""
            )}<a class="icon link" target="_blank" href="${
              window.location.origin +
              window.location.pathname +
              "?file=" +
              this.paramsURL["file"]
            }"></a> </section>`
          );
        });
    }
  };

  createServer = (callback = function () {}) => {
    if (this.server != null) {
      alert("server exists");
    } else {
      if (this.fbobj)
        if (this.fbobj.currentUser != null) {
          this.serverName = getRandomString(8);
          onValue(
            ref(firebase.database(), this.serverName),
            (data) => {
              console.log("server snapshot:", data);
              console.log(data);

              this.server = ref(firebase.database(), this.serverName);
              push(child(this.server, "serverDetails"), {
                owner: this.fbobj.currentUser.uid,
                ownerName: this.fbobj.currentUser.displayName,
                created: timestamp(),
              });
              this.serverOwner = this.fbobj.currentUser.uid;
              this.onServChange();
              this.setupServer();

              callback(this.serverName);
            },
            { onlyOnce: true }
          );
        } else {
          alert("Log in to continue....");
        }
    }
  };

  setupServer = () => {
    onValue(
      this.server,
      (serverSnapShot) => {
        if (!serverSnapShot.exists()) {
          // notice("#messageBucket", `server${serverSnapShot.key} was deleted... `);
          this.server = null;
          this.serverOwner = "";
          this.serverName = "";
          // notice("#messageBucket", 'left from server');
          this.onServChange();
        }
        // notice("#messageBucket", `<div id="serverQr" ><img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURI(window.location.origin + window.location.pathname + '?server=' + this.server.key)}&ecc=L"/><div ><button id="ServerIdCopier" onclick="navigator.clipboard.writeText('${this.server.key}').then(()=>{_('#ServerIdCopier').classList.value='copied'; setTimeout(()=>{  _('#ServerIdCopier').classList.value=''  },1000)    })" ><div>${this.server.key}<i class="fa fa-clipboard" > </i></div><div id="copiedAlert">Copied<i class='fa fa-check'></i></div></button>${(navigator.share) ? `<button iconround onclick="navigator.share({title: 'Share ServerKrazy',text: 'Try this cool website to share data!',url: '${window.location.origin + window.location.pathname + '?server=' + this.server.key}',})">share</button>` : ''}</div></div><div>`
        //  + log(`server ${this.server.key} Created at ${new Date(data.val().created)} by ownerName:${data.val().ownerName} bearing uid:${data.val().owner}`)
        // + `</div>`);
      },
      { onlyOnce: true }
    );

    this.channels = {
      ServerDetails: child(this.server, "serverDetails"),
      data: child(this.server, "data"),
    };
    onChildAdded(child(this.server, "serverDetails"), (data) => {
      this.serverOwner = data.val().owner;
      this.onServChange();
    });

    onChildAdded(child(this.server, "data"), (data) => {
      this.handlemsg(data, this.isMine(data.val().sender));
    });

    this.onChildChanged = onChildChanged(child(this.server, "data"), (data) => {
      console.log("msg changed:", data);
      this.handlemsgChange(data, this.isMine(data.val().sender));
    });

    this.onChildRemoved = onChildRemoved(child(this.server, "data"), (data) => {
      this.handlemsgDelete(data.key);
    });
  };
  jumpToServer = (server_shared_name, callback = function () {}) => {
    if (this.server != null) {
      alert("server exists");
      return false;
    } else {
      if (server_shared_name != "") {
        if (this.fbobj.currentUser != null) {
          onValue(
            ref(firebase.database(), server_shared_name),
            (data) => {
              if (data.exists()) {
                this.serverName = server_shared_name;

                this.server = ref(firebase.database(), server_shared_name);

                // notice("#messageBucket", "Successfully jumped to server:" +this.serverName);
                this.setupServer();
                callback(true);
                return true;
              } else {
                alert("Server doesn`t exist");
                this.onServChange();

                callback(false);

                return false;
              }
            },
            { onlyOnce: true }
          );
        } else {
          alert("log in to continue....");
        }
      }
      return false;
    }
  };

  getSnapshot(task) {
    let snapshot = task.snapshot;
    log(task);
    log(snapshot);
    if (snapshot.state == "running") {
      console.log(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100 + "%"
      );
      this.getSnapshot(snapshot.task);
    }
  }
  isMine = (sender) => {
    if (sender == this.fbobj.currentUser.uid) return "me";
    else return "";
  };
  sendQr = (qrContent, size) => {
    if (this.fbobj.currentUser != null) {
      if (this.server != null) {
        push(child(this.server, "data"), {
          title: "qr",
          message: this.encrypt(qrContent),
          time: timestamp(),
          sender: this.fbobj.currentUser.uid,
          senderName: this.fbobj.currentUser.displayName,
          senderPhoto: this.fbobj.thumbPic,

          fileType: "image",
          fileName: "qrcode",
          isStoredinFB: false,
          filePath: `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURI(
            qrContent
          )}&enconding=L`,
        });
      }
    }
  };
  sendFile = (message_to_be_sent, file) => {
    if (this.fbobj.currentUser != null) {
      if (this.server != null) {
        push(child(this.server, "data"), {
          title: "file",
          message: this.encrypt(message_to_be_sent),
          time: timestamp(),
          sender: this.fbobj.currentUser.uid,
          senderName: this.fbobj.currentUser.displayName,
          senderPhoto: this.fbobj.thumbPic,

          fileType: file.type,
          fileName: file.name,
          isStoredinFB: true,
          filePath: "",
          bytesTransferred: 0,
          totalBytes: file.size,
        }).then((data) => {
          let uploadTask =
            ///todo:: upload file

            uploadBytesResumable(
              refStorage(
                firebase.storage(),
                this.serverName + "/" + getRandomString(5)
              ),
              file
            );
          log(uploadTask);

          uploadTask.on(
            "state_changed",
            (progress) => {
              update(data, {
                bytesTransferred: progress.bytesTransferred,
              });
            },
            (err) => {
              console.error(`${err}:error at uploading file`);
            }
          );

          uploadTask.then((snapshot) => {
            update(data, {
              filePath: snapshot.metadata.fullPath,
            });
            console.log(file.name + " is uploaded...");
          });
        });
      }
    }
  };
  sendLocation = (message_to_be_sent) => {
    if (this.fbobj.currentUser != null) {
      if (this.server != null) {
        this.getLocation(null, (coords) => {
          push(child(this.server, "data"), {
            title: "loc",
            message: this.encrypt(message_to_be_sent),
            time: timestamp(),
            sender: this.fbobj.currentUser.uid,
            senderName: this.fbobj.currentUser.displayName,
            senderPhoto: this.fbobj.thumbPic,

            lat: coords.latitude,
            lon: coords.longitude,
            acc: coords.accuracy,
          });
        });
      }
    }
  };
  getLocation = (
    options = null,
    callback = function () {},
    error = function (err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
  ) => {
    if (options == null)
      options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      };
    function success(pos) {
      const crd = pos.coords;

      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      callback(crd);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  };
  sendMessage = (message_to_be_sent) => {
    if (message_to_be_sent == "") {
      //   _("#messageIn").focus();
      return;
    } else if (message_to_be_sent.startsWith("\\\\")) {
      message_to_be_sent = eval(message_to_be_sent.substr(2));
    } else if (message_to_be_sent.startsWith("\\")) {
      eval(message_to_be_sent.substr(1));
      return;
    }

    if (this.fbobj.currentUser != null) {
      push(child(this.server, "data"), {
        title: "message",
        message: this.encrypt(message_to_be_sent),
        time: timestamp(),
        sender: this.fbobj.currentUser.uid,
        senderName: this.fbobj.currentUser.displayName,
        senderPhoto: this.fbobj.thumbPic,
      });
    }
  };
  encrypt = (e) => {
    return e.toString();
  };
  decrypt = (e) => {
    return e
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll("\n", "<br/>");
  };
  exitServer = (callback = function () {}) => {
    if (this.server != null) {
      this.msgbucket.length = 0;

      off(this.channels.ServerDetails);
      off(this.channels.data);
      this.server = null;

      callback();
    } else alert("already left from server");
    this.serverName = "";
    this.serverOwner = "";
    this.onServChange();
  };
  stopServer = (callback = function () {}) => {
    if (this.server != null) {
      if (this.serverOwner == this.fbobj.currentUser.uid)
        remove(this.server)
          .then(() => {
            listAll(refStorage(firebase.storage(), this.serverName))
              .then((res) => {
                res.items.forEach((item) => {
                  deleteObject(item)
                    .then(() => {})
                    .catch((err) => {
                      console.log(err);
                      manageErrorFireBase(err);
                    });
                });
              })
              .catch((err) => {
                console.log(err);
              });
            this.server = null;
            this.serverName = "";
            this.serverOwner = "";
            this.onServChange();
            callback();
          })
          .catch((err) => {
            console.error(err);
            this.server = null;
            this.serverName = "";
            this.serverOwner = "";
            this.onServChange();
            callback();
          });
      else {
        this.server = null;
        this.msgbucket.length = 0;
        callback();

        this.serverName = "";
        this.serverOwner = "";
        this.onServChange();
      }
    } else {
      alert("already left from server");
      this.serverName = "";
      this.serverOwner = "";
      this.onServChange();
      callback();
    }
  };
  HTMLforFileDel = (sender, filePath, key) => {
    if (sender == this.fbobj.currentUser.uid)
      return `<button class="deleteBtn btnDum" onclick='_fileDelete("${filePath}","${this.server.key}","${key}");this.remove();'><i class="fa fa-trash trashIcon"></i></button>`;
    else return "";
  };
  HTMLforDel = (sender, key) => {
    if (sender == this.fbobj.currentUser.uid)
      return `<button class="deleteBtn btnDum" onclick='_delete("${this.server.key}","${key}");this.remove();'><i class="fa fa-trash trashIcon"></i></button>`;
    else return "";
  };
}

function processShortNotat(e) {
  if (e.startsWith("image")) return "img";
  else if (e.startsWith("audio")) return "aud";
  else if (e.startsWith("video")) return "vid";
  else return "file";
}
let DeleteMessageUI = (key) => {
  //   if (_("#" + key)) {
  //     _("#" + key).classList.add("deleted");
  //     if (_("#" + key + " .text")) _("#" + key + " .text").innerHTML = "";
  //     if (_("#" + key + " a.file")) _("#" + key + " a.file").remove();
  //     setTimeout(() => {
  //       $("#" + key).animate({ height: 0 }, 100);
  //     }, 2000);
  //     setTimeout(() => {
  //       _("#" + key).remove();
  //     }, 2500);
  //   }
};

class FBmanage {
  constructor(fbconfig) {
    this.fbconfig = fbconfig;
    this.credential = null;
    this.key = null;
  }
  //todo:update hook whenever a change happens
  whenSignIn = (user) => {};
  whenSignOut = () => {};
  onUpdate = () => {};
  firstLogin = () => {};
  isfirstLogin = true;
  providers = () => {
    let providerList = [];
    if (this.currentUser)
      this.currentUser.providerData.forEach((prov) => {
        providerList.push(prov.providerId);
      });
    return providerList;
  };
  profilePic = "";
  profPiconFB = false;
  thumbPic = "";

  updateProfPic = (callback = function () {}) => {
    if (this.currentUser.photoURL) {
      if (this.currentUser.photoURL.startsWith("https://lh3")) {
        this.profilePic = this.currentUser.photoURL;
        this.profPiconFB = false;
        callback();
      } else {
        this.profPiconFB = true;
        getDownloadURL(refStorage(this.currentUser.photoURL)).then(
          (fileURL) => {
            this.profilePic = fileURL;
            callback();
          }
        );
      }
    }
  };
  updateProviderData = (user) => {
    this.key = user?.uid;
    this.currentUser = user;

    if (user == null) {
      this.profilePic = "";
      this.thumbPic = "";
      this.credential = null;
      this.token = null;
      this.whenSignOut();
    } else {
      this.updateProfPic(() => {
        getThumb(this.profilePic, 30, (res) => {
          this.thumbPic = res;
        });

        if (this.isfirstLogin) {
          console.log("first login");
          this.firstLogin();
          this.isfirstLogin = false;
        }

        this.whenSignIn(user);
      });
    }
    this.onUpdate();
  };

  init = () => {
    initializeApp(this.fbconfig);

    getRedirectResult(firebase.auth())
      .then((result) => {
        if (result) {
          if (result.credential) {
            this.credential = result.credential;
            this.token = this.credential.accessToken;
            console.log("token:" + this.token, "cred:" + this.credential);
          }
          this.updateProviderData(result.user);
        }
      })
      .catch((error) => {
        manageErrorFireBase(error);
      });

    onAuthStateChanged(firebase.auth(), (auth_user) => {
      this.updateProviderData(auth_user);
    });
  };
  verifyEmail = () => {
    sendEmailVerification(this.currentUser)
      .then(() => {
        alert("Email has been sent to your account");
      })
      .catch((error) => {});
  };
  sendPasswordResetEmailtoUser = (email, callback = () => {}) => {
    sendPasswordResetEmail(firebase.auth(), email)
      .then(() => {
        callback();
      })
      .catch((err) => {
        callback();
      });
  };
  changePassword = (newPass, oldPass, callback = function () {}) => {
    if (this.credential) {
      reauthenticateWithCredential(this.currentUser, this.credential).then(
        () => {
          this.modifyPass(newPass);
          callback();
        }
      );
    } else
      this.signInWithPass(this.currentUser.email, oldPass, () => {
        this.modifyPass(newPass);
        callback();
      });
  };
  modifyPass = (newPass) => {
    updatePassword(this.currentUser, newPass)
      .then(() => {
        this.updateProviderData(this.currentUser);
      })
      .catch((error) => {
        this.updateProviderData(this.currentUser);

        manageErrorFireBase(error);
      });
  };
  deleteAccount = (oldPass) => {
    if (window.confirm("Do you really want to delete your account???")) {
      if (this.credential)
        reauthenticateWithCredential(this.currentUser, this.credential).then(
          () => {
            this.currentUser.delete();
          }
        );
      else
        this.signInWithPass(this.currentUser.email, oldPass, () => {
          this.currentUser.delete();
        });
    }
  };

  signinGoogle = (callback = function () {}) => {
    // console.log("signinGoogle");
    let provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
    provider.addScope("https://www.googleapis.com/auth/userinfo.email");
    provider.addScope("https://www.googleapis.com/auth/plus.login");
    provider.addScope("https://www.googleapis.com/auth/plus.me");
    provider.addScope("https://www.googleapis.com/auth/user.birthday.read");
    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
    provider.addScope("email");
    signInWithPopup(firebase.auth(), provider)
      .then((result) => {
        log(result);
        if (result)
          if (result.credential) {
            this.credential = result.credential;
            this.token = this.credential.accessToken;
            console.log("token:" + this.token, "cred:" + this.credential);
          }
        this.updateProviderData(result.user);
        callback();
      })
      .catch((error) => {
        manageErrorFireBase(error);
        if (error.code == "auth/popup-blocked") {
          signInWithRedirect(firebase.auth(), provider);
          //try signing in with the redirect policy
        }
      });
  };

  signinFacebook = (callback = function () {}) => {
    let provider = new FacebookAuthProvider();
    signInWithPopup(firebase.auth(), provider)
      .then((result) => {
        log(result);
        if (result)
          if (result.credential) {
            this.credential = result.credential;
            this.token = this.credential.accessToken;
            console.log("token:" + this.token, "cred:" + this.credential);
          }
        this.updateProviderData(result.user);

        callback();
      })
      .catch((error) => {
        manageErrorFireBase(error);
        if (error.code == "auth/popup-blocked") {
          signInWithRedirect(firebase.auth(), provider);
          //try signing in with the redirect policy
        }
      });
  };
  signout = (callback = function () {}) => {
    signOut(firebase.auth())
      .then(() => {
        this.credential = null;
        this.token = null;
        this.updateProviderData(null);
        callback(true);
      })
      .catch((error) => {
        callback(false);
      });
  };
  reAuthGoogle = (callback = function () {}) => {
    let provider = new GoogleAuthProvider();
    this.reAuth(provider, GoogleAuthProvider.credentialFromResult, callback);
  };
  reAuthFacebook = (callback = function () {}) => {
    let provider = new FacebookAuthProvider();
    this.reAuth(provider, GoogleAuthProvider.credentialFromResult, callback);
  };
  reAuth = (prov, getCred, callback = function () {}) => {
    reauthenticateWithPopup(this.currentUser, prov)
      .then((result) => {
        log(result);
        log("from reauth@ backend.js");
        if (result)
          if (result.user) {
            console.log(prov);
            this.token = result.user.accessToken;
            this.credential = getCred(result);
            console.log("token:" + this.token, "cred:" + this.credential);
          }
        this.updateProviderData(result.user);
        callback();
      })
      .catch((error) => {
        manageErrorFireBase(error);
        if (error.code == "auth/popup-blocked") {
          signInWithRedirect(this.auth, prov);
          //try signing in with the redirect policy
        }
      });
  };
  linkGoogle = () => {
    let provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
    provider.addScope("https://www.googleapis.com/auth/userinfo.email");
    provider.addScope("https://www.googleapis.com/auth/plus.login");
    provider.addScope("https://www.googleapis.com/auth/plus.me");
    provider.addScope("https://www.googleapis.com/auth/user.birthday.read");
    provider.addScope("email");

    linkWithPopup(this.currentUser, provider)
      .then((result) => {
        log(result);
        if (result.user) {
          this.credential = GoogleAuthProvider.credentialFromResult(result);
          this.token = this.credential.accessToken;
          console.log("token:" + this.token, "cred:" + this.credential);
        }

        this.updateProviderData(this.currentUser);
      })
      .catch((error) => {
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

        if (errorCode == "auth/popup-blocked") {
          alert("give permission for pop up and try again");
        }
      });
  };
  linkFacebook = () => {
    let provider = new FacebookAuthProvider();

    linkWithPopup(this.currentUser, provider)
      .then((result) => {
        log(result);
        if (result.user) {
          this.credential = FacebookAuthProvider.credentialFromResult(result);
          this.token = this.credential.accessToken;
          console.log("token:" + this.token, "cred:" + this.credential);
        }
        this.updateProviderData(this.currentUser);
      })
      .catch((error) => {
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

        if (errorCode == "auth/popup-blocked") {
          alert("give permission for pop up and try again");
        }
      });
  };

  unlink = (provId) => {
    unlinkProvider(this.currentUser, provId)
      .then(() => {
        this.updateProviderData(this.currentUser);
      })
      .catch((error) => {});
  };

  updatePhoto = (file, callback) => {
    this.getimglink(file, (dataURL) => {
      updateProfile(this.currentUser, {
        photoURL: dataURL,
      });
      reload(this.currentUser);
      this.updateProviderData(this.currentUser);
    });
  };
  signUp = (
    email,
    password,
    username,
    files = null,
    callback = function () {}
  ) => {
    if (files == null) files = [];
    if (files.length != 0) {
      //get imgbb link for the profile pic of the user
      this.getimglink(
        files[0],
        (dataurl) => {
          this.createUser(
            email,
            password,
            {
              displayName: username,
              photoURL: dataurl,
            },
            callback
          );
        },
        (perc) => {
          console.log(perc);
        },
        (error) => {}
      );
    } else {
      this.createUser(
        email,
        password,
        {
          displayName: username,
        },
        callback
      );
    }
  };

  getimglink = (
    file,
    callback = function () {},
    loadfunc = function () {},
    error = function () {}
  ) => {
    let uploadTask = uploadBytesResumable(
      refStorage(firebase.storage(), "profPic/" + getRandomString(5)),
      log(file)
    );

    uploadTask.on(
      "state_changed",
      (progress) => {
        loadfunc((progress.bytesTransferred / progress.totalBytes) * 100);
      },
      (err) => {
        error(err);
        console.error(`${err}:error at uploading file`);
      }
    );

    uploadTask.then((snapshot) => {
      log(snapshot);

      callback(snapshot.metadata.fullPath);

      console.log(file.name + " is uploaded...");
    });
  };

  createUser = (email, password, updateOptions, callback = function () {}) => {
    //firebase create user
    createUserWithEmailAndPassword(firebase.auth(), email, password)
      .then((result) => {
        result.user.updateProfile(updateOptions).then(() => {
          this.updateProviderData(result.user);

          callback();
        });
      })
      .catch((error) => {
        manageErrorFireBase(error);
      });
  };

  signInWithPass = (email, password, callback = function () {}) => {
    signInWithEmailAndPassword(firebase.auth(), email, password)
      .then((result) => {
        console.log(result);
        if (result.user) {
          this.credential = EmailAuthProvider.credential(email, password);
          this.token = this.credential.accessToken;
          console.log("token:" + this.token, "cred:" + this.credential);
        }
        this.updateProviderData(result.user);
        callback();
      })
      .catch((error) => {
        manageErrorFireBase(error);
      });
  };
}

export default FBmanage;
export { Server, _delete, _fileDelete };
