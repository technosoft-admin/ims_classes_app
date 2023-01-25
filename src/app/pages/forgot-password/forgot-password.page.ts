import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  formSubmitSubscribe: any;
  model: any = {}
  id_card_no: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private commonUtils: CommonUtils,
    private http: HttpClient) { }


  ngOnInit() {

  }

  onSubmitForm(form: NgForm) {
    console.log('form login >>', form.value);
    this.id_card_no = form.value.id_card_no
    if (!form.valid) {
      this.commonUtils.presentToast('error', 'This field is required');
      return;
    }
    let fd = new FormData();
    fd.append('id_card_no', this.id_card_no);

    this.formSubmitSubscribe = this.http.post('idcardcheck', fd).subscribe(
      (response: any) => {
        console.log("add form @@response >", response);
        if (response.return_status == 0) {
          //*********************************ID CARD NOT MATCH*****************************//
          this.commonUtils.presentToast('error', response.return_message);
        }
        else {
          form.reset();
          this.router.navigateByUrl('/otp-counter/forgot-password/' + this.id_card_no);
        }

      },
      errRes => {
        // console.log(errRes);

      }
    );


  }
}
