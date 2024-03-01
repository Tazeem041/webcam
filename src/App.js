import React, { useState } from 'react';
import './App.css';
import stopWebcam from './stopwebcam';

function App() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);

  const startWebcam = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        document.getElementById('video').srcObject = stream;
        setMediaStream(stream);
      })
      .catch((error) => {
        console.log("Error accessing webcam:", error);
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
      
        {capturedImage && <img src={capturedImage} alt="Captured" className="capturedimage" />}
        
      </div>
      <div>
        <button onClick={startWebcam}>Start Camera</button>
        <button onClick={capturePhoto}>Capture Photo</button>
      </div>
    </div>
  );
}

export default App;
