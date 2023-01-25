import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthLoginService } from 'src/app/services/auth/auth.service';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  viewPageDataSubscribe: any;
  private formSubmitSubscribe: Subscription;
  profile_data: any;
  main_url = environment.apiUrl;
  file_url = environment.fileUrl;
  user_type: any;
  dob: void;

  constructor(private commonUtils: CommonUtils, private authService: AuthLoginService, private http: HttpClient) { }

  ngOnInit() {
    this.getProfile();
  }
  ionViewWillEnter() {

    let get_global_params = this.authService.getTokenSessionMaster();
    console.log('user', get_global_params);
    this.user_type = get_global_params.user.user_type;
    this.getProfile();

  }
  onInput($event: any) {
    let theEvent = $event || window.event,
      key = theEvent.target.value,
      regex = /[0-9]+/g
    if (!regex.test(key)) {
      let resp = $event.target.value.match(regex)
      $event.target.value = resp ? resp.join('') : ''
    }
  }
  getProfile() {
    this.formSubmitSubscribe = this.http.get('getprofile').subscribe(
      (response: any) => {
        console.log(response);

        if (response.return_status == 1) {
          this.profile_data = response.return_data;
          console.log(this.profile_data);
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
