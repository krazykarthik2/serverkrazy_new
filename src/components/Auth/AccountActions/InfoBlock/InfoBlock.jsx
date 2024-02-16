import React from "react";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";
import TimeFormat from "../../../utils/TimeFormat";
function InfoBlock({ lastSignInTime, createdAt }) {
  return (
    <>
      <div className="info-block position-relative d-inline-flex flex-column w-fit-content ">
        <div
          className="position-absolute top-0 start-100 translate-middle"
          style={{ zIndex: 2 }}
        >
          <div className="info-head hstack glass-btn gap-2 w-fit-content">
            <div className="info">info</div>
            <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
          </div>
        </div>
        <div className="hstack  gap-3  p-2 pt-4 position-relative">
          <div className="glass-bg w-85 h-100 position-absolute end-0 top-0 p-3">
          </div>
          <div className="vstack last-sign-in glass-bg p-2 align-items-start justify-items-center">
            <div className="head-of-info-time">last signed in </div>
            <TimeFormat date={lastSignInTime} />
          </div>
          <div className="vstack created-at glass-bg p-2 align-items-start justify-items-center">
            <div className="head-of-info-time">account created at</div>
            <TimeFormat date={createdAt} />
          </div>
        </div>
      </div>
    </>
  );
}
export default InfoBlock;
