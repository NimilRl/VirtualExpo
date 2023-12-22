import React, { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

const Snowflake = ({ count }) => {
  const mesh = useRef()
  const snowflakes = useMemo(() => {
    const temp = []
    const geometry = new THREE.BufferGeometry()
    const textureLoader = new THREE.TextureLoader()

    const sprites = [
      textureLoader.load('./snow-effect/snowflake1.png'),
      textureLoader.load('./snow-effect/snowflake2.png'),
      textureLoader.load('./snow-effect/snowflake3.png'),
      textureLoader.load('./snow-effect/snowflake4.png'),
      textureLoader.load('./snow-effect/snowflake5.png')
    ]

    const vertices = []
    for (let i = 0; i < count; i++) {
      const x = Math.random() * 2000 - 1000
      const y = Math.random() * 2000 - 1000
      const z = Math.random() * 2000 - 1000
      vertices.push(x, y, z)
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

    for (let i = 0; i < 5; i++) {
      temp.push(
        <points key={i} ref={mesh}>
          <primitive attach="geometry" object={geometry} />
          <pointsMaterial attach="material" map={sprites[i]} size={10} blending={THREE.AdditiveBlending} depthTest={false} transparent={true} />
        </points>
      )
    }

    return temp
  }, [count])

  useFrame(() => {
    // Animation logic here
    mesh.current.rotation.x += 0.001
    mesh.current.rotation.y += 0.001
  })

  return <>{snowflakes}</>
}
export { Snowflake }
