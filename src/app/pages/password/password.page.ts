import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, MenuController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { AuthLoginService } from 'src/app/services/auth/auth.service';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {

  isLoading = false;
  userInfoLoading;
  hide = true;
  usernameshow = true;
  isLogin = true;
  userTypes;
  model: any = {}
  modalController: any;
  id_card_no: string;
  private formSubmitSubscribe: Subscription;
  private userNameValidSubscribe: Subscription;

  constructor(
    private authService: AuthLoginService,
    private router: Router,
    private loadingController: LoadingController,
    public menuCtrl: MenuController,
    private commonUtils: CommonUtils,
    private storage: Storage,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient) {
      this.authService.globalparamsData.subscribe(res => {
        console.log('auth res >>>>>>>>', res);
        if(res && res != null && res != undefined && res != ''){
          if(res.token != undefined ){
               this.router.navigateByUrl('/dashboard');
          }
        }
      });
     }

  ngOnInit() {
    this.authService.globalparamsData.subscribe(res => {
      console.log('auth res >>>>>>>>', res);
      if(res && res != null && res != undefined && res != ''){
        if(res.token != undefined ){
            this.router.navigateByUrl('/dashboard');
        }
      }
    });


    this.id_card_no = this.activatedRoute.snapshot.paramMap.get('id');
    let fd = new FormData();
    fd.append('id_card_no', this.id_card_no);
    this.userNameValidSubscribe = this.http.post('usernamevalid', fd).subscribe(
      (response: any) => {
        console.log(response);
        
        if (response.return_status === 1) {
          this.usernameshow = false;
        }
        // else
        // {
        //   this.commonUtils.presentToast('error', response.return_message);

        // }

      },
    );
  }
   ionViewWillEnter() {
    this.authService.globalparamsData.subscribe(res => {
      console.log('auth res >>>>>>>>', res);
      if(res && res != null && res != undefined && res != ''){
        if(res.token != undefined ){
            this.router.navigateByUrl('/dashboard');
        }
      }
    });
  }
  async onSubmitForm(form: NgForm) {
    console.log('form >>', form.value);

    if (!form.valid) {
      this.commonUtils.presentToast('error', 'This field is required');
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let fd = new FormData();

    for (let val in form.value) {
      if (form.value[val] == undefined) {
        form.value[val] = '';
      }
      fd.append(val, form.value[val]);
    };
    fd.append('id_card_no', this.id_card_no);
    let deviceTokeData = localStorage.getItem('deviceToken')
    console.log('deviceToke.................', deviceTokeData);

    fd.append('device_token', deviceTokeData);
    this.authenticate(form, fd);
  }

  // authenticate function
  authenticate(_form, form_data) {
    this.isLoading = true;
    this.loadingController
      .create({ keyboardClose: true, message: 'Logging in...' })
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<any>;
        authObs = this.authService.login('login', form_data, '')

        this.formSubmitSubscribe = authObs.subscribe(
          resData => {
            console.log('resData ============= (sign in) ))))))))))))))>', resData);
            if (resData.return_status == 1) {
                this.router.navigateByUrl('/dashboard');
              this.commonUtils.presentToast('success', resData.return_message);

              this.isLoading = false;
              loadingEl.dismiss();
            }
            else
            {
              this.commonUtils.presentToast('error', resData.return_message);

            }
            this.isLoading = false;
            loadingEl.dismiss();

          },
          errRes => {
            loadingEl.dismiss();
          }
        );
      });
  }
  //**********************************User Name Check***************************************//
  onSubmitUser(form: NgForm) {
    console.log('form login >>', form.value);
    if (!form.valid) {
      this.commonUtils.presentToast('error', 'This field is required');
      return;
    }
    let fd = new FormData();
    fd.append('username', form.value.username);
    fd.append('id_card_no', this.id_card_no);

    this.formSubmitSubscribe = this.http.post('usernamecheck', fd).subscribe(
      (response: any) => {
        console.log("add form @@response >", response);
        if (response.return_status == 1) {
          form.reset();
          this.usernameshow = false;

          // this.router.navigateByUrl('/login-success/' + this.id_card_no);
          // this.commonUtils.presentToast('success', response.return_message);
        }
        else {
          this.commonUtils.presentToast('error', response.return_message);
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
    if (this.userNameValidSubscribe !== undefined) {
      this.userNameValidSubscribe.unsubscribe();
    }
  }
}
