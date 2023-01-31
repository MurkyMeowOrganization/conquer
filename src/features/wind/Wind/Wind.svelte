<script lang="ts">
  import { Three } from '@threlte/core';
  import * as THREE from 'three';
  import myAudioWorkletPath from '../MeterProcessor?url';

  import windSound from '../sound/gusty_wind.mp3';

  let a = 5;

  const audio = new Audio();
  audio.src = windSound;

  let first = false;

  let level = 0;

  $: {
    if (first)
      (async function () {
        const audioCtx = new AudioContext();

        await audioCtx.audioWorklet.addModule(myAudioWorkletPath);

        const audioNode = new MediaElementAudioSourceNode(audioCtx, {
          mediaElement: audio,
        });

        const buf = new SharedArrayBuffer(4);
        const f32 = new Float32Array(buf);

        const meterNode = new AudioWorkletNode(audioCtx, 'meter-processor');

        audioNode.connect(meterNode).connect(audioCtx.destination);

        meterNode.port.postMessage(buf);

        setInterval(() => {
          level = f32[0];
        }, 16);

        audio.play();
      })();
  }
</script>

<svelte:body on:click={() => (first = true)} />

<Three type={THREE.Mesh} position.y={0.5}>
  <Three type={THREE.BoxGeometry} />
  <Three type={THREE.MeshStandardMaterial} color={`rgb(${Math.floor((level / 0.2) * 255)}, 0,0)`} />
</Three>
