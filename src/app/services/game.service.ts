import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Question {
  text: string;
  textHindi: string;
  options: string[];
  optionsHindi: string[];
  correctIndex: number;
  prize?: string;
  isMilestone?: boolean;
  image?: string;
}

export interface Lifeline {
  name: string;
  used: boolean;
  type: '50-50' | 'audience' | 'double' | 'phone';
  icon: string;
}

const PRIZE_LADDER = [
  { prize: '1,000', isMilestone: false },
  { prize: '2,000', isMilestone: false },
  { prize: '3,000', isMilestone: false },
  { prize: '5,000', isMilestone: false },
  { prize: '10,000', isMilestone: true },
  { prize: '20,000', isMilestone: false },
  { prize: '40,000', isMilestone: false },
  { prize: '80,000', isMilestone: false },
  { prize: '1,60,000', isMilestone: false },
  { prize: '3,20,000', isMilestone: true },
  { prize: '6,40,000', isMilestone: false },
  { prize: '12,50,000', isMilestone: false },
  { prize: '25,00,000', isMilestone: false },
  { prize: '50,00,000', isMilestone: false },
  { prize: '1 CRORE', isMilestone: true },
  { prize: '7 CRORE', isMilestone: true }
];

@Injectable({
  providedIn: 'root'
})
export class GameService {
  questions: Question[] = [];
  currentQuestionIndex: number = 0;
  currentPrize: string = '0';
  playerName: string = '';

  easyPool: Question[] = [];
  mediumPool: Question[] = [];
  hardPool: Question[] = [];
  isReady: boolean = false;

  lifelines: Lifeline[] = [
    { name: 'Phone a Friend', used: false, type: 'phone', icon: 'call' },
    { name: 'Audience Poll', used: false, type: 'audience', icon: 'people' },
    { name: 'Double Chance', used: false, type: 'double', icon: 'reload-circle' },
    { name: '50:50', used: false, type: '50-50', icon: 'close-circle' }
  ];

  constructor(private http: HttpClient) {
    this.loadQuestions();
  }

  loadQuestions() {
    this.http.get<any>(`assets/questions.json?v=${new Date().getTime()}`).subscribe(data => {
      this.easyPool = data.easy || [];
      this.mediumPool = data.medium || [];
      this.hardPool = data.hard || [];

      this.isReady = true;
      this.generateNewGame();
    }, error => {
      console.error('Failed to load questions.json', error);
    });
  }

  generateNewGame() {
    if (!this.isReady) return; // Wait for JSON to load

    const pickQuestions = (pool: Question[], count: number) => {
      const shuffled = [...pool];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled.slice(0, Math.min(count, shuffled.length));
    };

    // Select 5 Easy, 6 Medium, 5 Hard purely randomly
    const selectedEasy = pickQuestions(this.easyPool, 5);
    const selectedMedium = pickQuestions(this.mediumPool, 6);
    const selectedHard = pickQuestions(this.hardPool, 5);

    // Clear any old local storage if it exists to keep it clean
    localStorage.removeItem('millionaire_used_questions');

    const combined = [...selectedEasy, ...selectedMedium, ...selectedHard];

    // Assign prizes and milestones dynamically
    this.questions = combined.map((q, index) => {
      // Deep copy to prevent modifying the constant pools
      const newQ = { ...q, options: [...q.options], optionsHindi: [...q.optionsHindi] };
      newQ.prize = PRIZE_LADDER[index].prize;
      newQ.isMilestone = PRIZE_LADDER[index].isMilestone;
      return newQ;
    });

    this.shuffleAllOptions();
  }

  shuffleAllOptions() {
    this.questions.forEach(q => {
      const correctAnswer = q.options[q.correctIndex];
      for (let i = q.options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [q.options[i], q.options[j]] = [q.options[j], q.options[i]];
        [q.optionsHindi[i], q.optionsHindi[j]] = [q.optionsHindi[j], q.optionsHindi[i]];
      }
      q.correctIndex = q.options.indexOf(correctAnswer);
    });
  }

  getCurrentQuestion(): Question {
    return this.questions[this.currentQuestionIndex];
  }

  checkAnswer(selectedIndex: number): boolean {
    const isCorrect = selectedIndex === this.getCurrentQuestion().correctIndex;
    if (isCorrect) {
      this.currentPrize = this.getCurrentQuestion().prize || '0';
      this.currentQuestionIndex++;
    }
    return isCorrect;
  }

  useLifeline(type: '50-50' | 'audience' | 'double' | 'phone'): any {
    const lifeline = this.lifelines.find(l => l.type === type);
    if (!lifeline || lifeline.used) return null;

    lifeline.used = true;
    const currentQ = this.getCurrentQuestion();

    if (type === 'phone') {
      const isCorrect = Math.random() < 0.8;
      const optionsArray = ['A', 'B', 'C', 'D'];
      let selectedIndex = currentQ.correctIndex;
      let quote = '';

      if (isCorrect) {
        const correctQuotes = [
          `I just googled it, the answer is definitely ${optionsArray[selectedIndex]}! Hurry up!`,
          `Are you serious? It's so easy! It's option ${optionsArray[selectedIndex]}!`,
          `I am 100% sure it is ${optionsArray[selectedIndex]}. Lock it!`,
          `My dad says it's ${optionsArray[selectedIndex]}. Trust me on this one.`,
          `Bro, I literally read about this yesterday. It's ${optionsArray[selectedIndex]}!`,
          `Don't overthink it, my friend. Lock ${optionsArray[selectedIndex]} and win the money!`,
          `If it's not ${optionsArray[selectedIndex]}, I will give you the prize money myself!`,
          `I asked ChatGPT for you, it says the answer is ${optionsArray[selectedIndex]}.`,
          `I saw this in a meme yesterday, the answer is ${optionsArray[selectedIndex]}. Thank me later!`,
          `Amitabh Bachchan whispered this to me in a dream... it's definitely ${optionsArray[selectedIndex]}!`,
          `If it's not ${optionsArray[selectedIndex]}, I'll eat my shoe. Lock it in!`,
          `Bro, this is literally my favorite topic. Go with ${optionsArray[selectedIndex]} and buy me dinner!`,
          `My dog barked ${selectedIndex + 1} times, so it has to be ${optionsArray[selectedIndex]}!`
        ];
        quote = correctQuotes[Math.floor(Math.random() * correctQuotes.length)];
      } else {
        const wrongIndices = [0, 1, 2, 3].filter(i => i !== currentQ.correctIndex);
        selectedIndex = wrongIndices[Math.floor(Math.random() * wrongIndices.length)];
        const unsureQuotes = [
          `Hello? Bro I am sleeping... I think it's ${optionsArray[selectedIndex]} but don't blame me if you go bankrupt!`,
          `I'm not really sure... maybe ${optionsArray[selectedIndex]}? Good luck man.`,
          `Uhh... I think I read somewhere it was ${optionsArray[selectedIndex]}. Please don't lock it if you're not sure!`,
          `I don't know this one! If I had to guess, maybe ${optionsArray[selectedIndex]}?`,
          `Why did you call me for this?! Just guess ${optionsArray[selectedIndex]} and pray.`,
          `Wait, is Amitabh Bachchan there? Tell him I said hi! Oh, and the answer might be ${optionsArray[selectedIndex]}.`,
          `My internet is down! Uh... ${optionsArray[selectedIndex]}? Just go with it!`,
          `I asked my little brother and he said ${optionsArray[selectedIndex]}. He is 5 years old though...`
        ];
        quote = unsureQuotes[Math.floor(Math.random() * unsureQuotes.length)];
      }

      return { option: optionsArray[selectedIndex], quote: quote };
    }

    if (type === '50-50') {
      let incorrectIndices = [0, 1, 2, 3].filter(i => i !== currentQ.correctIndex);
      incorrectIndices = incorrectIndices.sort(() => 0.5 - Math.random()).slice(0, 2);
      return incorrectIndices;
    }

    if (type === 'audience') {
      let percentages = [0, 0, 0, 0];
      let remaining = 100;

      let correctPercentage = Math.floor(Math.random() * 31) + 40;
      percentages[currentQ.correctIndex] = correctPercentage;
      remaining -= correctPercentage;

      let wrongIndices = [0, 1, 2, 3].filter(i => i !== currentQ.correctIndex);
      wrongIndices.forEach((index, i) => {
        if (i === 2) {
          percentages[index] = remaining;
        } else {
          let p = Math.floor(Math.random() * remaining);
          percentages[index] = p;
          remaining -= p;
        }
      });
      return percentages;
    }

    if (type === 'double') {
      return true;
    }
  }

  resetGame() {
    this.currentQuestionIndex = 0;
    this.currentPrize = '0';
    this.lifelines.forEach(l => l.used = false);
    this.generateNewGame();
  }
}
