import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GameService, Question } from '../services/game.service';
import { SoundService } from '../services/sound.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  standalone: false,
})
export class GamePage implements OnInit, OnDestroy {
  currentQuestion!: Question;
  selectedOptionIndex: number | null = null;
  lockedOptionIndex: number | null = null;
  correctOptionIndex: number | null = null;
  
  disabledOptions: number[] = [];
  doubleChanceActive = false;
  audiencePollData: number[] | null = null;
  displayPollData: number[] | null = null;
  isPolling: boolean = false;
  pollStartTime: number = 0;
  animationFrameId: any = null;
  phoneFriendData: { option: string, quote: string } | null = null;
  phoneFriendDialing: boolean = false;
  
  prizeLadder: string[] = [];
  isLadderModalOpen = false;

  timeLeft: number = 30;
  timerInterval: any = null;

  constructor(
    public gameService: GameService, 
    private router: Router,
    private soundService: SoundService
  ) {
    this.prizeLadder = [...this.gameService.questions.map(q => q.prize || '0')].reverse();
  }

  ngOnInit() {
    this.loadQuestion();
  }
  
  ionViewWillEnter() {
    this.soundService.startSuspense();
    if (this.gameService.currentQuestionIndex === 0 && this.gameService.currentPrize === '0') {
      this.loadQuestion();
    }
  }

  ionViewWillLeave() {
    this.soundService.stopSuspense();
    this.stopTimer();
  }

  ngOnDestroy() {
    this.soundService.stopSuspense();
    this.stopTimer();
  }

  startTimer() {
    this.timeLeft = 30;
    this.resumeTimer();
  }

  resumeTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.stopTimer();
        this.handleTimeout();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
  }

  handleTimeout() {
    this.soundService.playWrongSound();
    this.soundService.stopSuspense();
    setTimeout(() => {
      this.router.navigate(['/result']);
    }, 2500);
  }

  loadQuestion() {
    if (this.gameService.currentQuestionIndex >= this.gameService.questions.length) {
      this.soundService.stopSuspense();
      this.router.navigate(['/result']);
      return;
    }
    this.currentQuestion = this.gameService.getCurrentQuestion();
    this.selectedOptionIndex = null;
    this.lockedOptionIndex = null;
    this.correctOptionIndex = null;
    this.disabledOptions = [];
    this.doubleChanceActive = false;
    this.audiencePollData = null;
    
    // Play the authentic new question sound!
    this.soundService.playNewQuestionSound();
    
    this.startTimer();
  }

  selectOption(index: number) {
    if (this.lockedOptionIndex !== null || this.disabledOptions.includes(index)) return;
    this.selectedOptionIndex = index;
  }

  lockAnswer() {
    if (this.selectedOptionIndex === null) return;
    this.lockedOptionIndex = this.selectedOptionIndex;
    this.stopTimer();
    this.soundService.playLockSound();
    
    setTimeout(() => {
      this.checkAnswer();
    }, 2000);
  }

  checkAnswer() {
    const isCorrect = this.lockedOptionIndex === this.currentQuestion.correctIndex;
    this.correctOptionIndex = this.currentQuestion.correctIndex;
    
    if (isCorrect) {
      this.soundService.playCorrectSound();
      this.soundService.playSahiJawab();
      
      setTimeout(() => {
        this.gameService.checkAnswer(this.lockedOptionIndex!);
        this.loadQuestion();
      }, 2000);
    } else {
      this.soundService.playWrongSound();
      if (this.doubleChanceActive) {
        this.doubleChanceActive = false;
        this.disabledOptions.push(this.lockedOptionIndex!);
        this.lockedOptionIndex = null;
        this.selectedOptionIndex = null;
        this.correctOptionIndex = null;
      } else {
        this.soundService.stopSuspense();
        setTimeout(() => {
          this.router.navigate(['/result']);
        }, 2500);
      }
    }
  }

  useLifeline(type: '50-50' | 'audience' | 'double' | 'phone') {
    const result = this.gameService.useLifeline(type as any);
    if (!result) return;
    
    // Simple beep for lifeline
    this.soundService.playLockSound();
    
    if (type === '50-50') {
      this.disabledOptions = [...this.disabledOptions, ...result];
    } else if (type === 'audience') {
      this.stopTimer(); // Pause timer while poll is running
      this.audiencePollData = result;
      this.displayPollData = [0, 0, 0, 0];
      this.isPolling = true;
      this.pollStartTime = Date.now();
      
      // Play audience poll sound
      this.soundService.playAudiencePoll();
      
      const animatePoll = () => {
        const elapsed = Date.now() - this.pollStartTime;
        
        if (elapsed > 11000) {
          // Time is up, lock in the real answers
          this.isPolling = false;
          this.displayPollData = this.audiencePollData;
          return;
        }
        
        // Generate slow, smooth sine waves for each bar to avoid jumping (slightly faster now)
        this.displayPollData = [
          50 + 40 * Math.sin(elapsed / 450), // ~2.8s per full wave
          50 + 35 * Math.cos(elapsed / 350), // ~2.2s per full wave
          50 + 40 * Math.sin(elapsed / 600), // ~3.7s per full wave
          50 + 35 * Math.cos(elapsed / 500)  // ~3.1s per full wave
        ];
        
        this.animationFrameId = requestAnimationFrame(animatePoll);
      };
      
      animatePoll();
    } else if (type === 'double') {
      this.doubleChanceActive = true;
    } else if (type === 'phone') {
      this.stopTimer(); // Pause timer while calling
      this.phoneFriendDialing = true;
      this.soundService.playPhoneRing(); // Start ringing sound
      
      // Wait for 5 seconds to simulate realistic dialing/ringing
      setTimeout(() => {
        this.phoneFriendDialing = false;
        this.phoneFriendData = result;
        this.soundService.stopPhoneRing(); // Stop ringing sound when answered
      }, 5000);
    }
  }
  
  closePoll() {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    this.audiencePollData = null;
    this.displayPollData = null;
    this.isPolling = false;
    this.soundService.stopAudiencePoll();
    this.resumeTimer(); // Resume timer when poll closes
  }
  
  closePhone() {
    this.phoneFriendData = null;
    this.phoneFriendDialing = false;
    this.soundService.stopPhoneRing(); // Stop ringing if closed early
    this.resumeTimer(); // Resume timer when phone closes
  }

  openLadder() {
    this.isLadderModalOpen = true;
  }
  
  closeLadder() {
    this.isLadderModalOpen = false;
  }
  
  getBackgroundClass(): string {
    const i = this.gameService.currentQuestionIndex;
    if (i < 5) return 'bg-easy';
    if (i < 11) return 'bg-medium';
    return 'bg-hard';
  }
}
