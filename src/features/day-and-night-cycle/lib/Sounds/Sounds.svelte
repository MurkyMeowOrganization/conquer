<script lang="ts">
  import birds from './sound/birds.mp3';
  import meadow from './sound/meadow.mp3';
  import owl from './sound/owl.mp3';
  import owl2 from './sound/owl2.mp3';
  import wolf from './sound/wolf.mp3';
  import rooster from './sound/rooster.mp3';
  import { onDestroy } from 'svelte';

  export let isDay: boolean;

  let firstRun = true;
  let firstInteraction = false;

  const nightAmbience = meadow;
  const dayAmbience = birds;

  const dayAppearance = [rooster];

  const nightAppearance = [owl, owl2, wolf];

  const ambienceAudio = new Audio();
  ambienceAudio.loop = true;
  const appearanceAudio = new Audio();

  $: {
    console.log(isDay);
  }

  $: {
    if (!firstInteraction) {
    } else if (firstRun) {
      firstRun = false;
    } else {
      const ambienceSound = isDay ? dayAmbience : nightAmbience;
      const appearanceSounds = isDay ? dayAppearance : nightAppearance;

      const appearanceSound = appearanceSounds[Math.floor(Math.random() * appearanceSounds.length)];

      ambienceAudio.src = ambienceSound;
      ambienceAudio.currentTime = 0;
      ambienceAudio.play();

      appearanceAudio.src = appearanceSound;
      appearanceAudio.currentTime = 0;
      appearanceAudio.play();
    }
  }

  onDestroy(() => {
    ambienceAudio.pause();
    appearanceAudio.pause();
  });
</script>

<svelte:body on:click={() => (firstInteraction = true)} />
