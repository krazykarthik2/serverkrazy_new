import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";
import { faKey, faLock } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
function AuthBlock({ google, facebook, providers }) {
  return (
    <div className="auth-block vstack position-relative ms-5">
      <div className="position-absolute top-0 start-0 ms-3 translate-middle" style={{zIndex: 2}}>
        <div className="hstack auth-header gap-2 glass-bg w-fit-content px-2 py-1 rounded-pill">
          <FontAwesomeIcon icon={faLock} className="lock-icon" />
          <div className="text-decoration-underline">Auth</div>
        </div>
      </div>
      <div className="glass-bg d-flex w-100  auth-items">
        <div className="auth-items w-100 d-flex gap-3 ps-2 align-items-center justify-content-evenly">
          {providers.find((prov) => prov === "google.com") ? (
            <button
              className="btn glass-btn google hstack justify-content-between gap-3"
              onClick={() => google.unlink()}
            >
              <div className="social-item-name">unlink<br/> Google</div>
              <FontAwesomeIcon icon={faGoogle} className="google-icon" />
            </button>
          ) : (
            <button
              className="btn glass-btn google hstack justify-content-between gap-3"
              onClick={() => google.link()}
            >
              <div className="social-item-name">link<br/> Google</div>
              <FontAwesomeIcon icon={faGoogle} className="google-icon" />
            </button>
          )}
          {providers.find((prov) => prov === "facebook.com") ? (
            <button
              className="btn glass-btn facebook hstack justify-content-between gap-3 "
              onClick={() => facebook.unlink()}
            >
              <div className="social-item-name">unlink<br/> Facebook</div>
              <FontAwesomeIcon icon={faFacebook} className="facebook-icon" />
            </button>
          ) : (
            <button
              className="btn glass-btn facebook hstack justify-content-between gap-3 "
              onClick={() => facebook.link()}
            >
              <div className="social-item-name">link<br/> Facebook</div>
              <FontAwesomeIcon icon={faFacebook} className="facebook-icon" />
            </button>
          )}

          <Link to={"../changepass"} className="glass-btn hstack gap-3 btn password justify-content-between ">
            <div className="social-item-name">Change<br/> Password</div>
            <FontAwesomeIcon icon={faKey} className="key-icon" />
          </Link>
        </div>
      </div>
    </div>
  );
}
export default AuthBlock;
