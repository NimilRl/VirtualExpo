import React, { useMemo } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Cloud = () => {
  const texture = useLoader(THREE.TextureLoader, "https://raw.githubusercontent.com/navin-navi/codepen-assets/master/images/smoke.png");
  
  const clouds = useMemo(() => {
    const cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
    const cloudMaterial = new THREE.MeshLambertMaterial({
      map: texture,
      transparent: true,
      color: new THREE.Color(0x333333) // Darker color for clouds
    });

    const cloudMeshes = [];
    for (let i = 0; i < 25; i++) {
      const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
      cloud.position.set(
        Math.random() * 800 - 400,
        400, // Lowered y-position for clouds
        Math.random() * 500 - 500
      );
      cloud.rotation.x = 1.16;
      cloud.rotation.y = -0.12;
      cloud.rotation.z = Math.random() * 2 * Math.PI;
      cloud.material.opacity = 0.8; // Adjust for darker appearance
      cloudMeshes.push(cloud);
    }
    return cloudMeshes;
  }, [texture]);

  useFrame(() => {
    clouds.forEach(cloud => {
      cloud.rotation.z -= 0.002;
    });
  });

  return (
    <>
      {clouds.map((cloud, index) => (
        <primitive key={index} object={cloud} />
      ))}
    </>
  );
};

export default Cloud;
