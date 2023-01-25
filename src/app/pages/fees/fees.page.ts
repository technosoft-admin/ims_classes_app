import { Component, OnInit, VERSION, ViewChild } from '@angular/core';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.page.html',
  styleUrls: ['./fees.page.scss'],
})
export class FeesPage implements OnInit {

  load = false;
  centered = false;
  @ViewChild("slides") slides!: any;
  radius: number;
  color: string;

  constructor() { }

  ngOnInit() {
    this.onLoader();
  }
  
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    autoplay:true
  };
  onLoader(){
    this.load = true;
    console.log('this.load1', this.load);
    setTimeout(()=>{
      this.load = false;
    }, 1000);

    console.log('this.load2', this.load);
    
  }
  slidesDidLoad(slider){

  }

}
