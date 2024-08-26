# 3D Interaction App with Hand Gesture Controls
This React app integrates hand gesture recognition with 3D model interaction. It utilizes TensorFlow.js and the Handpose model to track hand gestures through a webcam, allowing users to interact with a 3D model in a Canvas.

## Features:-
 Hand Gesture Recognition: Detects hand gestures using TensorFlow.js Handpose model.
 Zoom Control: Adjusts zoom level based on the distance between thumb and index finger. (not yet applied because of lagging)
 3D Model Interaction: Rotates a 3D model based on hand movements(simple hand✋).

## Important Note:-
 Make sure your should be in the camera frame , and try to maintain a reasonable distance between your hand and camera


## Install Dependencies
```bash
npm install 
npm install @tensorflow/tfjs @tensorflow-models/handpose react-webcam
```

## Start the Development Server
```bash
npm run dev
```
## Project Link
[3d-gesture](https://3d-gesture.vercel.app/)
