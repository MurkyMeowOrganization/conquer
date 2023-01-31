import { sveltekit } from '@sveltejs/kit/vite';
import crossOriginIsolation from 'vite-plugin-cross-origin-isolation';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit(), crossOriginIsolation()],
  ssr: {
    noExternal: ['three', 'troika-three-text'],
  },
};

export default config;
