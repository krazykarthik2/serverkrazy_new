import React from "react";
import { faArrowRight, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";
import ShowBool from "../../../utils/ShowBool";
function AccountInfoBlock({ isEmailVerified, isAnon }) {
  return (
    <>
      <div className="account-info-block position-relative">
        <div
          className="position-absolute top-0 start-75 translate-middle"
          style={{ zIndex: 2 }}
        >
          <div className="account-info-head hstack glass-btn w-fit-content position-relative">
            <div className="account-info text-nowrap">account-info</div>
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="account-info-icon translate-middle position-absolute top-100 start-100 display-3 me-5"
            />
          </div>
        </div>
        <div className="statements">
          <div className="glass-bg w-85 h-85 end-0 position-absolute top-0"></div>
          <div className="p-3 pt-5 vstack gap-3">
            {isEmailVerified ? (
              <div className=" email-verified glass-bg p-2 w-fit-content">
                <div className="bool-statement">email verified</div>
                <ShowBool value={isEmailVerified} />
              </div>
            ) : (
              <div className=" verify-email glass-bg p-2 w-fit-content">
                <div className="prompt-statement">Verify Email</div>
                <FontAwesomeIcon icon={faArrowRight} className="verify-icon" />
              </div>
            )}
            <div className=" is-anon glass-bg p-2 w-fit-content">
              <div className="bool-statement">is Anonymous</div>
              <ShowBool value={isAnon} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AccountInfoBlock;
