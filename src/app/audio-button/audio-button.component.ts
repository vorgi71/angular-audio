import { Component, OnInit } from '@angular/core';
import { AudioService } from '../audio.service';

@Component({
  selector: 'audio-button',
  templateUrl: './audio-button.component.html',
  styleUrls: ['./audio-button.component.css']
})
export class AudioButtonComponent implements OnInit {

  constructor(
    private audio: AudioService
  ) { }

  ngOnInit(): void {
  }

  click(): void {
    this.audio.play();
  }

}
