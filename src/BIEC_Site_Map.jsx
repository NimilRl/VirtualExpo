
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function BIEC_Site_Map(props) {
  const { nodes, materials } = useGLTF('./Hall/BIEC_Site_Map.glb')
  return (
    <group {...props} dispose={null}>
      <group scale={7}>
        <group position={[-20.887, 14.706, -22.467]} rotation={[0, 0, 0]}>
          <mesh geometry={nodes.mesh_0.geometry} material={nodes.mesh_0.material} />
          <mesh geometry={nodes.mesh_0_1.geometry} material={nodes.mesh_0_1.material} />
          <mesh geometry={nodes.mesh_0_2.geometry} material={nodes.mesh_0_2.material} />
          <mesh geometry={nodes.mesh_0_3.geometry} material={nodes.mesh_0_3.material} />
          <mesh geometry={nodes.mesh_0_4.geometry} material={nodes.mesh_0_4.material} />
          <mesh geometry={nodes.mesh_0_5.geometry} material={nodes.mesh_0_5.material} />
          <mesh geometry={nodes.mesh_0_6.geometry} material={nodes.mesh_0_6.material} />
          <mesh geometry={nodes.mesh_0_7.geometry} material={nodes.mesh_0_7.material} />
          <mesh geometry={nodes.mesh_0_8.geometry} material={nodes.mesh_0_8.material} />
          <mesh geometry={nodes.mesh_0_9.geometry} material={nodes.mesh_0_9.material} />
          <mesh geometry={nodes.mesh_0_10.geometry} material={nodes.mesh_0_10.material} />
          <mesh geometry={nodes.mesh_0_11.geometry} material={nodes.mesh_0_11.material} />
          <mesh geometry={nodes.mesh_0_12.geometry} material={nodes.mesh_0_12.material} />
          <mesh geometry={nodes.mesh_0_13.geometry} material={nodes.mesh_0_13.material} />
          <mesh geometry={nodes.mesh_0_14.geometry} material={nodes.mesh_0_14.material} />
          <mesh geometry={nodes.mesh_0_15.geometry} material={nodes.mesh_0_15.material} />
          <mesh geometry={nodes.mesh_0_16.geometry} material={nodes.mesh_0_16.material} />
          <mesh geometry={nodes.mesh_0_17.geometry} material={nodes.mesh_0_17.material} />
          <mesh geometry={nodes.mesh_0_18.geometry} material={nodes.mesh_0_18.material} />
          <mesh geometry={nodes.mesh_0_19.geometry} material={nodes.mesh_0_19.material} />
          <mesh geometry={nodes.mesh_0_20.geometry} material={nodes.mesh_0_20.material} />
          <mesh geometry={nodes.mesh_0_21.geometry} material={nodes.mesh_0_21.material} />
          <mesh geometry={nodes.mesh_0_22.geometry} material={nodes.mesh_0_22.material} />
          <mesh geometry={nodes.mesh_0_23.geometry} material={nodes.mesh_0_23.material} />
          <mesh geometry={nodes.mesh_0_24.geometry} material={nodes.mesh_0_24.material} />
          <mesh geometry={nodes.mesh_0_25.geometry} material={nodes.mesh_0_25.material} />
          <mesh geometry={nodes.mesh_0_26.geometry} material={nodes.mesh_0_26.material} />
          <mesh geometry={nodes.mesh_0_27.geometry} material={nodes.mesh_0_27.material} />
          <mesh geometry={nodes.mesh_0_28.geometry} material={nodes.mesh_0_28.material} />
          <mesh geometry={nodes.mesh_0_29.geometry} material={nodes.mesh_0_29.material} />
          <mesh geometry={nodes.mesh_0_30.geometry} material={nodes.mesh_0_30.material} />
          <mesh geometry={nodes.mesh_0_31.geometry} material={nodes.mesh_0_31.material} />
          <mesh geometry={nodes.mesh_0_32.geometry} material={nodes.mesh_0_32.material} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('./Hall/BIEC_Site_Map.glb')
