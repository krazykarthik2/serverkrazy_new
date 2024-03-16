import React, { Suspense } from "react";
import { Await, useAsyncValue } from "react-router-dom";
import Loading from "../../utils/Loading";
import { AudioFile, ImageFile, OtherFile, VideoFile } from "../Chat/Files";
import { useMemo } from "react";

function ChatFile({ msg, index, _fileDelete, downloadURL ,pfp}) {
  return (
    <>
      {msg.fileType.includes("image") && (
        <ImageFile
          msg={msg}
          index={index}
          _fileDelete={_fileDelete}
          url={downloadURL}
          pfp={pfp}
        />
      )}
      {msg.fileType.includes("audio") && (
        <AudioFile
          msg={msg}
          index={index}
          _fileDelete={_fileDelete}
          url={downloadURL}
          pfp={pfp}
        />
      )}
      {msg.fileType.includes("video") && (
        <VideoFile
          msg={msg}
          index={index}
          _fileDelete={_fileDelete}
          url={downloadURL}
          pfp={pfp}
        />
      )}
      {["image", "audio", "video"].findIndex((x) => msg.fileType.includes(x)) !=
        -1 || (
        <OtherFile
          msg={msg}
          index={index}
          _fileDelete={_fileDelete}
          url={downloadURL}
          pfp={pfp}
        />
      )}
    </>
  );
}
export default ChatFile;
