import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  audio: AudioContext;

  bpm: number = 125;

  constructor(
    private http: HttpClient
  ) {
    this.audio = new AudioContext();
  }

  play(): void {
    const osc = this.audio.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.value = 440;
    let filter: BiquadFilterNode = this.audio.createBiquadFilter();
    osc.connect(filter);
    filter.connect(this.audio.destination);
    const time = this.audio.currentTime;
    filter.frequency.setValueCurveAtTime([150, 10000, 150], time, 1);
    osc.start(time);
    osc.stop(time + 1);
  }

  loadSample(url:string) {
    console.log(`start loadSample(${url})`);
    let source = this.audio.createBufferSource();

    let httpRequest = this.http.get<ArrayBuffer>(url, { responseType: 'ArrayBuffer' as 'json' });

    return httpRequest.pipe(
      tap((data) => console.log('state 1:' + data)),
      mergeMap(data => {
        return this.audio.decodeAudioData(data);
      })
    );
  }

  getNextBeat() {
    let currentTime=this.audio.currentTime;
    let secPerBeat=60/this.bpm;
    let rest=currentTime%secPerBeat;
    return currentTime+(secPerBeat-rest);
  }
}
