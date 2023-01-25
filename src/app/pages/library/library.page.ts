import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {

  selectedDate: any;
  tab : any = 'dashboard_btn';
  dashboard_btn : any;
  gallery_btn : any;
  account_btn : any;
  Clicked : boolean;
  click_modal : boolean = false;
  
  constructor(private AlertCtrl: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.tab='dashboard_btn';
  }

  onSelect(event){
    console.log(event);
    this.selectedDate = event;
    console.log("date>>", this.selectedDate);
    this.click_modal=true;
    // this.presentAlert();
  }
  clickedOut() {
    this.click_modal = false;
    console.log('this.click_modal', this.click_modal);
    
  }
  
  onClick(check){
    //    console.log(check);
        if(check==1){
          this.tab = 'dashboard_btn';
        }else if(check==2){
          this.tab = 'gallery_btn';
        }else{
          this.tab = 'account_btn';
        }    
      
    }

  //  onSwitch(check){
 
  //    switch (check) {
  //     case 1:
  //       return 'dashboard_btn';
  //     case 2:
  //       return 'gallery_btn';
  //     case 3:
  //       return 'account_btn';
  //   }
  // }

}
