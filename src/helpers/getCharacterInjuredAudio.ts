export function getCharacterInjuredAudio(incomingAudio: string) {
    const audio = new Audio;
    audio.src = incomingAudio;
    return audio
}