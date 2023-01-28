import { BackSide, Mesh, ShaderMaterial, SphereGeometry } from 'three';
import fragmentShader from './SkyMesh.fragment.glslx?raw';
import vertexShader from './SkyMesh.vertex.glslx?raw';

export class SkyMesh extends Mesh {
  _material: ShaderMaterial;

  constructor() {
    const uniforms = {
      iTime: {
        type: 'f',
        value: 0,
      },
    };

    const material = new ShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms,
      side: BackSide,
    });

    super(new SphereGeometry(1000), material);

    this.position.setY(500);

    this._material = material;
  }

  update(time: number) {
    this._material.uniforms.iTime.value = time;
  }
}
