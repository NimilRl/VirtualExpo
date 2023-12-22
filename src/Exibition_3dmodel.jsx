// import { useGLTF } from '@react-three/drei'
import React, { useRef, useEffect, useState } from 'react'
import { useFrame, useThree, extend } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { TextureLoader, MeshStandardMaterial , SpotLight } from 'three'
import * as THREE from 'three'
import { useGLTF, OrbitControls } from '@react-three/drei'
import cubeInfoJson from './Shop_info.json'
import { Bloom } from '@react-three/postprocessing'
import './custom.css'
import { Html } from '@react-three/drei';
extend({ OrbitControls })

export function Exibition_3dmodel(props) {
  const { nodes, materials } = useGLTF('./Hall/Exibition_3dmodel.glb')
  const meshRef = useRef() // Reference to the mesh
  const { camera } = useThree() // Access to the three.js camera

  const [hovered, setHovered] = useState(false) // State to track if mesh is hovered
  const [visible, setVisible] = useState(true)

  // Update the material transparency on hover
  const texture = useLoader(TextureLoader, './light/metal_normals.png')
  const cubeMaterial = new THREE.MeshStandardMaterial({ map: texture })

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.material.opacity = hovered ? 0.5 : 1
      meshRef.current.material.transparent = hovered
      meshRef.current.visible = visible
    }
  })
 
//   so this project is about visulizing a exibition in 3d model rendering where people can see which hall of exibition have whatb kind of stall and thair companies and product the work which alredy done by me is that you can see in 1st photo as i can toggle day and night vision , snow effect and when user click on hall 2 its upper body will dissappper and than stall can be seen and when i click on any stall a pop up bar comes at the left side with information about that stall's comnpaie like thair logo and details so thats for now progress the things whcih going to be in future is the rain+clound effect with sound if possible , than i am thinking adding some camera effects , than background music effect , search stalls by thair name , and i am thinking of giving where of snow , rain and cloud or rain and cloud based on current location wether so this are the future to be features and i give you making of project photos 

// now make slides on given topic as :

// title,goal, stretegies , how to make it (three , react , blender+glb file) , current progress , what for future plans , technologies used ,  
  

  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [panelData, setPanelData] = useState({});

  const handleCubeClick = (cubeId) => {
    const data = cubeInfoJson[cubeId];
    setPanelData(data);
    setIsPanelVisible(true); // Show the panel
  };

  const closePanel = () => {
    setIsPanelVisible(false); // Hide the panel
  };
   
  
  const originalColor = useRef(new MeshStandardMaterial({ color: '#73C08C' }))
  const [newhovered, setnewHovered] = useState(false)

  const handlePointerOver = (event) => {
    event.stopPropagation()
    setnewHovered(true)
    // Change the color to red when the pointer is over the object
    event.object.material.color.set('red')
    console.log('Hover in')
  }

  const handlePointerOut = (event) => {
    event.stopPropagation()
    setnewHovered(false)
    // Revert the color to the original when the pointer is out
    event.object.material.color.set(originalColor.current.color)
    console.log('Hover Out')
  }
  
  const handleZoom = () => {
    // Set camera position
    camera.position.set(-67.38,  22.25,  -302.83)
    // Ensure meshRef.current is available and has a position property
    if (meshRef.current && meshRef.current.position) {
      // Make the camera look at the mesh
      camera.lookAt(meshRef.current.position)
    }

    setVisible(false) // Hide the mesh
  }

  function SpotlightForMesh({ meshPosition }) {
    const { scene } = useThree();
  
    // Calculate the spotlight position based on the mesh position
    const spotlightPosition = [
      meshPosition[0],
      meshPosition[1] + 5, // Above the mesh
      meshPosition[2]
    ];
  
    React.useEffect(() => {
      // Create a new Three.js SpotLight
      const spotlight = new THREE.SpotLight(0xffffff, 1);
      spotlight.position.set(...spotlightPosition);
      spotlight.target.position.set(...meshPosition);
      scene.add(spotlight);
  
      // Optional: adjust other spotlight properties as needed
  
      // Cleanup function to remove the spotlight when the component unmounts
      return () => {
        scene.remove(spotlight);
      };
    }, [meshPosition, scene]);
  
    // This component does not render anything itself
    return null;
  }
  

  return (
    <group {...props} dispose={null}>
      <group scale={7}>
        <mesh
          geometry={nodes.Grass_BIEC009.geometry}
          material={new MeshStandardMaterial({ color: '#4D4A4E' })}
          position={[-20.887, 0.745, -22.712]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        />
      </group>
      <group scale={7}>
        <mesh
          geometry={nodes.Grass_BIEC001.geometry}
          material={new MeshStandardMaterial({ color: '#777332' })}
          position={[-20.887, 0.354, -22.422]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        />
      </group>
      <group position={[0, -92.339, 0]}>
        <mesh
          geometry={nodes.Hall_4A063.geometry}
          material={nodes.Hall_4A063.material}
          position={[-332.249, 99.306, -189.095]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={7}
        />
      </group>
      <group position={[0.802, -94.423, -15.307]}>
        <mesh geometry={nodes.Plane001.geometry} material={nodes.Plane001.material} rotation={[-Math.PI / 2, 0, 0.16]} scale={7} />
      </group>
      <group position={[-0.016, -94.54, -4.633]} scale={7}>
        <mesh
          // cafe
          geometry={nodes.Grass_BIEC005.geometry}
          material={new MeshStandardMaterial({ color: '#f46d43' })}
          position={[0.494, 14.72, -29.491]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        />
      </group>
      <group scale={7}>
        {/* h1 */}
        <mesh
          geometry={nodes.Hall_4A001.geometry}
          material={new MeshStandardMaterial({ color: '#abdda4' })}
          position={[9.689, 0.348, -35.591]}
          rotation={[-Math.PI / 2, 0, 0.164]}
        />
      </group>
      {/* main hall */}
      <group position={[-4.067, -93.377, -17.377]} scale={7}>
        <mesh
          ref={meshRef}
          material={new MeshStandardMaterial({ color: '#59adf6', opacity: 1, transparent: true })}
          geometry={nodes.Hall_4A065.geometry}
          position={[-7.61, 14.173, -33.432]}
          rotation={[-Math.PI / 2, 0, -0.188]}
          onPointerOver={(e) => {
            e.stopPropagation()
            setHovered(true)
          }}
          onPointerOut={(e) => {
            e.stopPropagation()
            setHovered(false)
          }}
          onClick={(e) => {
            e.stopPropagation()
            handleZoom()
          }}
        />
      </group>
      <group position={[-10.402, -97.463, -27.363]} scale={7}>
        {/* //h3 */}
        <mesh
          geometry={nodes.Hall_4A066.geometry}
          material={new MeshStandardMaterial({ color: '#B3758B' })}
          position={[-47.916, 14.706, -10.171]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </group>
      <group position={[-20.409, -92.712, -0.854]} scale={7}>
        {/* h4 */}
        <mesh
          // ref={meshRefs[0]}
          geometry={nodes.Hall_4A008.geometry}
          position={[-46.221, 14.065, -11.809]}
          rotation={[-Math.PI / 2, 0, 0]}
          material={new MeshStandardMaterial({ color: '#fcae61' })}
        />
      </group>
      <group scale={7}>
        {/* h5 */}
        <mesh
          // ref={meshRefs[1]}
          geometry={nodes.Hall_4A064.geometry}
          material={new MeshStandardMaterial({ color: '#d53e4f' })}
          position={[-50.19, 0.73, -10.721]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </group>
      <group position={[1.484, -97.12, 18.914]} scale={7}>
        <mesh
          geometry={nodes.Grass_BIEC007.geometry}
          material={new MeshStandardMaterial({ color: '#fee08b' })}
          position={[-21.074, 14.491, -25.476]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        />
      </group>
      <group position={[-59.319, -0.883, -243.087]}>
        <group position={[0.48, 5.512, -0.539]} rotation={[-Math.PI / 2, 0, -0.19]} scale={7}>
          <mesh geometry={nodes.mesh_0.geometry} material={materials.Material_0} />
          <mesh geometry={nodes.mesh_0_10.geometry} material={materials.Material_0} />
          <mesh geometry={nodes.mesh_0_11.geometry} material={new MeshStandardMaterial({ color: '#262D34' })} />
          <mesh geometry={nodes.mesh_0_12.geometry} material={materials.Material_0} />
          <mesh geometry={nodes.mesh_0_13.geometry} material={materials.Material_0} />
          <mesh geometry={nodes.mesh_0_14.geometry} material={materials.Material_0} />
          <mesh geometry={nodes.mesh_0_15.geometry} material={materials.Material_0} />
          <mesh geometry={nodes.mesh_0_16.geometry} material={materials.Material_0} />
          <mesh geometry={nodes.mesh_0_17.geometry} material={materials.Material_0} />
          <mesh geometry={nodes.mesh_0_18.geometry} material={materials.Material_0} />
          <mesh geometry={nodes.mesh_0_19.geometry} material={materials.Material_0} />
          <mesh geometry={nodes.mesh_0_2.geometry} material={materials.Material_0} />
          <mesh geometry={nodes.mesh_0_20.geometry} material={new MeshStandardMaterial({ color: '#262D34' })} />
          <mesh geometry={nodes.mesh_0_21.geometry} material={new MeshStandardMaterial({ color: '#262D34' })} />
          <mesh geometry={nodes.mesh_0_22.geometry} material={materials.Material_0} />
          <mesh geometry={nodes.mesh_0_23.geometry} material={materials.Material_0} />
          <mesh geometry={nodes.mesh_0_24.geometry} material={materials.Material_0} />
          <mesh geometry={nodes.mesh_0_25.geometry} material={materials.Material_0} />
          <mesh geometry={nodes.mesh_0_26.geometry} material={materials.Material_0} />
          <mesh geometry={nodes.mesh_0_27.geometry} material={materials.Material_0} />
          <mesh geometry={nodes.mesh_0_28.geometry} material={materials.Material_0} />
          <mesh geometry={nodes.mesh_0_29.geometry} material={materials.Material_0} />
          <mesh geometry={nodes.mesh_0_3.geometry} material={materials.Material_0} />
          <mesh geometry={nodes.mesh_0_30.geometry} material={materials.Material_0} />
          <mesh geometry={nodes.mesh_0_31.geometry} material={materials.Material_0} />
          <mesh geometry={nodes.mesh_0_32.geometry} material={materials.Material_0} />
          <mesh geometry={nodes.mesh_0_33.geometry} material={materials.Material_0} />
          <mesh geometry={nodes.mesh_0_4.geometry} material={materials.Material_0} />
          <mesh geometry={nodes.mesh_0_6.geometry} material={materials.Material_0} />
          <mesh geometry={nodes.mesh_0_7.geometry} material={materials.Material_0} />
          <mesh geometry={nodes.mesh_0_8.geometry} material={materials.Material_0} />
          <mesh geometry={nodes.mesh_0_9.geometry} material={materials.Material_0} />
        </group>
      </group>
      <group position={[-59.319, -0.883, -243.087]}>
        <mesh
          geometry={nodes.mesh_0_4001.geometry}
          material={materials['Material_0.001']}
          position={[0.48, 5.512, -0.539]}
          rotation={[-Math.PI / 2, 0, -0.19]}
          scale={7}
        />
      </group>
      <group position={[-59.319, -0.883, -243.087]}>
        <mesh
          geometry={nodes.mesh_0001.geometry}
          material={materials['Material_0.002']}
          position={[0.48, 5.512, -0.539]}
          rotation={[-Math.PI / 2, 0, -0.19]}
          scale={7}
        />
      </group>
      <mesh geometry={nodes.Cube.geometry} material={materials.Material} />
      <mesh
        geometry={nodes.Cube001.geometry}
        material={new MeshStandardMaterial({ color: 'red' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube001')}
        position={[-62.455, 10.624, -325.349]}
        rotation={[1.572, 0, 0.191]}
      />
      <SpotlightForMesh meshPosition={[-62.455, 10.624, -325.349]} />
      <mesh
        geometry={nodes.Cube002.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube002')}
        position={[-62.997, 10.63, -314.695]}
        rotation={[1.572, 0, -2.95]}
        scale={[1, 1, 1.07]}
      />
      <mesh
        geometry={nodes.Cube003.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube003')}
        position={[-70.132, 10.663, -322.484]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube004.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube004')}
        position={[-69.554, 10.659, -325.499]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube005.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube005')}
        position={[-70.707, 10.657, -319.461]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube006.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube006')}
        position={[-71.594, 10.66, -314.948]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube007.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube007')}
        position={[-59.138, 10.658, -326.308]}
        rotation={[0, 1.381, 0]}
      />
      <mesh
        geometry={nodes.Cube008.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube008')}
        position={[-59.75, 10.676, -323.212]}
        rotation={[0, 1.381, 0]}
      />
      <mesh
        geometry={nodes.Cube009.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube009')}
        position={[-53.878, 10.668, -322.131]}
        rotation={[0, 1.381, 0]}
      />
      <mesh
        geometry={nodes.Cube010.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube010')}
        position={[-50.89, 10.667, -321.566]}
        rotation={[0, 1.381, 0]}
      />
      <mesh
        geometry={nodes.Cube011.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube011')}
        position={[-47.827, 10.667, -320.983]}
        rotation={[0, 1.381, 0]}
      />
      <mesh
        geometry={nodes.Cube012.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube012')}
        position={[-47.253, 10.669, -324.029]}
        rotation={[0, 1.381, 0]}
      />
      <mesh
        geometry={nodes.Cube013.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube013')}
        position={[-50.307, 10.672, -324.613]}
        rotation={[0, 1.381, 0]}
      />
      <mesh
        geometry={nodes.Cube014.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube014')}
        position={[-53.307, 10.671, -325.154]}
        rotation={[0, 1.381, 0]}
      />
      <mesh
        geometry={nodes.Cube015.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube015')}
        position={[-39.539, 10.648, -322.472]}
        rotation={[0, 1.381, 0]}
      />
      <mesh
        geometry={nodes.Cube016.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube016')}
        position={[-36.535, 10.661, -321.873]}
        rotation={[0, 1.381, 0]}
      />
      <mesh
        geometry={nodes.Cube017.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube017')}
        position={[-33.517, 10.653, -321.328]}
        rotation={[0, 1.381, 0]}
      />
      <mesh
        geometry={nodes.Cube018.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube018')}
        position={[-40.057, 10.652, -319.43]}
        rotation={[0, 1.381, 0]}
      />
      <mesh
        geometry={nodes.Cube019.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube019')}
        position={[-37.094, 10.651, -318.811]}
        rotation={[0, 1.381, 0]}
      />
      <mesh
        geometry={nodes.Cube020.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube020')}
        position={[-34.119, 10.659, -318.249]}
        rotation={[0, 1.381, 0]}
      />
      <mesh
        geometry={nodes.Cube021.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube021')}
        position={[-24.637, 10.662, -319.587]}
        rotation={[0, 1.381, 0]}
      />
      <mesh
        geometry={nodes.Cube022.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube022')}
        position={[-27.624, 10.658, -320.157]}
        rotation={[0, 1.381, 0]}
      />
      <mesh
        geometry={nodes.Cube023.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube023')}
        position={[-28.237, 10.651, -317.142]}
        rotation={[0, 1.381, 0]}
      />
      <mesh
        geometry={nodes.Cube024.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube024')}
        position={[-25.256, 10.696, -316.524]}
        rotation={[0, 1.381, 0]}
      />
      <mesh
        geometry={nodes.Cube025.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube025')}
        position={[-26.954, 10.649, -307.624]}
        rotation={[0, 1.381, 0]}
      />
      <mesh
        geometry={nodes.Cube026.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube026')}
        position={[-29.936, 10.653, -308.232]}
        rotation={[0, 1.381, 0]}
      />
      <mesh
        geometry={nodes.Cube027.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube027')}
        position={[-29.323, 10.666, -311.246]}
        rotation={[0, 1.381, 0]}
      />
      <mesh
        geometry={nodes.Cube028.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube028')}
        position={[-26.336, 10.669, -310.675]}
        rotation={[0, 1.381, 0]}
      />
      <mesh
        geometry={nodes.Cube029.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube029')}
        position={[-54.039, 10.639, -312.999]}
        rotation={[1.572, 0, -2.95]}
        scale={[1.02, 1, 1.06]}
      />
      <mesh
        geometry={nodes.Cube030.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube030')}
        position={[-41.562, 10.624, -312.128]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube031.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube031')}
        position={[-60.91, 10.662, -317.412]}
        rotation={[0, 1.381, 0]}
      />
      <mesh
        geometry={nodes.Cube032.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube032')}
        position={[-64.046, 10.657, -317.997]}
        rotation={[0, 1.381, 0]}
      />
      <mesh
        geometry={nodes.Cube033.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube033')}
        position={[-54.985, 10.658, -316.265]}
        rotation={[0, 1.381, 0]}
      />
      <mesh
        geometry={nodes.Cube034.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube034')}
        position={[-48.942, 10.652, -315.145]}
        rotation={[0, 1.381, 0]}
      />
      <mesh
        geometry={nodes.Cube035.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube035')}
        position={[-51.945, 10.693, -315.655]}
        rotation={[0, 1.381, 0]}
        scale={[1, 1.11, 1]}
      />
      <mesh
        geometry={nodes.Cube036.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube036')}
        position={[-49.553, 10.666, -312.079]}
        rotation={[0, 1.381, 0]}
      />
      <mesh
        geometry={nodes.Cube037.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube037')}
        position={[-37.259, 10.604, -309.729]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube038.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube038')}
        position={[-38.221, 10.611, -312.977]}
        rotation={[1.572, 0, 0.191]}
      />
      <mesh
        geometry={nodes.Cube039.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube039')}
        position={[-35.218, 10.627, -312.402]}
        rotation={[1.572, 0, 0.191]}
      />
      <mesh
        geometry={nodes.Cube040.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube040')}
        position={[-28.378, 10.621, -300.279]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube041.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube041')}
        position={[-31.639, 10.613, -299.412]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube042.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube042')}
        position={[-31.054, 10.635, -302.28]}
        rotation={[1.572, 0, 0.191]}
      />
      <mesh
        geometry={nodes.Cube043.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube043')}
        position={[-36.914, 10.615, -303.524]}
        rotation={[1.572, 0, 0.191]}
      />
      <mesh
        geometry={nodes.Cube044.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube044')}
        position={[-39.934, 10.603, -304.088]}
        rotation={[1.572, 0, 0.191]}
      />
      <mesh
        geometry={nodes.Cube045.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube045')}
        position={[-43.211, 10.642, -303.19]}
        rotation={[1.572, 0, 0.191]}
      />
      <mesh
        geometry={nodes.Cube046.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube046')}
        position={[-38.858, 10.639, -300.824]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube047.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube047')}
        position={[-50.958, 10.649, -304.685]}
        rotation={[1.572, 0, 0.191]}
      />
      <mesh
        geometry={nodes.Cube048.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube048')}
        position={[-53.717, 10.601, -306.779]}
        rotation={[1.572, 0, 0.191]}
      />
      <mesh
        geometry={nodes.Cube049.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube049')}
        position={[-56.714, 10.64, -307.376]}
        rotation={[1.572, 0, 0.191]}
      />
      <mesh
        geometry={nodes.Cube050.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube050')}
        position={[-55.815, 10.62, -304.105]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube051.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube051')}
        position={[-64.705, 10.629, -305.824]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube052.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube052')}
        position={[-64.132, 10.621, -308.809]}
        rotation={[1.572, 0, 0.191]}
      />
      <mesh
        geometry={nodes.Cube053.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube053')}
        position={[-67.593, 10.68, -298.749]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube054.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube054')}
        position={[-64.895, 10.685, -296.69]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube055.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube055')}
        position={[-61.944, 10.622, -296.11]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube056.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube056')}
        position={[-57.162, 10.664, -296.711]}
        rotation={[1.572, 0, 0.191]}
      />
      <mesh
        geometry={nodes.Cube057.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube057')}
        position={[-61.348, 10.628, -299.08]}
        rotation={[1.572, 0, 0.191]}
      />
      <mesh
        geometry={nodes.Cube058.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube058')}
        position={[-64.335, 10.635, -299.663]}
        rotation={[1.572, 0, 0.191]}
      />
      <mesh
        geometry={nodes.Cube059.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube059')}
        position={[-69.314, 10.691, -289.889]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube060.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube060')}
        position={[-65.099, 10.64, -287.533]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube061.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube061')}
        position={[-58.887, 10.639, -287.839]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube062.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube062')}
        position={[-69.831, 10.658, -279.244]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube063.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube063')}
        position={[-62.462, 10.656, -277.811]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube064.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube064')}
        position={[-57.864, 10.65, -276.919]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube065.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube065')}
        position={[-47.203, 10.641, -274.86]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube066.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube066')}
        position={[-42.665, 10.64, -273.969]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube067.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube067')}
        position={[-36.51, 10.634, -274.304]}
        rotation={[Math.PI, 0.191, -1.571]}
      />
      <mesh
        geometry={nodes.Cube068.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube068')}
        position={[-33.537, 10.638, -273.746]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube069.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube069')}
        position={[-43.638, 10.651, -284.902]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube070.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube070')}
        position={[-39.48, 10.655, -282.561]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube071.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube071')}
        position={[-33.539, 10.658, -281.425]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube072.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube072')}
        position={[-41.914, 10.648, -293.785]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube073.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube073')}
        position={[-37.751, 10.652, -291.438]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube074.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube074')}
        position={[-31.896, 10.622, -290.275]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube075.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube075')}
        position={[-79.609, 10.667, -273.613]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube076.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube076')}
        position={[-71.534, 10.659, -270.491]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube077.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube077')}
        position={[-61.115, 10.653, -268.459]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube078.geometry}
        material={new MeshStandardMaterial({ color: 'red' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube078')}
        position={[-47.336, 10.654, -265.817]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube079.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube079')}
        position={[-37.011, 10.643, -263.795]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube080.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube080')}
        position={[-28.741, 10.633, -262.198]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube081.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube081')}
        position={[-78.44, 10.658, -279.651]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube082.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube082')}
        position={[-77.273, 10.655, -285.675]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube083.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube083')}
        position={[-76.086, 10.646, -291.707]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube084.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube084')}
        position={[-74.937, 10.645, -297.744]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube085.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube085')}
        position={[-74.047, 10.654, -302.24]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube086.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube086')}
        position={[-73.166, 10.66, -306.753]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube087.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube087')}
        position={[-68.969, 10.656, -328.507]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube088.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube088')}
        position={[-28.178, 10.629, -265.225]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube089.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube089')}
        position={[-27.293, 10.629, -269.75]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube090.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube090')}
        position={[-26.41, 10.644, -274.261]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube091.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube091')}
        position={[-25.846, 10.644, -277.292]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube092.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube092')}
        position={[-25.255, 10.635, -280.301]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube093.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube093')}
        position={[-24.679, 10.63, -283.312]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube094.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube094')}
        position={[-24.087, 10.634, -286.322]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube095.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube095')}
        position={[-23.514, 10.634, -289.356]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube096.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube096')}
        position={[-22.907, 10.641, -292.348]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube097.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube097')}
        position={[-22.333, 10.617, -295.377]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube098.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube098')}
        position={[-21.738, 10.626, -298.398]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube099.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube099')}
        position={[-20.743, 10.624, -303.548]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube100.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube100')}
        position={[-20.159, 10.629, -306.578]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube101.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube101')}
        position={[-19.59, 10.6, -309.582]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube102.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube102')}
        position={[-19.009, 10.604, -312.598]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube103.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube103')}
        position={[-18.415, 10.601, -315.617]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube104.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube104')}
        position={[-17.844, 10.599, -318.635]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube105.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube105')}
        position={[-29.731, 10.629, -292.955]}
        rotation={[1.572, 0, 0.191]}
      />
      <mesh
        geometry={nodes.Cube106.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube106')}
        position={[-32.71, 10.642, -293.54]}
        rotation={[1.572, 0, 0.191]}
      />
      <mesh
        geometry={nodes.Cube107.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube107')}
        position={[-35.698, 10.63, -294.118]}
        rotation={[1.572, 0, 0.191]}
      />
      <mesh
        geometry={nodes.Cube108.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube108')}
        position={[-38.656, 10.632, -294.684]}
        rotation={[1.572, 0, 0.191]}
      />
      <mesh
        geometry={nodes.Cube109.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube109')}
        position={[-31.429, 10.661, -284.085]}
        rotation={[1.572, 0, 0.191]}
      />
      <mesh
        geometry={nodes.Cube110.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube110')}
        position={[-34.428, 10.635, -284.635]}
        rotation={[1.572, 0, 0.191]}
      />
      <mesh
        geometry={nodes.Cube111.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube111')}
        position={[-37.427, 10.636, -285.211]}
        rotation={[1.572, 0, 0.191]}
      />
      <mesh
        geometry={nodes.Cube112.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube112')}
        position={[-40.378, 10.649, -285.8]}
        rotation={[1.572, 0, 0.191]}
      />
      <mesh
        geometry={nodes.Cube113.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube113')}
        position={[-64.508, 10.658, -290.436]}
        rotation={[Math.PI, 0.191, -1.571]}
      />
      <mesh
        geometry={nodes.Cube114.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube114')}
        position={[-69.196, 10.667, -282.229]}
        rotation={[Math.PI, 0.191, -1.571]}
      />
      <mesh
        geometry={nodes.Cube115.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube115')}
        position={[-58.713, 10.645, -280.158]}
        rotation={[Math.PI, 0.191, -1.571]}
      />
      <mesh
        geometry={nodes.Cube116.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube116')}
        position={[-45.123, 10.612, -277.538]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube117.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube117')}
        position={[-36.455, 10.634, -266.799]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube118.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube118')}
        position={[-43.776, 10.643, -268.21]}
        rotation={[1.572, 0, 0.191]}
      />
      <mesh
        geometry={nodes.Cube119.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube119')}
        position={[-70.914, 10.709, -273.487]}
        rotation={[Math.PI, 0.191, -1.571]}
      />
      <mesh
        geometry={nodes.Cube120.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube120')}
        position={[-62.035, 10.645, -271.748]}
        rotation={[Math.PI, 0.191, -1.571]}
      />
      <mesh
        geometry={nodes.Cube121.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube121')}
        position={[-57.511, 10.651, -270.877]}
        rotation={[1.572, 0, 0.191]}
      />
      <mesh
        geometry={nodes.Cube122.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube122')}
        position={[-48.308, 10.64, -269.098]}
        rotation={[Math.PI, 0.191, -1.571]}
      />
      <mesh
        geometry={nodes.Cube244.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube244')}
        position={[-89.846, 4.974, -175.836]}
        rotation={[Math.PI, 0.191, -1.571]}
      />
      <mesh
        geometry={nodes.Cube245.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube245')}
        position={[-98.215, 5.012, -177.512]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube246.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube246')}
        position={[-88.162, 4.993, -184.695]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube247.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube247')}
        position={[-77.711, 5.003, -182.656]}
        rotation={[Math.PI, 0.191, -1.571]}
      />
      <mesh
        geometry={nodes.Cube248.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube248')}
        position={[-58.019, 4.981, -187.956]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube249.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube249')}
        position={[-65.6, 4.988, -180.324]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube250.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube250')}
        position={[-61.104, 4.989, -179.451]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube251.geometry}
        position={[-53.874, 4.985, -178.022]}
        rotation={[1.572, 0, -2.95]}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube251')}
      />
      <mesh
        geometry={nodes.Cube252.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube252')}
        position={[-55.37, 4.988, -170.104]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube253.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube253')}
        position={[-47.639, 4.968, -166.131]}
        rotation={[Math.PI, 0.191, -1.571]}
      />
      <mesh
        geometry={nodes.Cube254.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube254')}
        position={[-46.78, 4.98, -170.625]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube255.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube255')}
        position={[-80.608, 4.988, -192.372]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube256.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube256')}
        position={[-80.347, 4.991, -201.322]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube257.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube257')}
        position={[-78.596, 4.99, -210.105]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube258.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube258')}
        position={[-84.599, 4.974, -211.287]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube259.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube259')}
        position={[-81.433, 5.001, -219.809]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube260.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube260')}
        position={[-79.712, 4.994, -228.675]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube261.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube261')}
        position={[-74.037, 5.008, -218.378]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube262.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube262')}
        position={[-72.356, 5.017, -227.23]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube263.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube263')}
        position={[-67.738, 4.999, -226.368]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube264.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube264')}
        position={[-64.576, 5.005, -234.843]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube265.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube265')}
        position={[-69.161, 5.008, -235.689]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube266.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube266')}
        position={[-76.604, 4.986, -244.779]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube267.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube267')}
        position={[-78.03, 5.001, -237.441]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube268.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube268')}
        position={[-69.481, 4.999, -217.489]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube269.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube269')}
        position={[-55.067, 5.035, -196.402]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube270.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube270')}
        position={[-51.74, 5.053, -204.906]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube271.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube271')}
        position={[-47.116, 4.992, -213.181]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube272.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube272')}
        position={[-57.328, 4.992, -215.165]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube273.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube273')}
        position={[-45.711, 5.057, -220.453]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube274.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube274')}
        position={[-42.151, 4.977, -230.489]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube275.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube275')}
        position={[-40.729, 4.987, -237.9]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube276.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube276')}
        position={[-51.215, 5.015, -230.703]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube277.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube277')}
        position={[-49.342, 5.014, -239.55]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube278.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube278')}
        position={[-52.616, 5.006, -223.415]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube279.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube279')}
        position={[-38.263, 4.975, -214.636]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube280.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube280')}
        position={[-45.926, 4.983, -175.156]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube281.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube281')}
        position={[-45.038, 4.983, -179.679]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube282.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube282')}
        position={[-43.876, 4.966, -185.733]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube283.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube283')}
        position={[-41.117, 5.035, -199.916]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube284.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube284')}
        position={[-39.968, 4.978, -205.959]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube285.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube285')}
        position={[-37.407, 4.962, -219.162]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube286.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube286')}
        position={[-36.546, 5.059, -223.655]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube287.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube287')}
        position={[-35.358, 4.974, -229.703]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube288.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube288')}
        position={[-34.186, 4.97, -235.741]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube289.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube289')}
        position={[-45.168, 5.046, -231.047]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube290.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube290')}
        position={[-63.103, 5.017, -242.177]}
        rotation={[Math.PI, 0.191, 1.57]}
      />
      <mesh
        geometry={nodes.Cube291.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube291')}
        position={[-69.12, 5.018, -243.326]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube292.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube292')}
        position={[-66.096, 5.02, -242.753]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube293.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube293')}
        position={[-55.363, 5.002, -240.691]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube294.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube294')}
        position={[-52.321, 5, -240.095]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube295.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube295')}
        position={[-43.688, 4.969, -238.459]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube296.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube296')}
        position={[-57.088, 5.018, -224.269]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube297.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube297')}
        position={[-55.662, 5.014, -231.572]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube298.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube298')}
        position={[-53.509, 4.988, -234.167]}
        rotation={[Math.PI, 0.191, -1.571]}
      />
      <mesh
        geometry={nodes.Cube299.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube299')}
        position={[-97.356, 5.019, -181.999]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube300.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube300')}
        position={[-96.479, 5.016, -186.539]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube301.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube301')}
        position={[-95.007, 5.008, -194.079]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube302.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube302')}
        position={[-92.275, 4.985, -208.285]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube303.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube303')}
        position={[-91.093, 4.987, -214.325]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube304.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube304')}
        position={[-88.678, 4.972, -226.823]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube305.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube305')}
        position={[-87.206, 4.97, -234.373]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube306.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube306')}
        position={[-86.054, 5.023, -240.386]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube307.geometry}
        material={new MeshStandardMaterial({ color: '#73C08C' })}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={() => handleCubeClick('Cube307')}
        position={[-85.172, 5.025, -244.928]}
        rotation={[1.572, 0, -2.95]}
      />
      <mesh
        geometry={nodes.Cube123.geometry}
        material={new MeshStandardMaterial({ color: '#768487' })}
        position={[-65.568, -2.017, 54.661]}
        rotation={[-0.01, -1.473, 1.56]}
        scale={[0.155, 2.761, 1.897]}
      />
      <mesh
        geometry={nodes.Hall_4A006.geometry}
        material={nodes.Hall_4A006.material}
        position={[-330.93, 6.186, -83.617]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={7}
      />
      <mesh
        geometry={nodes.Hall_4A044.geometry}
        material={nodes.Hall_4A044.material}
        position={[-158.372, 3.096, -158.167]}
        rotation={[-Math.PI / 2, 0, -0.056]}
        scale={7}
      />
      
     {isPanelVisible && (
       <Html fullscreen>
        <div className="info-panel">
          <button onClick={closePanel}>&lt; Back</button>
          <img src={panelData.companylogo} alt={panelData.Exhibitor_Contact_Person} />
          <h2>{panelData.Exhibitor_Contact_Person}</h2>
          <p>{panelData.Catalog_Brief}</p>
          {/* Add any other information you want to display */}
        </div>
        </Html>
      )}
      

      {<Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} height={300} />}
    </group>
  )
}

useGLTF.preload('./Hall/Exibition_3dmodel.glb')