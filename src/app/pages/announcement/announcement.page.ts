import { WeekDay } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import { CalendarMode, Step } from 'ionic2-calendar/calendar';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
    selector: 'app-announcement',
    templateUrl: './announcement.page.html',
    styleUrls: ['./announcement.page.scss'],
})

export class AnnouncementPage implements OnInit {
    @ViewChild(CalendarComponent) myCal: CalendarComponent;

    eventSource = [];
    viewTitle: string;
    click_modal: boolean = false;
    private allPlannerSubscribe: Subscription;
    private getDayPlannerSubscribe: Subscription;
      tab: any = 'dashboard_btn';
    eventDataShow: boolean
    // calendar = {
    //   mode: 'month',
    //   currentDate: new Date()
    // };
    calendar = {
        mode: 'month' as CalendarMode,
        // step: 30 as Step,
        currentDate: new Date(),
        dateFormatter: {
            formatMonthViewDay: function (date: Date) {
                return date.getDate().toString();
            },
            formatMonthViewDayHeader: function (date: Date) {
                return 'MonMH';
            },
            formatMonthViewTitle: function (date: Date) {
                return 'testMT';
            },
            formatWeekViewDayHeader: function (date: Date) {
                return 'MonWH';
            },
            formatWeekViewTitle: function (date: Date) {
                return 'testWT';
            },
            formatWeekViewHourColumn: function (date: Date) {
                return 'testWH';
            },
            formatDayViewHourColumn: function (date: Date) {
                return 'testDH';
            },
            formatDayViewTitle: function (date: Date) {
                return 'testDT';
            }
        }

    };
    all_date_url: string;
    eventData: any;
    evenGetDay: any;
    dateShow: any;


    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.eventDataShow=true;
        var d = new Date();
        var monthName = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
        this.getPlanner(monthName[d.getMonth()], d.getFullYear())

    }

    
    getSunday(month, year) {
        var d = new Date();
        var getTot = daysInMonth(month, year); //Get total days in a month
        var sat = new Array();   //Declaring array for inserting Saturdays
        var sun = new Array();   //Declaring array for inserting Sundays
        // console.log(new Date(year+'/'+month+'/'+1),year,month);

        for (var i = 1; i <= getTot; i++) {
            //looping through days in month

            var newDate = new Date(year + '/' + month + '/' + i)
            // console.log(month,year,i,newDate.getDay(),newDate);

            if (newDate.getDay() == 0) {   //if Sunday
                sun.push(i);
            }


        }
        return sun;


        function daysInMonth(month, year) {
            return new Date(year, month, 0).getDate();
        }
    }

    eventDataSet(eventGet, month, year, monthId) {
        this.eventSource = []
        let sunday = this.getSunday(monthId + 1, year)
        let totalDay = new Date(year, monthId + 1, 0).getDate()
        //////////////////// Monthe Date        
        for (let i = 1; i <= totalDay; i++) {

            let sundayDate = "";
            let eventDate = 0;
            let holiday = "";
            let count = 0;
            /////Sunday
            for (let j = 0; j < sunday.length; j++) {
                if (sunday[j] == i) {

                    sundayDate = "with-event-sunday";
                    ////////////// Sunday Push In Event
                    this.eventSource.push({
                        title: 'holiday',
                        startTime: new Date(Date.UTC(year, monthId, i)),
                        endTime: new Date(Date.UTC(year, monthId, i)),
                        color: [],
                        class: sundayDate,
                        dateData: year + "-" + monthId + "-" + i,
                        id:"",
                        allDay: false,
                        

                    });
                    break;
                }
            }
            ////////Event Get

            for (let e = 0; e < eventGet.length; e++) {
                let p = 0;
                let splitToDate = eventGet[e].to_date.split("-")
                let todate = eventGet[e].toDate
                /////////////////Event check From Date to Date///
                if (eventGet[e].fromDate <= i && todate >= i) {
                    count = 1;

                    if (eventGet[e].holiday == "1") {
                        p = 1;
                        holiday = "holiday"
                    } else if (eventGet[e].exam == "1") {
                        p = 1;
                        holiday = "exam"
                    }
                    else {
                        holiday = "event"

                    }
                    let filterData = this.eventSource;
                    let filterDataGet = []
                    let update = 0;
                    this.eventSource.forEach(element => {

                        if (element.dateData == year + "-" + monthId + "-" + i) {
                            update = 1
                            console.log(element)
                            let idData=element.id

                            let idSplit=idData.split(",");
                            idSplit.push(eventGet[e].id);
                            element.id=idSplit.toString();
                            let array = []
                            if( element.color.length!=0)
                            {
                            array = element.color
                            array.push(holiday)
                            element.color = array
                            }
                            else
                            {
                                array.push(holiday)
                                element.color = array 
                            }

                        }
                    });
                    if (update == 0) {
                        this.eventSource.push({
                            title: 'holiday',
                            startTime: new Date(Date.UTC(year, monthId, i)),
                            endTime: new Date(Date.UTC(year, monthId, i)),
                            color: [holiday],
                            class: sundayDate,
                            id:eventGet[e].id.toString(),
                            dateData: year + "-" + monthId + "-" + i,
                            allDay: false,

                        });
                    }
                }
            }

        }
        console.log('eventSource', this.eventSource);

        this.myCal.loadEvents();
    }

    getPlanner(month, year) {
        let monthId;
        var monthName = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
        for (let i = 0; i < monthName.length; i++) {
            if (month == monthName[i]) {
                monthId = i
                break;
            }
        }
        console.log(month, year);
        this.all_date_url = "planner"
        let fd = new FormData();
        fd.append('month', month);
        fd.append('year', year);
        fd.append('date', monthId+1+"-"+year);

        this.allPlannerSubscribe = this.http.post(this.all_date_url, fd).subscribe(
            (res: any) => {
                if (res.return_status == 1) {

                    let data = res.return_data;
                    data.forEach(element => {
                        let splitFromDate = element.from_date.split("-")
                        let splitToDate = element.to_date.split("-")

                        element.fromDate = splitFromDate[0]
                        element.startDay = splitFromDate[0]
                        element.endDay = splitToDate[0]
                        if(element.holiday=='1')
                        {
                        element.type ='holiyday'
                        }
                        else if(element.exam=="1")
                        {
                        element.type ='exam'

                        }
                        else
                        {
                        element.type ='event'

                        }
                        
                        if (splitToDate[1] != monthId + 1) {
                            element.toDate = 31
                            element.endDay+=" "+monthName[monthId + 1].slice(0,3)
                        }
                        else {
                            element.toDate = splitToDate[0]

                        }
                        if (splitFromDate[1] != monthId + 1) {
                            element.fromDate = '01'
                            element.startDay+=" "+monthName[monthId -1].slice(0,3)
                        }
                        else {
                            element.fromDate = splitFromDate[0]

                        }


                    });
                    this.eventDataSet(data, month, year, monthId)

                    this.eventData = data;
                        if(this.eventData.length==0)
                        {
                            this.eventDataShow=false
                        }
                        else
                        {
                            this.eventDataShow=true

                        }
                }
            },
            (errRes) => {
                console.log('error ', errRes);
            }
        );

    }

    onViewTitleChanged(title) {
        this.viewTitle = title
    }
    eventShowDate(day,id)
    {
       
        console.log(day,id);
        let title=this.viewTitle.split(" ")
        this.dateShow=day+" "+title[0].slice(0,3)+" "+title[1];
        console.log(title);
        
        let monthId=this.getMonthId(title[0])+1;
        let date=day+"-"+monthId+"-"+title[1]
        console.log(date)
        let getDay="getplannerdate"
        let fd = new FormData();
        fd.append('iddata', id);
        fd.append('date', date);
        this.getDayPlannerSubscribe = this.http.post(getDay,fd).subscribe(
            (res: any) => {
                if (res.return_status == 1) {
                    
                    let getData=res.return_data;
                    getData.forEach(element => {
                        element.type="event"
                    if(element.holiday=="1")
                    {
                        element.type="holiyday" 
                    }
                    if(element.exam=="1")
                    {
                        element.type="exam" 
                    }
                    });
                this.evenGetDay=getData;
                if(getData.length!=0)
                this.click_modal = true;
                
                }
                else
                {

                }
            },
                (errRes) => {
                    console.log('error ', errRes);
                }
            );

        
    }

    clickedOut() {
        this.click_modal = false;
        console.log('this.click_modal', this.click_modal);
    
    }
 

    onEventSelected(event) {
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    }
   

    onRangeChanged(ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }

    getMonthId(month_name)
    {
        var monthName = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
        let monthId=0;
        for (let i = 0; i < monthName.length; i++) {
            if (month_name == monthName[i]) {
                monthId = i
                break;
            }
        }
        return monthId;
    }

    getMonthName(monthId)
    {
        var monthName = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
        let month=0;
       
        return monthName[monthId];
    }

    next(title)
    {
        let titlesplit=title.split(" ")
        let year=titlesplit[1];
        let monthid=this.getMonthId(titlesplit[0]);

        if(monthid==11)
        {
            monthid=-1
            year= parseInt(titlesplit[1])+1
        }
        let monthName=this.getMonthName(monthid+1)
        console.log('next',title,monthid+1,monthName);

        let month=monthName
        this.getPlanner(month, year) 
        this.myCal.slideNext();
    }
    
    back(title)
    {
        let titlesplit=title.split(" ")
        let year=titlesplit[1];
        let monthid=this.getMonthId(titlesplit[0]);

        if(monthid==0)
        {
            monthid=12
            year= parseInt(titlesplit[1])-1
        }
        let monthName=this.getMonthName(monthid-1)
        console.log('next',title,monthid-1,monthName);

        let month=monthName
        this.getPlanner(month, year) 
        // this.myCal.slideNext();
        this.myCal.slidePrev();
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

}
