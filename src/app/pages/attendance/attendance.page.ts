import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {

  selectedDate: any;
  tab: any = 'dashboard_btn';
  dashboard_btn: any;
  gallery_btn: any;
  account_btn: any;
  Clicked: boolean;
  click_modal: boolean = false;
  load = false;
  in_out_time: any;
  inout_url: string;
  categoryList: any;
  categoryListUrl;
  date: string;
  notificaton_id_url: string;
  datesToHighlight: any;
  all_date_url: string;
  dataArray: any;
  renderer: any;
  calendar: any;
  dashboard_date: string;
  constructor(private AlertCtrl: AlertController, private http: HttpClient, private commonUtils: CommonUtils, private router: Router) { }
  private dateSubscribe: Subscription;
  private notificationSubscribe: Subscription;
  private allDateSubscribe: Subscription;

  @Input() set incomingDate(d: Date) {
    this.selectedDate = d;
    console.log('date',d);
     // sets the incoming date on mat-calendar
    // this.dateClass(d); // highlights the next 5 days in the mat-calendar
    this.calendar.updateTodaysDate(); // re-renders calendar to see changes
}
  ngOnInit() {
    console.log('ngOnInit');
    console.log(this.selectedDate);
    // this.getAllDate('04');

    this.onLoader();
  }
  onLoader() {
    this.load = true;
    console.log('this.load1', this.load);
    setTimeout(() => {
      this.load = false;
    }, 1000);

    console.log('this.load2', this.load);
    this.dashboard_date = new DatePipe('en-US').transform(new Date().toISOString(), 'MMM YYYY');

    this.getAllDate(new DatePipe('en-US').transform(new Date().toISOString(), 'YYYY-MM-dd'));

  }

  ionViewWillEnter() {
    this.tab = 'dashboard_btn';
    console.log('ionViewWillEnter');
    this.onLoader();
    const monthNextBtn = document.querySelectorAll('.mat-calendar-next-button');
    console.log(monthNextBtn);
    if (monthNextBtn) {
      Array.from(monthNextBtn).forEach((button) => {
        this.renderer.listen(button, 'click', (event) => {
          //handle month change
          console.log('click');
          
        });
      });
    }

  }
  getAllDate(date) {
    this.all_date_url = 'getmonth/' + date
    this.allDateSubscribe = this.http.get(this.all_date_url).subscribe(
      (res: any) => {
        if (res.return_status == 1) {
          console.log(res.return_data);
          this.dataArray = res.return_data.date;
          //  this.router.navigateByUrl('/notification-list/' +res.return_data.app_notification.id)
        }
      },
      errRes => {
        console.log('DASHBOARD CHART COLOR => ', errRes);
      }
    );
  }
  onPrevious(_data){
    console.log("Previous Data<><><><><><><<><><><><>",_data);
    
  }

  notificatonId(id) {
    this.notificaton_id_url = 'getAttendanceid/' + id
    this.notificationSubscribe = this.http.get(this.notificaton_id_url).subscribe(
      (res: any) => {
        if (res.return_status == 1) {
          console.log(res.return_data.app_notification.id);

          this.router.navigateByUrl('/notification-list/' + res.return_data.app_notification.id)
        }
      },
      errRes => {
        console.log('DASHBOARD CHART COLOR => ', errRes);
      }
    );
  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      if(new DatePipe('en-US').transform(date, 'YYYY-MM-dd') === new DatePipe('en-US').transform(new Date().toISOString(), 'YYYY-MM-dd'))
      {
        return 'special-data-today';
      }
      for (let i = 0; i < this.dataArray.length; i++) {
        if (new DatePipe('en-US').transform(date, 'YYYY-MM-dd') === this.dataArray[i].date) {
          switch (this.dataArray[i].status) {
            case 'P/L':
              return 'special-date-present';
            case 'P':
              return 'special-date-present';
            case 'A':
              return 'special-date-absent';
            case 'M':
              return 'special-date-manual';
            case 'L':
              return 'special-date-leave';
            case 'H':
              return 'special-date-holiday';
          }

          // return 'special-date';
        }


      }
      return '';
    };
  }
  onSelect(event) {
    console.log();

    console.log(event);
    this.date = new DatePipe('en-US').transform(event, 'YYYY-MM-dd');
    this.selectedDate = event;
    console.log("select Date.......", this.selectedDate);

    console.log("date>>", this.date);
    this.inout_url = 'attendance?date=' + this.date + '&page=2'
    this.dateSubscribe = this.http.get(this.inout_url).subscribe(
      (res: any) => {
        if (res.return_status == 1) {
          this.in_out_time = res.return_data.attendance.rows
        }
      },
      errRes => {
        console.log('DASHBOARD CHART COLOR => ', errRes);
      }
    );
    this.click_modal = true;
    // this.presentAlert();
  }

  clickedOut() {
    this.click_modal = false;
    console.log('this.click_modal', this.click_modal);

  }
  onClick(check) {
    //    console.log(check);
    if (check == 1) {
      this.tab = 'dashboard_btn';
    } else if (check == 2) {
      this.tab = 'gallery_btn';
    } else {
      this.tab = 'account_btn';
    }

  }

  ngOnDestroy() {
    if (this.dateSubscribe !== undefined) {
      this.dateSubscribe.unsubscribe();
    }
    if (this.allDateSubscribe !== undefined) {
      this.allDateSubscribe.unsubscribe();
    }
    if (this.notificationSubscribe !== undefined) {
      this.notificationSubscribe.unsubscribe();
    }
  }

}
