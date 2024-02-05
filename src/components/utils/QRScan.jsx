import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
function QRScan({ whenQr, cameras, style }) {
  const videoElem = useRef(null);
  const canvas = useRef(null);
  useEffect(() => {
    const qrScanner = new QrScanner(
      videoElem.current,
      (result) => {
        console.log("decoded qr code:", result);
        navigator.vibrate(1000);
        whenQr(result.data);
      },
      {
        returnDetailedScanResult: true /*if you're not specifying any other options */,
      }
    );

    qrScanner.start();
    return () => qrScanner.destroy();
  }, [videoElem]);

  return (
    <div className="position-relative">
      <video
        ref={videoElem}
        autoPlay
        playsInline
        disablePictureInPicture
        style={style}
      />
     </div>
  );
}

export default QRScan;
