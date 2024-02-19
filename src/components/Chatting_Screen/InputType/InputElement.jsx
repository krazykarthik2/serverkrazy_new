import React, { Fragment, useState } from "react";
import { Form } from "react-bootstrap";

function InputElement({ msg, setMsg, handleMsgInput }) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <Form.Group className="w-100" controlId="ControlInput1">
      

      <Form.Control
        as="textarea"
        placeholder="Type a message"
        autoFocus
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => setMsg(e.target.value)}
        value={msg}
        accessKey="T"
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
    </Form.Group>
  );
}

export default InputElement;
