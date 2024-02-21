import React, { useState } from "react";
import { useRef } from "react";
/* create Eitable Component */
const EditableComp = (props) => {
  // get max length from props
  const MAX_LENGTH = props.maxLength || 40;
  // get color from props
  const COLOR = props.warningColor || "orange";

  let ref = useRef(null);

  // on change event
  const contentChange = (e) => {
    // get only text without html tags
    let html = e.target.innerText;
    console.log(html)
    // get textt par before extra text
    if (html.split(" ").filter(e=>e).length > 1 ) {
      let start = `<span>${html.split(" ")[0]}</span>`;
      // get extra text
      let overflow = html
        .split(" ")
        .filter((e, i) => i > 0&&e)
        .join(" ");
      // rap extra text by span
      overflow = `&nbsp;<span style="color:${COLOR}">${overflow}</span>`;
      //set text as innerHTML (or use dangerouslyINerHTML with sate var)
      ref.current.innerHTML = start + overflow;

      // below part is to set cursor , at the end after inner html
      // because innerHTML will reset selection to the start of div text
      let range = document.createRange();
      var sel = window.getSelection();
      range.setStart(ref.current.lastChild, 1);

      sel.removeAllRanges();
      sel.addRange(range);
    }
    return true
  };

  return (
    <div ref={ref} contentEditable onInput={contentChange}>
      Edit text
    </div>
  );
};
export default EditableComp;
