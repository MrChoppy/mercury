import { Component, OnInit } from '@angular/core';
import { WordService } from '../word.service';

const prohibitedWords = [
  'anal',
  'penis',
  'vagina',
  'rape',
  'bitch',
  'ballsack',
  'blowjob',
  'boner',
  'buttplug',
  'clitoris',
  'cock',
  'coon',
  'cunt',
  'dick',
  'dildo',
  'dyke',
  'fuck',
  'faggot',
  'fellatio',
  'fellate',
  'flange',
  'sex',
  'sexy',
  'jizz',
  'labia',
  'nigger',
  'nigga',
  'pussy',
  'queer',
  'scrotum',
  'slut',
  'shit',
  'smegma',
  'spunk',
  'tit',
  'boobs',
  'boob',
  'twat',
  'whore',
  'horny',
  'vulva',
  'vulvas',
  'titty',
  'vaginated',
  'porno',
  'pornos',
  'rectum',
];

@Component({
  selector: 'app-word-stacking',
  templateUrl: './word-stacking.component.html',
  styleUrls: ['./word-stacking.component.css'],
})
export class WordStackingComponent implements OnInit {
  stackedWords: { word: string; state: string }[] = [];
  userInput: string = '';
  maxStackHeight: number = 10;
  gameOverMessage: string = 'Game Over! You reached the top.';
  isGameOver: boolean = false;
  wordLength: number = 4;
  score: number = 0;
  highScore: number = 0;
  isGameStarted: boolean = false;

  musicVolume: number = 0.5;
  music = new Audio();
  songs: string[] = [
    'assets/songs/doping-highway.mp3',
    'assets/songs/hit-rewind.mp3',
    'assets/songs/rapid.mp3',
    'assets/songs/salty-dog.mp3',
    'assets/songs/jikanhakai.mp3',
    'assets/songs/overtake.mp3',
    'assets/songs/tiny-racers.mp3',
    'assets/songs/electronic-arabian.mp3',
    'assets/songs/gone-with-the-wind.mp3',
    'assets/songs/invincible.mp3',
    'assets/songs/tsuiseki-23ji.mp3',
    'assets/songs/cosmic-racing.mp3',
  ];
  musicPlaying: boolean = false;

  private wordGenerationInterval: any;
  private wordLengthInterval: any;

  constructor(private wordService: WordService) {}

  ngOnInit() {
    const savedScore = localStorage.getItem('highScore');
    if (savedScore) {
      this.highScore = parseInt(savedScore, 10);
    }
  }

  startGame() {
    this.isGameStarted = true;
    this.stackedWords = [];
    this.wordLength = 4;
    this.score = 0;
    this.isGameOver = false;

    if (this.wordGenerationInterval) {
      clearInterval(this.wordGenerationInterval);
    }

    if (this.wordLengthInterval) {
      clearInterval(this.wordLengthInterval);
    }
    this.playSound('assets/sfx/button.mp3');
    this.startWordGeneration();
    if (!this.musicPlaying) {
      this.playRandomSong();
    }
  }

  startWordGeneration() {
    this.wordGenerationInterval = setInterval(() => {
      if (this.stackedWords.length < this.maxStackHeight) {
        this.fetchRandomWord();
      } else {
        this.gameOver();
      }
    }, 1500);

    this.wordLengthInterval = setInterval(() => {
      this.increaseWordLengthIfNeeded();
    }, 10000);
  }

  increaseWordLengthIfNeeded() {
    this.wordLength++;
  }

  async fetchRandomWord() {
    try {
      const response = await this.wordService
        .getRandomWord(this.wordLength)
        .toPromise();

      if (response && response.length > 0) {
        const [randomWord] = response;
        if (!prohibitedWords.includes(randomWord.toLowerCase())) {
          this.stackedWords.push({ word: randomWord, state: 'fall' });
        }
      } else {
        console.error('Invalid response:', response);
      }
    } catch (error) {
      console.error('Error fetching random word:', error);
      // Handle errors gracefully and inform the user
    }
  }

  onInputChange() {
    if (!this.isGameOver) {
      if (this.stackedWords.length > 0) {
        const bottomWord = this.stackedWords[0];
        if (this.userInput === bottomWord.word) {
          this.playSound('assets/sfx/word.mp3');
          bottomWord.state = 'disappear';
          this.stackedWords.shift();
          this.userInput = '';
          this.score++;
        }
      }
    }
  }

  gameOver() {
    this.isGameOver = true;

    this.isGameStarted = false;
    if (this.score > this.highScore) {
      // Save the new high score to localStorage
      this.highScore = this.score;
      localStorage.setItem('highScore', this.highScore.toString());
    }
  }

  playSound(sound: string) {
    const audio = new Audio();
    audio.src = sound;
    audio.load();
    audio.play();
  }

  playRandomSong() {
    if (!this.musicPlaying) {
      const randomIndex = Math.floor(Math.random() * this.songs.length);
      const randomSong = this.songs[randomIndex];
      this.musicPlaying = true;
      this.music.src = randomSong;

      this.music.addEventListener('canplaythrough', () => {
        this.music.play();
      });
      this.music.addEventListener('ended', () => {
        this.musicPlaying = false;
        this.playRandomSong();
      });

      this.music.load();
    }
  }
  setMusicVolume(volume: number) {
    this.musicVolume = volume;
    this.music.volume = this.musicVolume; // Set the volume of your music player
  }
}
