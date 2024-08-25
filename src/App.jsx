import { Suspense, useState, useEffect, useRef } from 'react';
import './App.css';
import { Canvas } from "@react-three/fiber";
import Model from './models/room';
import Loader from './components/Loader';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import Webcam from 'react-webcam';
import { OrbitControls } from '@react-three/drei';

function App() {
  const [rotation, setRotation] = useState([0, 0, 0]);
  const webcamRef = useRef(null);
  let [thetax, setthetax] = useState(0);
  let [thetay, setthetay] = useState(0);
  let [c, setc] = useState(false);
  const [zoom, setZoom] = useState(0);

  useEffect(() => {
    let prevx = 0, prevy = 0;
    let prevxi=0 , prevyi=0;

    const loadHandposeModel = async () => {
      try {
        return await handpose.load();
      } catch (error) {
        console.error('Error loading handpose model:', error);
      }
    };

    const detectHands = async (model) => {
      try {
        const video = webcamRef.current?.video;

        if (model && video && video.readyState === 4) {
          const predictions = await model.estimateHands(video);
          if (predictions.length > 0) {
            const hand = predictions[0];

            const indexFingerTip = hand.landmarks[8];
             // Detect pinch gesture using thumb and index finger tips
             const thumbTip = hand.landmarks[4];
             const indexTip = hand.landmarks[8];
 
             const distance = Math.sqrt(
               Math.pow(thumbTip[0] - indexTip[0], 2) +
               Math.pow(thumbTip[1] - indexTip[1], 2) +
               Math.pow(thumbTip[2] - indexTip[2], 2)
             );
 
             // Adjust zoom based on the distance between thumb and index finger
             console.log(distance);
            //  if (distance < 50) {
             setZoom((distance*1.2).toFixed(0)); // Zoom in
            //  }else if (distance > 100) {
            //    setZoom((prevZoom) => Math.max(prevZoom - 1, 50)); // Zoom out
            //  } // Index finger tip

            let Qx = 170 - (thetax + (90 - indexFingerTip[0]) * 0.17);
            let Qy = 170 - (thetay + (90 - indexFingerTip[1]) * 0.15);

            let mx = (Qx + thetax) / 2;
            let my = (Qy + thetay) / 2;
            console.log(mx,my);

            
            if (Math.abs(prevx - Qx) >= 0.5 || Math.abs(prevy - Qy) >= 0.15) {
              setRotation([-my * 0.1 - 47.5, mx * 0.09 + 89.5, 0]);
            }

            prevx = Qx;
            prevy = Qy;
          }
        }
      } catch (error) {
        console.error('Error detecting hands:', error);
      }
    };

    const animate = async (model) => {
      const animateLoop = async () => {
        await detectHands(model);
        requestAnimationFrame(animateLoop);
      };
      animateLoop();
    };

    const init = async () => {
      const model = await loadHandposeModel();
      if (model) {
        animate(model);
      }
    };

    init();
  }, []);

  useEffect(() => {
    console.log('Zoom value:', zoom); // Add this line to debug
  }, [zoom]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setthetax((prev) => prev + 1); // Adjust this logic as needed
      setthetay((prev) => prev + 1);
    }, 100); // Update every 500ms
  
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <>
      <Webcam ref={webcamRef} style={{
        position: "absolute",
        marginLeft: 'auto',
        marginRight: 'auto',
        alignItems: 'center',
        // opacity: '0',
        width:'100px',
        // left: '0',
        right: '0',
      }} />
      <Canvas
        style={{ width: '100vw', height: '100vh' }}
        camera={{
          position: [0, 2, 115],
          fov: 45,
          near: 0.1,
          far: 2000
        }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[0, 10, 10]} intensity={2} />
          <spotLight />
          <pointLight />
          <hemisphereLight />
          <OrbitControls/>
          <ambientLight intensity={2} />
          <Model
            scale={[15, 15, 15]}
            position={[0, -15, 2 ]}
            rotation={rotation}
          />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
