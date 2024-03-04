
import './App.css';
import stopWebcam from './stopwebcam';
import React, { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";



function App() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);


  const [cropData, setCropData] = useState(null);
  const cropperRef = useRef();
  const [isCropClicked,setCropClicked]=useState(false);

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      setCropClicked(true);
    }
  };

  const startWebcam = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        document.getElementById('video').srcObject = stream;
        setMediaStream(stream);
        setCapturedImage(null);
        setCropData(null);
      })
      .catch((error) => {
        alert("Error accessing webcam:", error);
      });
  }

  const capturePhoto = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    const context = canvas.getContext('2d');
    context.drawImage(document.getElementById('video'), 0, 0, 640, 480);
    setCapturedImage(canvas.toDataURL('image/png'));
    stopWebcam(mediaStream, setMediaStream);

  }

  return (
    <div className="App">
      <h1>Webcam Capture</h1>
      <div className="container">
        <video id="video" autoPlay />
        { capturedImage && !cropData && <Cropper
          ref={cropperRef}
          style={{ height: 400, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={capturedImage}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          guides={true}
        />}

{cropData && (
          <img className="cropped-image" src={cropData} alt="" />
        )}
      </div>
      <div className="save">
        {/* {cropData && <img src={cropData} alt="cropped image" />} */}

        {mediaStream ? <button onClick={capturePhoto} >Capture Photo</button> : <button onClick={startWebcam}>{capturedImage ? 'Recapture' : 'Start camera'}</button>} 

        {/* {capturedImage ? <button id="save"><a href={capturedImage} download='Web-cam-image.png'> Save </a> </button> : ''} */}

        {capturedImage && (
  <div>
  <div className="croppedbtn">
    {!cropData &&<button className="save">
      <a href={capturedImage} download='webcam-image.png' > Save </a>
    </button>}
    {cropData &&(
    <button id="color">
      <a href={cropData}  download='Cropped-image.png'> save cropped image </a>
    </button>)}
    </div>
  </div>
)}
        
        {/* { capturedImage  ? <button onClick={getCropData} >Crop Image</button> : ""} */}
       
        {capturedImage && !cropData && !isCropClicked && (
          <button onClick={getCropData}>Crop Image</button>
        )}
      </div>
    </div>
  );
}

export default App;


