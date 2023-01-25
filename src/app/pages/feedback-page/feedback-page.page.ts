import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.page.html',
  styleUrls: ['./feedback-page.page.scss'],
})
export class FeedbackPagePage implements OnInit {
  centered = false;

  radius: number;
  color: string;
  load = false;
  
  constructor() { }

  ngOnInit() {
    this.onLoader();
  }
  onLoader(){
    this.load = true;
    console.log('this.load1', this.load);
    setTimeout(()=>{
      this.load = false;
    }, 1000);

    console.log('this.load2', this.load);
    
  }

}
