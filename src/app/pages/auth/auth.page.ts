import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController, ToastController, MenuController, NavController } from '@ionic/angular';

import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable, from, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthLoginService } from '../../services/auth/auth.service';
import { AppComponent } from '../../app.component';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';
import { environment } from 'src/environments/environment';

declare var FB: any;
@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})


export class AuthPage implements OnInit {
  // variablesstart
  private formSubmitSubscribe: Subscription;
  main_url = environment.apiUrl;
  file_url = environment.fileUrl;
  isLoading = false;
  hide = true;
  isLogin = true;
  model: any = {}

  constructor(
    private router: Router,
    public menuCtrl: MenuController,
    private commonUtils: CommonUtils,
    private http: HttpClient,
    private authService: AuthLoginService,

  ) { }

  ngOnInit() {
    this.formSubmitSubscribe = this.authService.globalparamsData.subscribe(res => {
      console.log('authService', res);

      if (res && res != null && res != undefined && res != '') {
        if (res.token != undefined) {
          this.router.navigateByUrl('/dashboard');
        }
      }
    });
  }

  ionViewWillEnter() {
    this.formSubmitSubscribe = this.authService.globalparamsData.subscribe(res => {
      console.log('authService', res);

      if (res && res != null && res != undefined && res != '') {
        if (res.token != undefined) {
          this.router.navigateByUrl('/dashboard');
        }
      }
    });
  }
  //---------------- Id Card Check form submit start-----------------
  onSubmitForm(form: NgForm) {
    this.isLoading = true;
    console.log('form login >>', form.valid);
    let fd = new FormData();
    fd.append('id_card_no', form.value.id_card_no);
    let id_card_no = form.value.id_card_no;
    if (!form.valid) {
      this.commonUtils.presentToast('error', 'This field is required');
      return;
    }
    //*************************ID CARD CHECK***************************//
    this.formSubmitSubscribe = this.http.post('idcardcheck', fd).subscribe(
      (response: any) => {
        console.log("add form @@response >", response);

        switch (response.return_status) {
          case 1:
            //**************************Old Student **************************//
            form.reset();
            this.router.navigateByUrl('/password/' + id_card_no);
            break;
          case 2:
            //**************************New Student **************************//
            form.reset();

            this.router.navigateByUrl('/otp-counter/auth/' + id_card_no);

            break;
          case 3:
            //**************************New Student **************************//
            form.reset();
            this.router.navigateByUrl('/otp-counter/auth/' + id_card_no);

            break;
          default:
            //**************************Student Invalid **************************//
            this.commonUtils.presentToast('error', response.return_message);
            break;
        }

      },
      errRes => {

      }
    );
  }
  ngOnDestory() {
    if (this.formSubmitSubscribe !== undefined) {
      this.formSubmitSubscribe.unsubscribe();
    }
  }


}