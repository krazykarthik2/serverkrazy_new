import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  FloatingLabel,
  FormControl,
  FormFloating,
  FormGroup,
} from "react-bootstrap";
import "./index.css"
function Floating_Control_Label({
  type = "text",
  className = "",
  id,
  label,
  placeholder="",
  value,
  onChange,
  autoComplete,
}) {
  return (
    <div className="float-control-label">
      <FloatingLabel label={label} controlId={id}>
        <FormControl
          {...{ value, onChange, type, className:("w-100"+className), autoComplete, label,placeholder }}
        />
      </FloatingLabel>
    </div>
  );
}
function Floating_Password_Label({
  className = "",
  id,
  label,
  placeholder="",
  autoComplete = "current-password",
  value,
  onChange,
}) {
  const [show, setShow] = useState(false);
  return (
    <>
      {" "}
      <div className="float-pass-label hstack w-100">
        <FloatingLabel label={label} controlId={id} className="w-100">
          <FormControl
            type={show ? "text" : "password"}
            className={"w-100 " + className}
            {...{ placeholder, autoComplete, value, onChange }}
          />

        </FloatingLabel>
          <button onClick={() => setShow((e) => !e)} className="d-inline btn outline-0 border-0">
            <FontAwesomeIcon icon={show ? faEyeSlash : faEye} />
          </button>
      </div>
    </>
  );
}
export { Floating_Control_Label, Floating_Password_Label };