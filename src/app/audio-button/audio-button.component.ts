import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { AudioService } from '../audio.service';
import { SampleStateEvent } from '../SampleStateEvent';

@Component({
  selector: 'audio-button',
  templateUrl: './audio-button.component.html',
  styleUrls: ['./audio-button.component.css']
})
export class AudioButtonComponent implements OnInit {

  constructor(
    private audio: AudioService
  ) {

  }

  private readonly fadeOutTime=200;

  @Input() row?: number;
  @Input() col?: number;
  @Input() sampleUrl?: string;
  @Output() sampleState: EventEmitter<any> = new EventEmitter();

  private gainNode?: GainNode;
  private audioData?: AudioBuffer;
  private audioBuffer?: AudioBufferSourceNode;
  samplePlaying: boolean = true;

  ngOnInit(): void {
    if (this.sampleUrl) {
      this.audio.loadSample(this.sampleUrl).subscribe(
        (res) => {
          this.audioData = res;
        },
        (error) => console.error(error)
      );
    }
  }

  click(): void {
    if (this.samplePlaying) {
      this.audioBuffer = this.startSample();
    } else {
      this.stopSample(this.audioBuffer);
    }
    this.samplePlaying = !this.samplePlaying;
  }

  private stopSample(audioBuffer: AudioBufferSourceNode | undefined) {
    this.fireSampleState();
    this.gainNode?.gain.linearRampToValueAtTime(0, this.audio.audio.currentTime + this.fadeOutTime/1000.0);
    
    let audioBufferToKill=this.audioBuffer;
    setTimeout(() => {
      audioBufferToKill?.disconnect();
      audioBufferToKill?.stop();
    },this.fadeOutTime);
  }

  private startSample(): AudioBufferSourceNode {
    
    let nextBeat=this.audio.getNextBeat();

    let newAudioBuffer = this.audio.audio.createBufferSource();
    this.fireSampleState();
    if (this.audioData) {
      newAudioBuffer.buffer = this.audioData;
      newAudioBuffer.loop = true;
      if (!this.gainNode) {
        this.gainNode = this.audio.audio.createGain();
        this.gainNode.connect(this.audio.audio.destination);
      }
      this.gainNode.gain.value=1.0;
      newAudioBuffer.connect(this.gainNode);
      newAudioBuffer.start(this.audio.getNextBeat());
    }
    return newAudioBuffer;
  }

  fireSampleState() {
    this.sampleState.emit(new SampleStateEvent(this.row || 0, this.col || 0, this.samplePlaying))
  }
}
