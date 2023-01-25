import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {
 
  selectedDate: any;

  constructor( private AlertCtrl: AlertController) { }


  ngOnInit() {
    
  }
  
  onSelect(event){
    console.log(event);
    this.selectedDate = event;
    console.log("date>>", this.selectedDate);
    this.presentAlert();
  }
  async presentAlert() {
    const alert = await this.AlertCtrl.create({
      message:'hello',
      buttons: [
        'OK'
      ]
    })
    await alert.present()
  }

}
