<script lang="ts">
  import { Three } from '@threlte/core';
  import * as THREE from 'three';
  import { TerrainMesh } from './TerrainMesh';

  const terrainMesh = new TerrainMesh();
</script>

<Three type={terrainMesh} position={[0, 20, 0]} />
