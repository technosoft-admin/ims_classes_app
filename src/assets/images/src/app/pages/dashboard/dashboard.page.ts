import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
 
  constructor() { }
  
  ngOnInit() {
  }
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    // this.pet = "home";
  }
  
}
