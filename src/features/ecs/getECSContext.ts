import { getContext } from 'svelte';
import { ECS_CONTEXT_KEY } from './constants';
import type { ECSContextType } from './types';

export function getECSContext(): ECSContextType {
  return getContext(ECS_CONTEXT_KEY);
}
