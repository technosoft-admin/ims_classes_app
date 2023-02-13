import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';
import { environment } from 'src/environments/environment';
import { SmsRetriever } from '@awesome-cordova-plugins/sms-retriever/ngx';

@Component({
  selector: 'app-otp-counter',
  templateUrl: './otp-counter.page.html',
  styleUrls: ['./otp-counter.page.scss'],
})
export class OtpCounterPage implements OnInit {
  timeLeft: number = 59;
  minitLeft: number = 4;
  interval: any;
  parms_action_name;
  id_card_no: string;
  isLoading: boolean;
  main_url = environment.apiUrl;
  file_url = environment.fileUrl;
  hide = true;
  isLogin = true;
  model: any = {}
  check: string | Blob;
  number: any;
  firstnumber: any;
  lastnumber: any;
  private formSubmitSubscribe: Subscription;
  private oTPSendSubscribe: Subscription;
  secondLeft: any;
  hash: any;
  type: string;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private commonUtils: CommonUtils,
    private http: HttpClient,
    private smsRetriever: SmsRetriever
  ) { }

  ngOnInit() {

// One way for exactly 6 digits;

var s = "Hello, your work pin number is 931234. Again, the number is 931234."
    //**************************GET DATA ACTION & ID CARD NO ***********************************//
    this.startTimer();
    this.genHash();
    this.parms_action_name = this.activatedRoute.snapshot.paramMap.get('action');
    let nextpage = this.parms_action_name == 'auth' ? '/create-password/' : '/reset-password/'
    this.type='FORGET-OTP';
    if(nextpage==='/create-password/')
    {
      this.type='OTP';
    }
    this.id_card_no = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('parms_action_name', this.id_card_no);
   this.retriveSMS();
  }
  otpSend()
  {
    //**************************OTP SEND ***********************************//
    let fd = new FormData();
    fd.append('id_card_no', this.id_card_no);
    fd.append('hash',this.hash);
    fd.append('type',this.type);
    this.oTPSendSubscribe = this.http.post('otpsend', fd).subscribe(
      (response: any) => {
        console.log("add form @@response >", response);
        if (response.return_status == 1) {
          this.check = response.return_otphash
          let firstnumber = response.return_phone_number.toString();
          let lastnumber = response.return_phone_number.toString();
          this.firstnumber = firstnumber.substring(0, 2);
          this.lastnumber = lastnumber.substring(7, 10);
        }
      },
      errRes => {

      }
    );
  }

  otpCount(data)
  {
    if(data.target.value.length==6)
    {
      let fd = new FormData();
      fd.append('id_card_no', this.id_card_no);
      fd.append('otp', data.target.value);
      fd.append('check', this.check);
      this.submitOtp(fd)
    console.log(data.target.value.length);
    }
  }
/////////////Sms Hash////////////////
  genHash() {
    // This function is to get hash string of APP.
    // * @return {Promise<string>} Returns a promise that resolves when successfully generate hash of APP.
    this.smsRetriever.getAppHash()
      .then((res: any) => {
        console.log(res);
      
        this.hash = res;
       this.otpSend();

      })
      .catch((error: any) => console.error(error));
  }

/////////////SMS Retrive////////////////

  retriveSMS() {
    console.log('Watching SMS');
    this.smsRetriever.startWatching()
      .then((res: any) => {
        const otp = res.Message.toString().match(/(^|[^\d])(\d{6})([^\d]|$)/);
        this.model={
          otp:otp[2]
        }
        let fd = new FormData();
        fd.append('id_card_no', this.id_card_no);
        fd.append('otp', otp[2]);
        fd.append('check', this.check);
    
        this.submitOtp(fd);
      })
      .catch((error: any) => console.error(error));
  }

  onSubmitForm(form: NgForm) {
    this.isLoading = true;
    console.log('form login >>', form.value);
    let fd = new FormData();
    fd.append('id_card_no', this.id_card_no);
    fd.append('otp', form.value.otp);
    fd.append('check', this.check);
    if (!form.valid) {
      this.commonUtils.presentToast('error', 'This field is required');
      return;
    }
    this.submitOtp(fd);
    form.reset();
  }
  submitOtp(fd)
  {
    let nextpage = this.parms_action_name == 'auth' ? '/create-password/' : '/reset-password/'
    //*****************************otp Check *********************//
    this.formSubmitSubscribe = this.http.post('otpcheck', fd).subscribe(
      (response: any) => {
        console.log("add form @@response >", response);
        if (response.return_status == 1) {
         
          this.router.navigateByUrl(nextpage + this.id_card_no);
        }
        else {
          this.commonUtils.presentToast('error', response.return_message);
        }


      },
      errRes => {

      }
    );
  }
  startTimer() {
    this.interval = setInterval(() => {
      if(this.minitLeft>=0)
      {
     
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        if(this.minitLeft!=0)
        {
        this.minitLeft--;
        this.timeLeft=59
        }
  
      }

      this.secondLeft=this.timeLeft.toString();
      if(this.secondLeft.length==1)
      {
        this.secondLeft='0'+this.secondLeft;
      }
      
    }
    if(this.timeLeft == 0 )
    {
      // if(this.secondLeft == 0)
    }
    }, 1000)
    
  }
  resendOTP()
  {
    this.genHash();
   this.timeLeft = 59;
    this.minitLeft = 4;
  }
  pauseTimer() {
    clearInterval(this.interval);
  }
  ngOnDestory() {
    if (this.formSubmitSubscribe !== undefined) {
      this.formSubmitSubscribe.unsubscribe();
    }

    if (this.oTPSendSubscribe !== undefined) {
      this.oTPSendSubscribe.unsubscribe();
    }
  }
}


