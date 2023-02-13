import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarComponentOptions, CalendarModalOptions } from 'ion2-calendar-week';
import { Subscription } from 'rxjs';
import { AuthLoginService } from 'src/app/services/auth/auth.service';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  main_url = environment.apiUrl;
  file_url = environment.fileUrl;
  tab: any;
  dashboard_btn: any;
  gallery_btn: any;
  account_btn: any;
  Clicked: boolean;
  centered = false;
  radius: number;
  color: string;
  getData;
  dateRange: { from: 1990; to: 2050; };
  type: 'moment'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'

  optionsRange: CalendarModalOptions = {
    // pickMode: 'range'
    weekdays: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    weeks: 1,
    displayMode: 'week',
    continuous: true,
    from: new Date("2000-01-01"),
    canBackwardsSelected: true,
    defaultScrollTo: new Date("2000-01-01")

    // weekStart:1

  };
  listing_view_url: string;
  image_name: any;
  user_data: any;
  notification_count: any;
  attendance_list: any;
  attendance_listing_view_url: string;
  user_type: any;
  dashboard_data:any
  app_type: any;
  libinoutlist: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthLoginService,
    private commonUtils: CommonUtils,
  ) { }

  private dashboardDataSubscribe: Subscription;
  private dashboardAttendanceSubscribe: Subscription;
  private libraryinoutSubscribe: Subscription;

  ionViewWillEnter() {
    this.tab = 'dashboard_btn';
    let get_global_params = this.authService.getTokenSessionMaster();
    console.log('user', get_global_params);
    // let date=new Date()
    this.user_type=get_global_params.user.user_type;
    this.app_type=get_global_params.user.type;
    var date = new DatePipe('en-US').transform(new Date().toISOString(), 'YYYY-MM-dd');

    this.getprofile(date);
    this.getLibraryINOUT(date)
  }
  

  
  changeWeek(event) {
    let date =  event.format('YYYY-MM-DD');
    this.getLibraryINOUT(date)
    this.attendance_listing_view_url='attendance?date='+date+'&page=2'
    this.dashboardAttendanceSubscribe = this.http.get(this.attendance_listing_view_url,).subscribe(
      (res: any) => {
        if (res.return_status == 1) {
          this.attendance_list = res.return_data.attendance.rows
        }

      },
      errRes => {
        console.log('DASHBOARD CHART COLOR => ', errRes);
      }
    );
  }
 getLibraryINOUT(date)
 {
  this.libraryinoutSubscribe = this.http.get('/library/get?date='+date).subscribe(
    (res: any) => {
      console.log('tetsnbbbsh...',res)
      if(res.return_status==1)
      {
        this.libinoutlist=res.return_data.row
      }
    },

    errRes => {
      console.log('DASHBOARD CHART COLOR => ', errRes);
    }
  );
 }
  ngOnInit() {
    let get_global_params = this.authService.getTokenSessionMaster();
    console.log('dashboard', get_global_params);
    
    var date = new DatePipe('en-US').transform(new Date().toISOString(), 'YYYY-MM-dd');

    this.getprofile(date);
    this.getLibraryINOUT(date)
  }

  onClick(check) {
    //    console.log(check);
    if (check == 1) {
      this.tab = 'dashboard_btn';
      console.log('dashboard>>', this.tab);

    } else if (check == 2) {
      this.tab = 'gallery_btn';
      console.log('gallery>>', this.tab);
    } else {
      this.tab = 'account_btn';
      console.log('account>>', this.tab);
    }

  }

  gotoNotifican(){
    this.getData="Hello";
    console.log("getData.....",this.getData);
    this.router.navigateByUrl('/notification-save');
    
    
  }

  getprofile(date) {

    this.listing_view_url = 'dashboard?date='+date;
   
    this.dashboardDataSubscribe = this.http.get(this.listing_view_url).subscribe(
      (res: any) => {
        if (res.return_status == 1) {
          this.user_data = res.return_data.user_data
          this.dashboard_data=res.return_data
        console.log('dashboard_data',this.dashboard_data)
          this.image_name = res.return_data.user_data.photo_url        
          this.attendance_list = res.return_data.attendance
          if (res.return_data.notificationCount == 100) {
            this.notification_count = '99+';
          }
          else {
            this.notification_count = res.return_data.notificationCount;

          }
        }

      },
      errRes => {
        console.log('DASHBOARD CHART COLOR => ', errRes);
      }
    );
  }

  ngOnDestroy() {
    if (this.dashboardDataSubscribe !== undefined) {
      this.dashboardDataSubscribe.unsubscribe();
    }
    if (this.dashboardAttendanceSubscribe !== undefined) {
      this.dashboardAttendanceSubscribe.unsubscribe();
    }


  }
}
