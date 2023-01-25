import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fees-payment',
  templateUrl: './fees-payment.page.html',
  styleUrls: ['./fees-payment.page.scss'],
})
export class FeesPaymentPage implements OnInit {
  tab : any;
  pay_col1 : any;
  pay_col2 : any;
  pay_col3 : any;
  pay_col4 : any;
  
  centered = false;

  radius: number;
  color: string;

  constructor() { }

  ngOnInit() {
  }

  onClick(check){
      //  console.log(check);
        if(check==1){
          this.tab = 'pay_col1';

        }else if(check==2){
          this.tab = 'pay_col2';
        }else if(check==3){
          this.tab = 'pay_col3';
        }else{
          this.tab = 'pay_col4';
        }   
      
    }

}
