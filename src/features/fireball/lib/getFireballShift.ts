import * as THREE from 'three';

export function getFireballShift(
  direction: THREE.Vector3,
  speed: number,
  dt: number
): THREE.Vector3 {
  const shift = new THREE.Vector3(direction.x, direction.y, direction.z);

  shift.multiplyScalar(speed * dt);

  return shift;
}
