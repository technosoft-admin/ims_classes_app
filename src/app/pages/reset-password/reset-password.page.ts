import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  private formSubmitSubscribe: Subscription;
  model: any = {}
  id_card_no: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private commonUtils: CommonUtils,
    private http: HttpClient,) { }

  ngOnInit() {
    this.id_card_no = this.activatedRoute.snapshot.paramMap.get('id');

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
            this.router.navigateByUrl('/password-confirmation/' + this.id_card_no);
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
      this.commonUtils.presentToast('error', 'Password Not Match');
    }

  }
  ngOnDestory() {
    if (this.formSubmitSubscribe !== undefined) {
      this.formSubmitSubscribe.unsubscribe();
    }
  }
}
