import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.page.html',
  styleUrls: ['./create-password.page.scss'],
})
export class CreatePasswordPage implements OnInit {
  private formSubmitSubscribe: Subscription;
  private idCardNoSubscribe: Subscription;
  usernameshow = true;
  model: any = {}
  id_card_no: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private commonUtils: CommonUtils,
    private http: HttpClient,) { }

  ngOnInit() {
    this.id_card_no = this.activatedRoute.snapshot.paramMap.get('id');
    let fd = new FormData();
    fd.append('id_card_no', this.id_card_no);
    this.idCardNoSubscribe = this.http.post('idcardcheck', fd).subscribe(
      (response: any) => {
        if (response.return_status != 3) {
          this.usernameshow = false;
        }

      },
      errRes => {

      }
    );
  }
  //**********************************Password Submit*****************************//
  onSubmitForm(form: NgForm) {
    console.log('form login >>', form.value);
    if (!form.valid) {
      this.commonUtils.presentToast('error', 'This field is required');
      return;
    }
    //******* Password Check********//
    if (form.value.password == form.value.repassword) {
      let fd = new FormData();
      fd.append('password', form.value.password);
      fd.append('id_card_no', this.id_card_no);

      this.formSubmitSubscribe = this.http.post('passwordset', fd).subscribe(
        (response: any) => {
          console.log("add form @@response >", response);
          if (response.return_status == 1) {
            form.reset();
            this.router.navigateByUrl('/login-success/' + this.id_card_no);

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
    else {
      //********* password not match*********//
      this.commonUtils.presentToast('error', 'Password Not Match');
    }

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
    if (this.idCardNoSubscribe !== undefined) {
      this.idCardNoSubscribe.unsubscribe();
    }
  }
}
