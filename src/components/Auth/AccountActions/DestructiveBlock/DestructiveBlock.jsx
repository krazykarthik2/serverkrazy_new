import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
function DestructiveBlock() {
  return (

    <div className="destructive-block position-relative ">
      <div
        className="position-absolute top-0 start-0 translate-middle ms-5"
        style={{ zIndex: 2 }}
      >
        <div className="hstack destructive-header glass-btn">
          <div className="destructive text-decoration-underline">
            Destructive
          </div>
        </div>
      </div>
      <div className="destructive-block-bg glass-bg p-3 pt-5">
        <Link
          to={"/auth/deleteAcc/continue/auth>actions"}
          className="glass-btn hstack"
        >
          <div className="deleteAcc">Delete Account</div>
          <FontAwesomeIcon icon={faTrash} className="deleteAccIcon" />
        </Link>
      </div>
    </div>
  );
}
export default DestructiveBlock;
