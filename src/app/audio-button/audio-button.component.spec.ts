import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioButtonComponent } from './audio-button.component';

describe('AudioButtonComponent', () => {
  let component: AudioButtonComponent;
  let fixture: ComponentFixture<AudioButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
