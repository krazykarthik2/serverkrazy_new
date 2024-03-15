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
  variant = "",
  ...props
}) {
  return (
    <div className="float-control-label">
      <FloatingLabel label={label} controlId={id} variant={variant}>
        <FormControl
          {...{ value, onChange, type, className:("w-100 "+className), autoComplete, label,placeholder,variant,...props }}
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
  variant,
  ...props
}) {
  const [show, setShow] = useState(false);
  return (
    <>
      {" "}
      <div className="float-pass-label hstack w-100 position-relative">
        <FloatingLabel label={label} controlId={id} className="w-100" variant={variant}> 
          <FormControl
            type={show ? "text" : "password"}
            className={"w-100 " + className}
            {...{ placeholder, autoComplete, value, onChange,variant,...props }}
          />

        </FloatingLabel>
          <button onClick={() => setShow((e) => !e)} className="d-inline position-absolute translate-middle-y top-50 end-0 btn outline-0 border-0">
            <FontAwesomeIcon icon={show ? faEyeSlash : faEye} />
          </button>
      </div>
    </>
  );
}
export { Floating_Control_Label, Floating_Password_Label };
