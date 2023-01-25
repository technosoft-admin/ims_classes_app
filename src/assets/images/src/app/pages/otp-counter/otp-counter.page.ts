import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-otp-counter',
  templateUrl: './otp-counter.page.html',
  styleUrls: ['./otp-counter.page.scss'],
})
export class OtpCounterPage implements OnInit {
  timeLeft: number = 60;
  interval: any;

  constructor() { }
  
  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

}


