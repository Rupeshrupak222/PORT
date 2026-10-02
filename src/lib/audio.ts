// Audio system disabled - clean no-op manager

class AudioManager {
  public subscribe(_cb: (muted: boolean) => void) {
    return () => {};
  }

  public setSongSource(_src: string) {}

  public toggleMute(): boolean {
    return true;
  }

  public playSong() {}

  public pauseSong() {}

  public getMuted(): boolean {
    return true;
  }

  public playHover() {}

  public playClick() {}

  public playChime() {}

  public startAmbient() {}

  public stopAmbient() {}
}

export const audio = new AudioManager();
