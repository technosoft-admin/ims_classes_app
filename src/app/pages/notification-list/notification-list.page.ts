import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';
import { Location } from "@angular/common";
@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.page.html',
  styleUrls: ['./notification-list.page.scss'],
})
export class NotificationListPage implements OnInit {
  notificationUrl: string;
  private formSubmitSubscribe: Subscription;
  notificationData: any;
  notifiId: string;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private commonUtils: CommonUtils,
    private http: HttpClient,private location: Location) { }

  ngOnInit() {
    this.notifiId = this.activatedRoute.snapshot.paramMap.get('id');

    this.notificationUrl = 'notification/' + this.notifiId;
    this.notification();
  }
  notification() {
    this.formSubmitSubscribe = this.http.get(this.notificationUrl).subscribe(
      (response: any) => {
        console.log(response);

        if (response.return_status == 1) {
          this.notificationData = response.return_data;
          console.log('notification.........', this.notificationData);
        }

      },
      errRes => {

      }
    );
  }
  myBackButton(){
    this.location.back();
  }
  ngOnDestory() {
    if (this.formSubmitSubscribe !== undefined) {
      this.formSubmitSubscribe.unsubscribe();
    }
  }
}
