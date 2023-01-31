// import { StoppableAudioWorkletProcessor } from '../../shared/lib/sound/StoppableAudioWorkletProcessor';

const MESSAGE_CHANNELS = 'channels';
const MESSAGE_LEVEL = 'level';

class StoppableAudioWorkletProcessor extends AudioWorkletProcessor {
  running = true;

  constructor() {
    super();
    this.port.onmessage = this.onMessage.bind(this);
  }

  onMessage(event: MessageEvent) {
    if (event.data === 'stop') {
      this.stop();
    }
  }

  stop() {
    this.running = false;
  }
}

export class MeterProcessor extends StoppableAudioWorkletProcessor {
  buf?: SharedArrayBuffer;
  f32?: Float32Array;

  onMessage(event: MessageEvent<any>): void {
    super.onMessage(event);

    if (event.data instanceof SharedArrayBuffer) {
      this.buf = event.data;
      this.f32 = new Float32Array(this.buf);
    }
  }

  process(inputs: Float32Array[][], outputs: Float32Array[][]) {
    const input = inputs[0];

    let level = 0;

    for (let channel = 0; channel < input.length; ++channel) {
      level += getMaxAmplitude(input[channel]);
    }

    for (let output = 0; output < outputs.length; ++output) {
      for (let channel = 0; channel < outputs[output].length; ++channel) {
        outputs[output][channel].set(input[channel]);
      }
    }

    level /= input.length;

    if (this.f32) {
      this.f32[0] = level;
    }

    return this.running;
  }
}

function getMaxAmplitude(buffer: Float32Array): number {
  let maxAmplitude = 0;

  const sampleFrames = buffer.length;
  for (let i = 0; i < sampleFrames; i++) {
    const amplitude = Math.abs(buffer[i]);
    if (amplitude > maxAmplitude) {
      maxAmplitude = amplitude;
    }
  }

  return maxAmplitude;
}

registerProcessor('meter-processor', MeterProcessor);
