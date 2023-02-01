import * as THREE from 'three';
import { DoubleSide, Vector3 } from 'three';
import fragmentShader from './TreeMesh.fragment.glslx?raw';
import vertexShader from './TreeMesh.vertex.glslx?raw';

export interface TreeMeshOptions {
  trunkTexture: THREE.Texture;
  leavesTexture: THREE.Texture;
}

export class TreeMesh extends THREE.Mesh {
  _material: THREE.ShaderMaterial;

  constructor(options: TreeMeshOptions) {
    const { leavesTexture, trunkTexture } = options;

    const uniforms: { [uniform: string]: THREE.IUniform } = {
      iTime: {
        value: 0,
      },
      pixelization: {
        value: 50,
      },
      tex: {
        value: leavesTexture,
      },
    };

    const material = new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms,
      side: DoubleSide,
      transparent: true,
    });

    const topLeft = [0, 0];
    const topRight = [1, 0];
    const bottomRight = [1, 1];
    const bottomLeft = [0, 1];

    const rot45 = new THREE.Matrix4().makeRotationY(Math.PI / 2);
    const rot90 = new THREE.Matrix4().makeRotationY(Math.PI);

    const applyMatrix4 = (vec: number[], mat: THREE.Matrix4): number[] => {
      const r = new Vector3(vec[0], vec[1], vec[2]).applyMatrix4(mat);
      return [r.x, r.y, r.z];
    };

    const vertices = [
      { pos: [-1, -1, 0], uv: topLeft },
      { pos: [1, -1, 0], uv: topRight },
      { pos: [1, 4, 0], uv: bottomRight },

      { pos: [-1, -1, 0], uv: topLeft },
      { pos: [-1, 4, 0], uv: bottomLeft },
      { pos: [1, 4, 0], uv: bottomRight },

      { pos: applyMatrix4([-1, -1, 0], rot45), uv: topLeft },
      { pos: applyMatrix4([1, -1, 0], rot45), uv: topRight },
      { pos: applyMatrix4([1, 4, 0], rot45), uv: bottomRight },

      { pos: applyMatrix4([-1, -1, 0], rot45), uv: topLeft },
      { pos: applyMatrix4([-1, 4, 0], rot45), uv: bottomLeft },
      { pos: applyMatrix4([1, 4, 0], rot45), uv: bottomRight },

      { pos: applyMatrix4([-1, -1, 0], rot90), uv: topLeft },
      { pos: applyMatrix4([1, -1, 0], rot90), uv: topRight },
      { pos: applyMatrix4([1, 4, 0], rot90), uv: bottomRight },

      { pos: applyMatrix4([-1, -1, 0], rot90), uv: topLeft },
      { pos: applyMatrix4([-1, 4, 0], rot90), uv: bottomLeft },
      { pos: applyMatrix4([1, 4, 0], rot90), uv: bottomRight },
    ];

    const positions: number[] = [];
    const uvs: number[] = [];
    for (const vertex of vertices) {
      positions.push(...vertex.pos);
      uvs.push(...vertex.uv);
    }

    const geometry = new THREE.BufferGeometry();
    const positionNumComponents = 3;
    const uvNumComponents = 2;
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(positions), positionNumComponents)
    );
    geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents));

    super(geometry, material);

    this._material = material;
  }

  updatePixelization(pixelization: number) {
    this._material.uniforms.pixelization.value = pixelization;
  }

  updateTime(time: number) {
    this._material.uniforms.iTime.value = time;
  }
}
