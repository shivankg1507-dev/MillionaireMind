import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { SoundService } from '../services/sound.service';

declare var require: any;
const confetti = require('canvas-confetti');

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
  standalone: false,
})
export class ResultPage {
  currentDate: Date = new Date();


  constructor(
    public gameService: GameService,
    private router: Router,
    public soundService: SoundService,
    private el: ElementRef
  ) { }

  ionViewDidEnter() {
    // This fires every single time the result page is shown
    if (this.gameService.currentPrize === '7 CRORE') {
      this.soundService.play7CroreWin();
      this.fireConfetti(15000);
      
      setTimeout(() => {
        this.soundService.playClapping(0.3);
      }, 2000);
    } else {
      // Logic for losing the game
      if (this.gameService.currentQuestionIndex < 5) {
        // Lost in easy pool (Q1 to Q5): Only show "Better luck next time!", no sound, no sprinkles
      } else if (this.gameService.currentQuestionIndex < 8) {
        // Lost in medium pool up to Q8 (Q6 to Q8): Play clapping sound only
        this.soundService.playClapping(1.0);
      } else {
        // Lost at Q9 or higher: Play clapping sound AND show sprinkles
        this.soundService.playClapping(1.0);
        this.fireConfetti(4000);
      }
    }
  }

  fireConfetti(durationMs: number) {
    const end = Date.now() + durationMs;

    // Create a custom canvas over the Ionic app
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '999999';
    canvas.style.pointerEvents = 'none';

    // Force the canvas into the 3D hardware-accelerated layer so it sits above the rotating Cheque
    canvas.style.transform = 'translate3d(0, 0, 1000px)';

    // Append securely to THIS specific instance of the page in the DOM
    this.el.nativeElement.appendChild(canvas);

    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true
    });

    const frame = () => {
      if (Date.now() < end) {
        // Keep shooting new confetti while under the time limit
        myConfetti({
          particleCount: 15,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: ['#ffcf40', '#ffffff', '#c9a752', '#ff0000', '#00ff00', '#0000ff']
        });
        myConfetti({
          particleCount: 15,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: ['#ffcf40', '#ffffff', '#c9a752', '#ff0000', '#00ff00', '#0000ff']
        });
        requestAnimationFrame(frame);
      } else {
        // Time is up! Stop shooting new confetti, but allow existing particles to fall off screen.
        // We just wait 3 seconds for them to fall, then remove the canvas.
        setTimeout(() => canvas.remove(), 3000);
      }
    };
    frame();
  }

  playAgain() {
    this.gameService.resetGame();
    this.router.navigate(['/home']);
  }
}
