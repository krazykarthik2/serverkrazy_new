import React from "react";

function TimeFormat({ date }) {

  return (
    <div className="time hstack gap-2">
      <div className="date hstack">
        <div className="dd">{date?.getDate() || "xx"}</div>/
        <div className="mm">{date?.getMonth() || "xx"}</div>/
        <div className="yyyy">{date?.getFullYear() || "xx"}</div>
      </div>
      <div className="hms hstack">
        <div className="h">{date?.getHours() || "xx"}</div> :
        <div className="m">{date?.getMinutes() || "xx"}</div> :
        <div className="s">{date?.getSeconds() || "xx"}</div>
      </div>
    </div>
  );
}
export default TimeFormat;
