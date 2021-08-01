import { Component, Input, OnInit } from '@angular/core';
import { AudioService } from '../audio.service';

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

  @Input() sampleUrl?: string;

  private audioData?:AudioBuffer;
  private audioBuffer?: AudioBufferSourceNode;
  toggle: boolean = true;

  ngOnInit(): void {
    if (this.sampleUrl) {
      this.audio.loadSample(this.sampleUrl).subscribe(
        (res) => {
          this.audioData=res;
        },
        (error) => console.error(error)
      );
    }
  }

  click(): void {
    if (this.toggle) {
      this.audioBuffer=this.audio.audio.createBufferSource();
      if(this.audioData) {
        this.audioBuffer.buffer = this.audioData;
        this.audioBuffer.loop = true;
        this.audioBuffer.connect(this.audio.audio.destination);
        this.audioBuffer?.start();
      }

    } else {
      this.audioBuffer?.disconnect();
      this.audioBuffer?.stop();
    }
    this.toggle = !this.toggle;
  }

}
