import React, { useRef, useState , useEffect } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import { Exibition_3dmodel } from './Exibition_3dmodel'
import { Snowflake } from './Snowflake'
import Rain from './Rain'
import Cloud from './Cloud';

// import Clouds from './Clouds' // Adjust the path if necessary
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


export default function App() {

  const [isNight, setIsNight] = useState(false)
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0, z: 0 })
  const [isSnowing, setIsSnowing] = useState(false);
  const [showEffects, setShowEffects] = useState(false);

  useEffect(() => {
    // Set the browser tab title
    document.title = "My Expo Navigator";
}, []); // Empty dependency array means this runs once on mount


  // This component is responsible for tracking and displaying the camera position
  const CameraTracker = () => {
    const { camera } = useThree()

    useFrame(() => {
      // Update the camera position state with the current camera position
      setCameraPosition({
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z
      })
    })
  }

  return (
    <div>
      <div className="header">
      <div className="title-and-buttons">
      <div className="project-title">The Interactive 3D Expo Navigator.</div>

        {/* <button onClick={() => setIsNight(!isNight)}>Toggle Day/Night</button> */}

        <button className="header-button" onClick={() => setIsNight(!isNight)}>
            {isNight ? 'Night' : 'Day'}
        </button>

        {/* {console.log('Camera Position: x:'+ cameraPosition.x.toFixed(2) +', y:'+ cameraPosition.y.toFixed(2) +', z: '+cameraPosition.z.toFixed(2))} */}

        <button className="header-button" onClick={() => setIsSnowing(!isSnowing)}>
            {isSnowing ? 'Stop Snowing' : 'Start Snowing'}
        </button>

        <button className="header-button" onClick={() => setShowEffects(!showEffects)}>
        {showEffects ? 'Stop Rain' : 'Rain'}
      </button>

        </div>
        <div className="camera-position">
          Camera Position: x: {cameraPosition.x.toFixed(2)}, y: {cameraPosition.y.toFixed(2)}, z: {cameraPosition.z.toFixed(2)}
        </div>
      </div>
      
      <Canvas style={{ width: '100%', height: '900px' }} camera={{ position: [71, 114, 117] }}>
        <ambientLight intensity={isNight ? 0.2 : 0.5} color={isNight ? 'blue' : 'white'} />
        <directionalLight intensity={isNight ? 0.5 : 1} color={isNight ? 'blue' : 'white'} />
        <OrbitControls
          onEnd={(event) => {
            // Update camera position state when orbit controls have been used
            setCameraPosition({
              x: event.target.object.position.x,
              y: event.target.object.position.y,
              z: event.target.object.position.z
            })
          }}
        />
        <pointLight position={[10, 10, 10]} />
        <spotLight position={[10, 15, 10]} angle={0.3} />
        

        {isSnowing && <Snowflake count={2000} />} {/* Conditional rendering of Snowflakes */}

        {/* Lighting - adjust intensity or include/exclude based on showEffects */}
        
        {showEffects && (
          <ambientLight intensity={0.5} color={"#555555"} />,
          <directionalLight intensity={1} color={"#ffeedd"} position={[0, 0, 1]} />,
          <pointLight intensity={30} color={"#062d89"} position={[200, 300, 100]} distance={500} decay={1.7} />
        )}

        {showEffects && <Cloud />}
        {showEffects && <Rain count={100000} />}


       
        {/* <Snowflake count={2000} /> */}
        {/* <Rain count={25000} /> */}
        {/* <Clouds count={25} /> */}
        {/* <Rain count={9500} /> */}
        <Exibition_3dmodel />
        <CameraTracker /> {/* Include the camera tracker in the Canvas */}
      </Canvas>
    </div>
  )
}