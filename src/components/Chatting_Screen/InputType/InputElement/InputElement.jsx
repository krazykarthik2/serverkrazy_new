import React, { Fragment, useState } from "react";
import { FloatingLabel, Form, FormControl } from "react-bootstrap";
import { Floating_Control_Label } from "../../../utils/FormComp";
import "./index.css"

function InputElement({ msg, setMsg, handleMsgInput }) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="inputelement w-100 d-flex align-items-stretch">
      <Floating_Control_Label
        className="resize-none w-100 border-0 outline-0 box-shadow-none text-input-msg bg-transparent text-white min-height-none h-fit-content"
        label={!msg.includes('\n') ? <>T<u>y</u>pe a Message</> : <></>}
        id="ControlInput1"
        as="textarea"
        placeholder=""
        autoFocus
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => setMsg(e.target.value)}
        value={msg}
        accessKey="y"
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            if (e.shiftKey || e.altKey) {
              e.preventDefault();
              console.log("hit enter with submit");
              setMsg((e) => e + "\n"); //add a new line
            } else {
              e.preventDefault();
              handleMsgInput(e);
            }
          }
        }}
      />
    </div>
  );
}

export default InputElement;
