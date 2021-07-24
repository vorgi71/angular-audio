import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  audio: AudioContext;

  constructor() {
    // const AudioContext = window.AudioContext || window.webkitAudioContext;

    this.audio = new AudioContext();
  }

  play(): void {
    const osc = this.audio.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.value = 440;
    let filter:BiquadFilterNode=this.audio.createBiquadFilter();
    osc.connect(filter);
    filter.connect(this.audio.destination);
    const time = this.audio.currentTime;
    filter.frequency.setValueCurveAtTime([150,10000,150],time,1);
    osc.start(time);
    osc.stop(time + 1);
  }
}
