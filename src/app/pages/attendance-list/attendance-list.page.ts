import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from "@angular/common";
import * as moment from 'moment';
@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.page.html',
  styleUrls: ['./attendance-list.page.scss'],
})
export class AttendanceListPage implements OnInit {
  attendance_listing_view_url: string;
  attendance_list: any;
  pageCount: any;
  date_url: string;
  dateList: any;
  dataLentch: any;
  notificaton_id_url: string;
  model: any = {}
  data: string;
  atcount: number;
  type: string;
  // pageCount:string;
  moment: any = moment;
  page: string;

  constructor(private http: HttpClient, private router: Router, private location: Location, private activatedRoute: ActivatedRoute,) { }
  private attendanceListSubscribe: Subscription;
  private libraryListSubscribe: Subscription;
  private attendanceDateSubscribe: Subscription;
  private notificationSubscribe: Subscription;

  ngOnInit(): void {
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    console.log("this.type.............", this.type)
    if (this.type === 'library') {
      this.page = 'Library'
    }
    else {
      this.page = 'Attendance'
    }
    this.onLoad();
    this.atcount = 1;
  }
  getTimeOfDay(time: string): string {
    let [hour, minute] = time.split(":").map((str) => parseInt(str));
    let period = time.slice(-2).toLowerCase();
    // console.log('time=',time,'period=',period,'period=',hour)
    if (hour === 12 && period === "am") {
      hour -= 12;
    } else if (hour < 12 && period === "pm") {
      hour += 12;
    }

    if (hour >= 5 && hour < 12) {
      return "MOR";
    } else if (hour >= 12 && hour < 17) {
      return "NOON";
    } else if (hour >= 17 && hour < 21) {
      return "EVE";
    } else {
      return "NGT";
    }
  }

  onClickDate(v) {
    //console.log(v, this.model.calDat);

  }
  myBackButton() {
    this.location.back();
  }
  onLoad() {
    this.data = new DatePipe('en-US').transform(new Date().toISOString(), 'MMMM YYYY')
    this.pageCount = 2;
    this.dataLentch = 1;
    if (this.type === 'library') {
      this.getLibraryINOUT(10)
      this.getLibraryDate(10)
    }
    else {
      this.getAttendance(10)
      this.getAttendanceDate(10);
    }
  }
  ionViewWillEnter() {
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    console.log("this.type.............", this.type)
    if (this.type === 'library') {
      this.page = 'Library'
    }
    else {
      this.page = 'Attendance'
    }
    this.onLoad();
    this.atcount=1;

  }
  getAttendanceDate(page) {
    this.date_url = 'attendance/date?page=' + page
    this.attendanceDateSubscribe = this.http.get(this.date_url).subscribe(
      (res: any) => {

        this.dateList = res.return_data.date;
        //console.log('getAttendanceDate', this.dateList);
        // this.getAttendance()

      },
      err => {
        //console.log('getAttendanceDate', 'errror', err)
      }


    );

  }
  getAttendance(page) {
    // let date =  event.format('YYYY-MM-DD');
    console.log(page);

    this.attendance_listing_view_url = 'attendance?page=' + page + `&date=`
    this.attendanceListSubscribe = this.http.get(this.attendance_listing_view_url,).subscribe(
      (res: any) => {
        if (res.return_status === 1) {
          this.attendance_list = res.return_data.attendance.rows
          // console.log(res.return_data.count, this.dataLentch,this.atcount);
          this.attendance_list.forEach(element => {
            // console.log(element.in_time,element.out_time)
            let in_time = moment(element.in_time, 'hh:mm A');
            let out_time = moment(element.out_time, 'hh:mm A');
            element.in_day = this.getTimeOfDay(moment(element.in_time, 'hh:mm A').format('hh:mm A').toString());
            if (element.out_time == "") {
              element.hour = ""
              element.out_day = ""
            }
            else {
              element.hour=moment.utc(moment.duration({hours: moment.duration(out_time.diff(moment(in_time, "HH:MM"))).hours(), minutes: moment.duration(out_time.diff(moment(in_time, 'HH:MM'))).minutes()}).asMilliseconds()).format("HH:mm")+' Hr';
              element.out_day = this.getTimeOfDay(moment(element.out_time, 'hh:mm A').format('hh:mm A'));
            element.out_time=moment(element.out_time, 'hh:mm A').format("hh:mm");

            }
            element.in_time=moment(element.in_time, 'hh:mm A').format("hh:mm");
          });
          // if (res.return_data.attendance.count === this.dataLentch) {
          if (res.return_data.count === this.dataLentch) {

            this.dataLentch = 0;

          }
          else {
            this.dataLentch = res.return_data.attendance.count;
          }
        }

      },
      errRes => {
        //console.log('DASHBOARD CHART COLOR => ', errRes);
      }
    );
  }

  getLibraryINOUT(page) {
    // let date =  event.format('YYYY-MM-DD');
    console.log(page);

    let lib_url = '/library/get?page=' + page + `&date=`
    this.libraryListSubscribe = this.http.get(lib_url).subscribe(
      (res: any) => {
        if (res.return_status === 1) {

          this.attendance_list = res.return_data.rows
          this.attendance_list.forEach(element => {

            let in_time = moment(element.in_time, 'hh:mm A');
            let out_time = moment(element.out_time, 'hh:mm A');

            if (element.out_time == "") {
              element.hour = ""
            }
            else {
              element.hour=moment.utc(moment.duration({hours: moment.duration(out_time.diff(moment(in_time, "HH:MM"))).hours(), minutes: moment.duration(out_time.diff(moment(in_time, 'HH:MM'))).minutes()}).asMilliseconds()).format("HH:mm")+' Hr';

              element.out_day = this.getTimeOfDay(moment(element.in_time, 'hh:mm A').format('hh:mm A').toString());
              element.out_time=moment(element.out_time, 'hh:mm A').format("hh:mm");

            }
            element.in_day = this.getTimeOfDay(moment(element.in_time, 'hh:mm A').format('hh:mm A').toString());
            element.in_time=moment(element.in_time, 'hh:mm A').format("hh:mm");

          });

          // if (res.return_data.attendance.count === this.dataLentch) {
          if (res.return_data.count === this.dataLentch) {

            this.dataLentch = 0;

          }
          else {
            this.dataLentch = res.return_data.count;
          }
        }

      },
      errRes => {
        //console.log('DASHBOARD CHART COLOR => ', errRes);
      }
    );
  }

  getLibraryDate(page) {
    let libdata = '/library/date?page=' + page
    this.attendanceDateSubscribe = this.http.get(libdata).subscribe(
      (res: any) => {

        this.dateList = res.return_data.date;
        //console.log('getAttendanceDate', this.dateList);
        // this.getAttendance()

      },
      err => {
        //console.log('getAttendanceDate', 'errror', err)
      }


    );

  }

  loadMoreData(event) {
    console.log('call start', this.dataLentch);
    // this.getAttendanceDate(this.pageCount * 10)
    // this.getAttendance(this.pageCount * 10)
    if (this.type === 'library') {
      this.getLibraryINOUT(this.pageCount * 10)
      this.getLibraryDate(this.pageCount * 10)
    }
    else {
      this.getAttendance(this.pageCount * 10)
      this.getAttendanceDate(this.pageCount * 10);
    }
    if (this.dataLentch === 0) {
      event.target.disabled = true;

    }
    this.pageCount++;
    setTimeout(() => {
      //console.log('Done');
      event.target.complete();

    }, 500);
    // event.target.complete();


  }
  notificatonId(id) {
    //console.log('shbhdbs');
    this.notificaton_id_url = 'getAttendanceid/' + this.type + "/" + id
    this.notificationSubscribe = this.http.get(this.notificaton_id_url).subscribe(
      (res: any) => {
        if (res.return_status == 1) {
          //console.log(res.return_data.app_notification.id);

          this.router.navigateByUrl('/notification-list/' + res.return_data.app_notification.id)
        }
      },
      errRes => {
        //console.log('DASHBOARD CHART COLOR => ', errRes);
      }
    );
  }


  ngOnDestory() {
    if (this.attendanceListSubscribe !== undefined) {
      this.attendanceListSubscribe.unsubscribe();
    }
    if (this.libraryListSubscribe !== undefined) {
      this.libraryListSubscribe.unsubscribe();
    }
    if (this.attendanceDateSubscribe !== undefined) {
      this.attendanceDateSubscribe.unsubscribe();
    }
    if (this.notificationSubscribe !== undefined) {
      this.notificationSubscribe.unsubscribe();
    }
  }
}
