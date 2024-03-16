import React, { useContext, useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { Back } from "../../utils/Navigations";
import { Link, useNavigate } from "react-router-dom";
import { firebaseContext } from "../../App";
import UserShowingProfile from "./UserShowingProfile/UserShowingProfile";
import DestructiveBlock from "./DestructiveBlock";
import AuthBlock from "./AuthBlock";
import InfoBlock from "./InfoBlock";
import AccountInfoBlock from "./AccountInfoBlock";
import "./index.css";
function AccountActions() {
  const firebase = useContext(firebaseContext);
  window.ffb  = firebase
  const navigate = useNavigate();

  function handleSignOut() {
    if (firebase?.currentUser) {
      firebase.signout((e) => {
        if (e) navigate("/auth/login");
      });
    }
  }
  function handleLinkGoogle() {
    if (firebase?.currentUser) {
      firebase.linkGoogle();
    }
  }
  function handleLinkFacebook() {
    if (firebase?.currentUser) {
      firebase.linkFacebook();
    }
  }
  function handleUnlinkGoogle() {
    if (firebase?.currentUser) {
      firebase.unlinkGoogle();
    }
  }
  function handleUnlinkFacebook() {
    if (firebase?.currentUser) {
      firebase.unlinkFacebook();
    }
  }

  const [lastSignInTime, setLastSignInTime] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);

  useEffect(() => {
    if (firebase?.currentUser) {
      setLastSignInTime(
        new Date(firebase?.currentUser?.metadata?.lastSignInTime)
      );
      setCreatedAt(
        new Date(Number(firebase?.currentUser?.metadata?.createdAt))
      );
    }
  }, [firebase]);

  return (
    <div className="accountactions user-select-none w-100 vh-100 overflow-y-auto overflow-hidden  bg-secondary">
      <div className="vstack">
        <Back to="/" />
        <div className="mb-2">
          <UserShowingProfile
            username={firebase?.currentUser?.displayName}
            picture={firebase?.profilePic}
            onSignout={handleSignOut}
          />
        </div>
        <div className="vstack gap-5">
          <div className="d-flex flex-wrap gap-5 justify-content-between">
            <AuthBlock
              providers={firebase?.providers()}
              google={{
                link: handleLinkGoogle,
                unlink: handleUnlinkGoogle,
              }}
              facebook={{
                link: handleLinkFacebook,
                unlink: handleUnlinkFacebook,
              }}
            />

            <AccountInfoBlock
              isEmailVerified={firebase?.currentUser?.emailVerified}
              isAnon={firebase?.currentUser?.isAnonymous}
            />
          </div>
          <div className="d-flex flex-wrap gap-3 justify-content-between">
            <DestructiveBlock />
            <InfoBlock lastSignInTime={lastSignInTime} createdAt={createdAt} />
          </div>

          <div className="small-info text-white opacity-50">
            {[
              { head: "email", tail: firebase?.currentUser?.email },
              { head: "uid", tail: firebase?.currentUser?.uid },
            ].map((e, i) => (
              <div className="hstack" key={i}>
                <div className="head">{e.head}</div>:
                <div className="tail">{e.tail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountActions;
