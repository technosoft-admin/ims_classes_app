import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';
import { Location } from "@angular/common";
import * as moment from 'moment';
import { element } from 'protractor';

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
  dataArray: any = [];
  renderer: any;
  calendar: any;
  dashboard_date: string;
  type: string;
  page: string;
  persentCountPL: number = 0;
  absentCount: number = 0;
  manualCount: number = 0;
  leaveCount: number = 0;
  holidayCount: number = 0;
  persentCountP: number = 0;
  caload: boolean;
  dayCount: any;
  attendanceTotal:any;
  totalDay: any;
  totalDays: any;
  totalAttendance: any;
  monthAttendance: string;
  showMonth: any;
  showMonthText: string;
  showMonthAttendanceText: string;
  totalAverageText: string;
  totalAverageAttendanceText: string;
  totalAttendanceAverage: any;
  check:boolean=true;
  constructor(private AlertCtrl: AlertController, private activatedRoute: ActivatedRoute, private http: HttpClient, private commonUtils: CommonUtils, private router: Router, private location: Location) {

    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    if (this.type === 'library') {
      this.page = 'Library'
    }
    else {
      this.page = 'Attendance'
    }

    this.onLoader();

  }
  private dateSubscribe: Subscription;
  private notificationSubscribe: Subscription;
  private allDateSubscribe: Subscription;

  @Input() set incomingDate(d: Date) {
    this.selectedDate = d;
    //console.log('date', d);
    // sets the incoming date on mat-calendar
    // this.dateClass(d); // highlights the next 5 days in the mat-calendar
    this.calendar.updateTodaysDate(); // re-renders calendar to see changes
  }

  ngOnInit() {

    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    if (this.type === 'library') {
      this.page = 'Library'
      this.showMonthText="Attend Days";
      this.showMonthAttendanceText="Months Days";
      this.totalAverageText="Attend Days"
      this.totalAverageAttendanceText="Total Days"
    }
    else {
      this.page = 'Attendance'
      this.showMonthText="Month Present Days";
      this.showMonthAttendanceText="Attendance";
      this.totalAverageText="Average Days"
      this.totalAverageAttendanceText="Average Attendance"
    }
    //console.log('ngOnInit');
    //console.log(this.selectedDate);

    // this.onLoader();
  }

  onLoader() {

    this.load = true;
    //console.log('this.load1', this.load);



    //console.log('this.load2', this.load);
    this.dashboard_date = new DatePipe('en-US').transform(new Date().toISOString(), 'MMM YYYY');
    this.dayCount = moment(new Date()).daysInMonth()

    if (this.type === 'library') {
      this.getAllDateLibrary(new DatePipe('en-US').transform(new Date().toISOString(), 'YYYY-MM-dd'));
      this.getLibraryAll(new DatePipe('en-US').transform(new Date().toISOString(), 'YYYY-MM-dd'))
    }
    else {
      this.getAllDate(new DatePipe('en-US').transform(new Date().toISOString(), 'YYYY-MM-dd'));
     this.getAttendanceAll(new DatePipe('en-US').transform(new Date().toISOString(), 'YYYY-MM-dd'))
    }

  }

  getTimeOfDay(time: string): string {
    let [hour, minute] = time.split(":").map((str) => parseInt(str));
    let period = time.slice(-2).toLowerCase();
    // //console.log('time=',time,'period=',period,'period=',hour)
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

  ionViewWillEnter() {
    this.tab = 'dashboard_btn';
    //console.log('ionViewWillEnter');
    this.onLoader();
    // const monthNextBtn = document.querySelectorAll('.mat-calendar-next-button');
    // //console.log(monthNextBtn);
    // if (monthNextBtn) {
    //   Array.from(monthNextBtn).forEach((button) => {
    //     this.renderer.listen(button, 'click', (event) => {
    //       //handle month change
    //       //console.log('click');

    //     });
    //   });
    // }

  }
  
  getAttendanceAll(date) {
    this.all_date_url = 'getattendanceall/'+date;
    this.allDateSubscribe = this.http.get(this.all_date_url).subscribe(
      (res: any) => {
          //console.log(res.return_data);
          if(res.return_status===1)
          {
          this.totalDay=res.return_data.count
          let data=res.return_data
          const startDate = moment(data.asc.date, 'YYYY-MM-DD');
          const endDate = moment(data.desc.date, 'YYYY-MM-DD');
          this.totalDays =endDate.diff(startDate, 'days')+1;
          this.totalAttendance=this.totalDay+" Of "+this.totalDays;
          let total=this.totalDay*100/this.totalDays
          this.totalAttendanceAverage=total.toFixed(2)+" %";
          
          }
          else
          {
            this.totalDay=0;
            this.totalDays=0;
            this.totalAttendance='0';
            this.totalAttendanceAverage="00.00 %"
          }
      },
      errRes => {
        //console.log('DASHBOARD CHART COLOR => ', errRes);
      }
    );
  }

  getAllDate(date) {
    this.all_date_url = 'getmonth/' + date
    this.allDateSubscribe = this.http.get(this.all_date_url).subscribe(
      (res: any) => {
        if (res.return_status === 1) {
          //console.log(res.return_data);
          this.dataArray = res.return_data.date;
          // setTimeout(() => {
          this.load = false;
          this.caload = false;
          this.attendanceCount(this.dataArray);
          let data=(this.persentCountP+this.persentCountPL)*100/this.dayCount
          this.monthAttendance= data.toFixed(2)+" %";
             this.showMonth=(this.persentCountPL+this.persentCountP)+" Of "+this.dayCount;
    
          // this.persentCount=0
          // this.absentCount=0
          // this.manualCount=0
          // this.leaveCount=0
          // this.holidayCount=0
          // }, 3000);
        }
      },
      errRes => {
        //console.log('DASHBOARD CHART COLOR => ', errRes);
      }
    );
  }

  getAllDateLibrary(date) {
    this.all_date_url = 'library/getmonth/' + date
    this.allDateSubscribe = this.http.get(this.all_date_url).subscribe(
      (res: any) => {
        if (res.return_status == 1) {
          //console.log(res.return_data);
          this.dataArray = res.return_data.date;
          this.showMonth=res.return_data.date.length
          this.monthAttendance=this.dayCount;
          // this.persentCountPL = res.return_data.date.length
          // let data=(this.persentCountPL)*100/this.dayCount
          // this.monthAttendance= data.toFixed(2);
          // setTimeout(() => {
          this.load = false;
          this.caload = false;
          // }, 3000);
        }
      },
      errRes => {
        //console.log('DASHBOARD CHART COLOR => ', errRes);
      }
    );
  }

  getLibraryAll(date) {
    this.all_date_url = 'library/getinoutall/'+date;
    this.allDateSubscribe = this.http.get(this.all_date_url).subscribe(
      (res: any) => {
          //console.log('library',res.return_data);
          this.totalAttendance=res.return_data.count
          // //console.log()
          let data=res.return_data
          const startDate = moment(data.asc.date, 'YYYY-MM-DD');
          const endDate = moment(data.desc.date, 'YYYY-MM-DD');
          
         this.totalAttendanceAverage =endDate.diff(startDate, 'days')+1;
          // let total=this.totalDay*100/this.totalDays
          // //console.log('->>>>>>>>>>>',total,this.totalDays)
          // this.totalAttendance=total.toFixed(2);
    
      },
      errRes => {
        //console.log('DASHBOARD CHART COLOR => ', errRes);
      }
    );
  }

  attendanceCount(countArray) {

    let statusCounts = []
    countArray.forEach(obj => {
      if (statusCounts[obj.status]) {
        statusCounts[obj.status]++;
      } else {
        statusCounts[obj.status] = 1;
      }
    });
    //console.log('uniqueArray', statusCounts,)
    Object.entries(statusCounts).forEach(([key, value]) => {
      switch (key) {
        case 'P/L':
          //console.log('pl', `${key}: ${value}`);

          this.persentCountPL = value;
          break;
        case 'P':
          //console.log('P', `${key}: ${value}`);

          this.persentCountP = value;
          break;

        case 'A':
          //console.log('A', `${key}: ${value}`);

          this.absentCount = value;
          break;

        case 'M':
          //console.log('M', `${key}: ${value}`);

          this.manualCount = value;
          break;

        case 'L':
          //console.log('L', `${key}: ${value}`);

          this.leaveCount = value;
          break;

        case 'H':
          //console.log('H', `${key}: ${value}`);

          this.holidayCount = value;
          break;

      }
    });

  }

  onPrevious(_data) {
    //console.log("Previous Data<><><><><><><<><><><><>", _data);

  }

  myBackButton() {
    this.location.back();
  }
  notificatonId(id) {
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

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      if (new DatePipe('en-US').transform(date, 'YYYY-MM-dd') === new DatePipe('en-US').transform(new Date().toISOString(), 'YYYY-MM-dd')) {
        return 'special-data-today';
      }
      if (this.type == 'attendance') {
        for (let i = 0; i < this.dataArray.length; i++) {
          if (new DatePipe('en-US').transform(date, 'YYYY-MM-dd') === this.dataArray[i].date) {
            switch (this.dataArray[i].status) {
              case 'P/L':
                return 'special-date-present';
              case 'P':
                // this.persentCount++;
                return 'special-date-present';
              case 'A':
                // this.absentCount++;
                return 'special-date-absent';
              case 'M':
                // this.manualCount++;
                return 'special-date-manual';
              case 'L':
                // this.leaveCount++;
                return 'special-date-leave';
              case 'H':
                // this.holidayCount++;

                return 'special-date-holiday';
            }

            // return 'special-date';
          }


        }
      }
      else {
        for (let i = 0; i < this.dataArray.length; i++) {
          if (new DatePipe('en-US').transform(date, 'YYYY-MM-dd') === this.dataArray[i].date) {
            return 'special-date-present';
          }
        }
      }
      return '';
    };


  }

  onCalendarClick(event: MouseEvent): void {
    console.log('onCalendarClick....................')
    const target = event.target as HTMLElement;
//console.log(document.getElementsByClassName('mat-button-wrapper')[0])
    let dateGet = document.getElementsByClassName('mat-button-wrapper')[0].childNodes[0].childNodes[0].textContent
    let check = dateGet.split(" ");

    if (check.length == 2) {
      this.persentCountPL = 0;
      this.absentCount = 0;
      this.manualCount = 0;
      this.leaveCount = 0;
      this.holidayCount = 0;
      this.persentCountP = 0;
      if (target.classList.contains('mat-calendar-previous-button')) {
        this.caload = true;
  
      } else if (target.classList.contains('mat-calendar-next-button')) {
        this.caload = true;

      } else if (target.classList.contains('mat-calendar-body-cell-content')) {
      //  console.log('check', document.getElementsByClassName(target.classList.value))
      if(this.check)
      {
        this.caload = true;
      }
      }

      this.dashboard_date = moment(new Date(dateGet)).format('MMM YYYY');
      this.dayCount = moment(new Date(dateGet)).daysInMonth()
      //console.log('count=======', check)
      // this.selectedDate = new Date(dateGet);
      this.selectedDate = new Date(moment(new Date(dateGet)).format('YYYY-MM-DD'));

      if (this.type === 'library') {
        // this.caload = true;
        this.getAllDateLibrary(moment(new Date(dateGet)).format('YYYY-MM-DD'));
        this.getLibraryAll(moment(new Date(dateGet)).add('month',1).format('YYYY-MM-DD'));
        this.dateClass();

      }
      else {
        // this.caload = true;
        this.getAllDate(moment(new Date(dateGet)).format('YYYY-MM-DD'));
     this.getAttendanceAll(moment(new Date(dateGet)).add('month',1).format('YYYY-MM-DD'));
        this.dateClass();

        // this.selectedDate = new Date(dateGet);

      }
    }

    /////////////Importent......................../


    // if (target.classList.contains('mat-calendar-previous-button')) {
    //   // Handle previous button click
    //   console.log('Previous button clicked!');

    // } else if (target.classList.contains('mat-calendar-next-button')) {
    //   // Handle next button click
    //   console.log('Next button clicked!');
    // } else if (target.classList.contains('mat-calendar-body-cell')) {
    //   // Handle cell click
    //   console.log('Cell clicked!', );

    // }
    // //console.log('Cell clicked Done->>>>',moment(new Date( document.getElementById('mat-calendar-button-0').innerHTML)).format('YYYY-MM-DD'));
    //console.log('Cell clicked Done->>>>', moment(new Date(dateGet)).format('YYYY-MM-DD'));

    // let data =document.getElementById('mat-calendar-button-0').innerHTML;

  }
  onSelect(event) {

    console.log("onSelect event......", event);
    this.check=false;
    this.in_out_time = []
    //console.log(event);
    this.date = new DatePipe('en-US').transform(event, 'YYYY-MM-dd');
    // this.selectedDate = event;
    //console.log("select Date.......", this.selectedDate);

    //console.log("date>>", this.date);
   
    if (this.type === 'library') {
    this.inout_url = 'library/get?date=' + this.date + '&page=20'
    this.getLibraryByDate()

    }
    else
    {
      this.inout_url = 'attendance?date=' + this.date + '&page=20'
      this.getAttendanceByDate()
    }
    this.click_modal = false;
   
    // this.presentAlert();
  }

  getAttendanceByDate()
  {
    this.dateSubscribe = this.http.get(this.inout_url).subscribe(
      (res: any) => {
        this.check=true;

        //console.log("click_modal", this.click_modal);
        if (res.return_status == 1) {
          this.in_out_time = res.return_data.attendance.rows
          if (this.in_out_time.length) {
            this.click_modal = true;
            
          }
          // //console.log(this.in_out_time)
          this.in_out_time.forEach(element => {
            // //console.log(element.in_time,element.out_time)
            let in_time = moment(element.in_time, 'hh:mm A');
            let out_time = moment(element.out_time, 'hh:mm A');
            element.in_day = this.getTimeOfDay(moment(element.in_time, 'hh:mm A').format('hh:mm A').toString());
            if (element.out_time == "") {
              element.hour = ""
              element.out_day = ""
            }
            else {
              element.hour = moment.utc(moment.duration({ hours: moment.duration(out_time.diff(moment(in_time, "HH:MM"))).hours(), minutes: moment.duration(out_time.diff(moment(in_time, 'HH:MM'))).minutes() }).asMilliseconds()).format("HH:mm") + ' Hr';
              element.out_day = this.getTimeOfDay(moment(element.out_time, 'hh:mm A').format('hh:mm A'));
              element.out_time = moment(element.out_time, 'hh:mm A').format("hh:mm");

            }
            element.in_time = moment(element.in_time, 'hh:mm A').format("hh:mm");
          });


        }
      },
      errRes => {
        //console.log('DASHBOARD CHART COLOR => ', errRes);
      }
    );
  }
  getLibraryByDate()
  {
    this.dateSubscribe = this.http.get(this.inout_url).subscribe(
      (res: any) => {
        this.check=true;

        //console.log("click_modal", this.click_modal);
        if (res.return_status == 1) {
          this.in_out_time = res.return_data.rows
          if (this.in_out_time.length) {
            this.click_modal = true;
            
          }
          // //console.log(this.in_out_time)
          this.in_out_time.forEach(element => {
            // //console.log(element.in_time,element.out_time)
            let in_time = moment(element.in_time, 'hh:mm A');
            let out_time = moment(element.out_time, 'hh:mm A');
            element.in_day = this.getTimeOfDay(moment(element.in_time, 'hh:mm A').format('hh:mm A').toString());
            if (element.out_time == "") {
              element.hour = ""
              element.out_day = ""
            }
            else {
              element.hour = moment.utc(moment.duration({ hours: moment.duration(out_time.diff(moment(in_time, "HH:MM"))).hours(), minutes: moment.duration(out_time.diff(moment(in_time, 'HH:MM'))).minutes() }).asMilliseconds()).format("HH:mm") + ' Hr';
              element.out_day = this.getTimeOfDay(moment(element.out_time, 'hh:mm A').format('hh:mm A'));
              element.out_time = moment(element.out_time, 'hh:mm A').format("hh:mm");

            }
            element.in_time = moment(element.in_time, 'hh:mm A').format("hh:mm");
          });


        }
      },
      errRes => {
        //console.log('DASHBOARD CHART COLOR => ', errRes);
      }
    );
  }
  // onSelect22(event){
  //   //console.log("selected Date",event);
  //   this.click_modal = true;

  // }

  clickedOut() {
    this.click_modal = false;
    //console.log('this.click_modal', this.click_modal);

  }
  onClick(check) {
    //    //console.log(check);
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
