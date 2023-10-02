import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'mercury';

  private backgrounds: string[] = [
    'url(assets/bg/1.png)',
    'url(assets/bg/2.png)',
    'url(assets/bg/3.png)',
    'url(assets/bg/4.png)',
    'url(assets/bg/5.png)',
    'url(assets/bg/6.png)',
    'url(assets/bg/7.png)',
  ];

  ngOnInit() {
    this.setRandomBackground();
  }

  setRandomBackground() {
    const randomIndex = Math.floor(Math.random() * this.backgrounds.length);
    const randomBackground = this.backgrounds[randomIndex];
    document.body.style.backgroundImage = randomBackground;
  }
}
