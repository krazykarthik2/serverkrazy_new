import { createUserWithEmailAndPassword, getRedirectResult, signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signInWithRedirect, signOut, getAuth, updatePassword, reauthenticateWithPopup, updateProfile } from "firebase/auth";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getDatabase, onChildAdded, onChildChanged, onValue, ref } from 'firebase/database';
import { getThumb ,manageErrorFireBase, log, _, getRandomString } from './utilites.js';
class Lok {

    constructor(app, machine) {
        this.app = app
        this.database = getDatabase(this.app);
        this.server = ref(this.database, machine);
        
        this.data = {};
    }
    onchange = (e) => { console.log(e) }
    changeData = dt => {
        this.data = dt;
        this.onchange(this.data);
    }
    setupLok = () => {



        onValue(this.server, data => {
            console.log(data.val())
            this.changeData(data.val())
            // notice("#messageBucket", `<div id="serverQr" ><img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURI(window.location.origin + window.location.pathname + '?server=' + this.server.key)}&ecc=L"/><div ><button id="ServerIdCopier" onclick="navigator.clipboard.writeText('${this.server.key}').then(()=>{_('#ServerIdCopier').classList.value='copied'; setTimeout(()=>{  _('#ServerIdCopier').classList.value=''  },1000)    })" ><div>${this.server.key}<i class="fa fa-clipboard" > </i></div><div id="copiedAlert">Copied<i class='fa fa-check'></i></div></button>${(navigator.share) ? `<button iconround onclick="navigator.share({title: 'Share ServerKrazy',text: 'Try this cool website to share data!',url: '${window.location.origin + window.location.pathname + '?server=' + this.server.key}',})">share</button>` : ''}</div></div><div>`
            //  + log(`server ${this.server.key} Created at ${new Date(data.val().created)} by ownerName:${data.val().ownerName} bearing uid:${data.val().owner}`)
            // + `</div>`);
        })






    }


    setValue = (key, message_to_be_sent) => {
        if (message_to_be_sent == '') {
            return;
        }

        this.server.child( key).set(
            this.encrypt(message_to_be_sent)
        )


    }
    encrypt = e => { return e.toString(); }
    decrypt = e => { return e.replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('\n', '<br/>'); }



}
class FBmanage {

    constructor(fbconfig) {
        this.fbconfig = fbconfig;
        this.credential = null;
    }

    whenSignIn = (user) => { }
    whenSignOut = () => { }
    firstLogin = () => { }
    isfirstLogin = true;
    providers = () => {
        let providerList = [];
        if (this.currentUser)
            this.currentUser.providerData.forEach(prov => {
                providerList.push(prov.providerId);
            })
        return providerList;
    }
    profilePic = '';
    profPiconFB = false;
    thumbPic = '';

    updateProviderData = user => {


        this.currentUser = user;



        if (user == null) {

            this.profilePic = '';
            this.thumbPic = '';
            this.credential = null;
            this.token = null;
            this.whenSignOut();
        } else {
            


            if (this.isfirstLogin) {
                console.log('first login')
                this.firstLogin();
                this.isfirstLogin = false;
            }

            this.whenSignIn(user);


        }
    }

    init = () => {
        this.app = initializeApp(this.fbconfig);
        this.auth = getAuth(this.app);
        this.database = getDatabase();
        console.log(this.app, this.auth, this.database);
        this.auth.onAuthStateChanged(auth_user => {
            this.updateProviderData(auth_user);
        })
    }
    verifyEmail = () => {
        this.currentUser.sendEmailVerification().then(() => {

            alert('Email has been sent to your account');
        }).catch(error => {


        })
    }
    changePassword = (newPass, oldPass, callback = function () { },onErr = function (){}) => {

        if (this.credential)
            this.currentUser.reauthenticateWithCredential(this.credential).then(() => {

                this.modifyPass(newPass);
                callback();
            });
        else
            this.signinwpass2nd(this.currentUser.email, oldPass, () => {

                this.modifyPass(newPass);
                callback();

            });

    }
    modifyPass = (newPass) => {
        updatePassword(this.currentUser, newPass).then(() => {
            this.updateProviderData(this.currentUser);


        }).catch(error => {
            this.updateProviderData(this.currentUser);


            manageErrorFireBase(error)

        })
    }
    deleteAccount = (oldPass, confirm) => {

        if (confirm) {

            if (this.credential)
                this.currentUser.reauthenticateWithCredential(this.credential).then(() => {
                    this.currentUser.delete();

                });
            else
                this.signinwpass3rd(this.currentUser.email, oldPass, () => {
                    this.currentUser.delete();



                });
        }
    }
    signinGoogle = (callback = function () { }) => {
        let provider = new GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
        provider.addScope('https://www.googleapis.com/auth/userinfo.email');
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        provider.addScope('https://www.googleapis.com/auth/plus.me');
        provider.addScope('https://www.googleapis.com/auth/user.birthday.read');
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        provider.addScope('email');
        signInWithPopup(this.auth, provider).then((result) => {

            log(result);
            if (result.credential) {
                this.credential = result.credential;
                this.token = this.credential.accessToken;
                console.log("token:" + this.token, "cred:" + this.credential);

            }
            this.updateProviderData(result.user);
            callback();

        }).catch((error) => {

            manageErrorFireBase(error);
            if (error.code == "auth/popup-blocked") {
                signInWithRedirect(this.auth, provider);
                //try signing in with the redirect policy
            }


        }
        );

    }
    signinFacebook = (callback = function () { }) => {
        let provider = new FacebookAuthProvider();
        signInWithPopup(this.auth, provider).then((result) => {

            log(result);
            if (result.credential) {
                this.credential = result.credential;
                this.token = this.credential.accessToken;
                console.log("token:" + this.token, "cred:" + this.credential);
            }
            this.updateProviderData(result.user);

            callback();


        }).catch((error) => {

            manageErrorFireBase(error);
            if (error.code == "auth/popup-blocked") {
                signInWithRedirect(this.auth, provider);
                //try signing in with the redirect policy
            }


        }
        );

    }


    signout = (callback = function () { }) => {
        
        signOut(this.auth).then(() => {
            

            this.credential = null;
            this.token = null;
            this.updateProviderData(null);
            callback(true);
            
        }).catch(error => {

            callback(false);
        });

    }
    reAuthGoogle = (callback = function () { }) => {
        let provider = new GoogleAuthProvider();
        this.reAuth(provider, callback);
    }
    reAuthFacebook = (callback = function () { }) => {
        let provider = new FacebookAuthProvider();
        this.reAuth(provider, callback);
    }
    reAuth = (prov, callback = function () { },onErr =function(){}) => {


        reauthenticateWithPopup(this.auth, prov)
        .then((result) => {

            log(result);
            if (result.credential) {
                this.credential = result.credential;
                this.token = this.credential.accessToken;
                console.log("token:" + this.token, "cred:" + this.credential);
            }
            this.updateProviderData(result.user);
            callback();
        }).catch((error) => {
            onErr(error);

            manageErrorFireBase(error);
            if (error.code == "auth/popup-blocked") {
                signInWithRedirect(this.auth, prov);
                //try signing in with the redirect policy
            }


        }
        );
    }
    linkGoogle = () => {
        let provider = new GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
        provider.addScope('https://www.googleapis.com/auth/userinfo.email');
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        provider.addScope('https://www.googleapis.com/auth/plus.me');
        provider.addScope('https://www.googleapis.com/auth/user.birthday.read');
        provider.addScope('email');

        this.currentUser.linkWithPopup(provider).then((result) => {

            log(result);
            if (result.credential) {
                this.credential = result.credential;
                this.token = this.credential.accessToken;
                console.log("token:" + this.token, "cred:" + this.credential);
            }

            this.updateProviderData(this.currentUser);

        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var errCredential = error.credential;
            console.error("code:" + errorCode, "message:" + errorMessage, "error email:" + email, "cred:" + errCredential);

            if (errorCode == "auth/popup-blocked") {
                alert('give permission for pop up and try again')
            }


        });
    }
    linkFacebook = () => {
        let provider = new FacebookAuthProvider();


        this.currentUser.linkWithPopup(provider).then((result) => {

            log(result);
            if (result.credential) {
                this.credential = result.credential;
                this.token = this.credential.accessToken;
                console.log("token:" + this.token, "cred:" + this.credential);
            }
            this.updateProviderData(this.currentUser);

        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var errCredential = error.credential;
            console.error("code:" + errorCode, "message:" + errorMessage, "error email:" + email, "cred:" + errCredential);

            if (errorCode == "auth/popup-blocked") {
                alert('give permission for pop up and try again')
            }


        });
    }

    unlink = (provId) => {
        this.currentUser.unlink(provId).then(() => {
            this.updateProviderData(this.currentUser);

        })
            .catch(error => {

            })
    }

    updatePhoto = (file, callback=function(){},onErr=function(){}) => {
        this.getimglink(file, dataURL => {
            this.currentUser.updateProfile({
                photoURL: dataURL
            })
            this.currentUser.reload();
            this.updateProviderData(this.currentUser);
        });
    }
    signUp = (email, password, username, files = null, callback = function () { },onErr= function(){}) => {
        if (files == null) files = [];
        if (files.length != 0) {
            //get imgbb link for the profile pic of the user
            this.getimglink(files[0], (dataurl) => {

                this.createUserWEmailAndPass(email, password, {

                    displayName: username,
                    photoURL: dataurl

                }, callback);
            }, perc => {


            }, error => {
                onErr(error);
                
            });

        } else {

            this.createUserWEmailAndPass(email, password, {

                displayName: username

            }, callback,onErr);

        }




    }



    createUserWEmailAndPass = (email, password, updateOptions, callback = function () { },onErr = function(){}) => {
        //firebase create user


        createUserWithEmailAndPassword(this.auth,email, password)
            .then(result => {
                updateProfile(result.user, updateOptions).then(() => {
                    this.updateProviderData(result.user);

                    callback();
                });


            }).catch(error => {
                onErr(error);

                manageErrorFireBase(error)

            });
    }

    signinWithPass = (email, password, callback = function () { },onErr =function (){}) => {
        signInWithEmailAndPassword(this.auth, email, password)
            .then((result) => {
                console.log(result);
                if (result.credential) {
                    this.credential = result.credential;
                    this.token = this.credential.accessToken;
                    console.log("token:" + this.token, "cred:" + this.credential);
                }
                this.updateProviderData(result.user);
                callback();

            }).catch((error) => {
                onErr(error);
                manageErrorFireBase(error)



            });

    }

}
export { Lok };
export default FBmanage;
