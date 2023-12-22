import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader, extend } from '@react-three/fiber';

extend({ PointsMaterial: THREE.PointsMaterial });

const Rain = ({ count = 10500 }) => {

  const rainGeo = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    for (let i = 0; i < count; i++) {
      positions.push(
        Math.random() * 1000 - 500, // wider x-range
        Math.random() * 500 - 250,  // y-position (height)
        Math.random() * 1000 - 500  // wider z-range
      );
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    return geometry;
  }, [count]);

  const rainMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.5,
    transparent: true,
  });

  const rainDropPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      positions.push(
        Math.random() * 400 - 200,
        Math.random() * 500 - 250,
        Math.random() * 400 - 200
      );
    }
    return new Float32Array(positions);
  }, [count]);

  rainGeo.setAttribute('position', new THREE.BufferAttribute(rainDropPositions, 3));

  useFrame(() => {
    const positions = rainGeo.attributes.position.array;
    for (let i = 1; i < positions.length; i += 3) {
      positions[i] -= 3 * Math.random();
      if (positions[i] < -100) {
        positions[i] = 100;
      }
    }
    rainGeo.attributes.position.needsUpdate = true;
  });

  return <points args={[rainGeo, rainMaterial]} />;
};

export default Rain;
