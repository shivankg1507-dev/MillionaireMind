import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { SoundService } from '../services/sound.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: false,
})
export class IntroPage implements OnInit {
  isVideoPlaying = false;
  showPlayButton = false;
  fadeOut = false;

  constructor(
    private router: Router,
    public gameService: GameService,
    private soundService: SoundService
  ) {}

  @ViewChild('introVideo') videoElement!: ElementRef<HTMLVideoElement>;

  ngOnInit() {
  }

  ionViewDidEnter() {
    if (this.videoElement && this.videoElement.nativeElement) {
      this.videoElement.nativeElement.play().catch(e => {
        console.log('Autoplay prevented', e);
        this.showPlayButton = true;
      });
    }
  }

  manualPlay() {
    if (this.videoElement && this.videoElement.nativeElement) {
      this.showPlayButton = false;
      this.videoElement.nativeElement.play();
    }
  }

  videoEnded() {
    this.fadeOut = true;
    setTimeout(() => {
      this.router.navigate(['/game'], { replaceUrl: true });
    }, 800); // 800ms fade to black
  }

  videoPlaying() {
    this.isVideoPlaying = true;
    this.showPlayButton = false;
  }

  skipVideo() {
    if (!this.fadeOut) {
      this.videoEnded();
    }
  }
}
