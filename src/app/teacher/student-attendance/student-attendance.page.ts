import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.page.html',
  styleUrls: ['./student-attendance.page.scss'],
})
export class StudentAttendancePage implements OnInit {
  @ViewChild('secondDialog', { static: true }) secondDialog: TemplateRef<any>;
  file_url = environment.fileUrl;
  checkStudentData: any = [];

  private studentListSubscribe: Subscription;
  private getDivisionSubscribe: Subscription;
  private saveAttendanceSubscribe: Subscription;


  //-----global variable declared-----
  tab: any;
  all: any;
  divA: any;
  divB: any;
  list: any;
  centered = false;
  radius: number;
  color: string;
  listData: any;
  student_list_url;
  divisionlist: any;
  getData:any
  action: any;
  count_data: any;
  absentList:any[]=[];
  checked: Boolean;
  totalData: any[];
  model: any = {}

  constructor(
    private http: HttpClient,
    private router: Router,
    private commonUtils: CommonUtils,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.checkStudentData=[]

    this.model = { search: null,checked:false };
    this.getStudentData(0);
    this.getDivision();
    this.action = 1;
  }

  ionViewWillEnter() {
    this.model = { search: null,checked:false };
    this.checkStudentData=[]
    this.tab = 0;
    this.getStudentData(0);
    this.getDivision();
    this.action = 'pre';
    console.log("Action...", this.action);


  }

  allComplete(value, _id) {
    // console.log(value, _id,this.);

    if (_id == 0) {
      // this.list;
      this.listData.forEach(element => {
        if (value.checked) {
          element.checked = 'checked'
          this.checkDataPush(element);

        }
        else {
          element.checked = ''
          this.unCheckDataPush(element);


        }
      });
    }
    else {
      this.checked = false;
      this.list.forEach(element => {
        if (element.id == _id) {
          if (value.checked) {
            element.checked = 'checked'
            this.checkDataPush(element);
          }
          else {
            element.checked = ''
            this.unCheckDataPush(element);

          }
        }
      });
    }
    let checkedData = this.list.filter(book => book.checked == 'checked');

    let studentCheck = this.checkStudentData.filter(book => book.checked == 'checked' && book.tab === this.tab);
    if (checkedData.length === this.listData.length || this.listData.length==studentCheck.length) {
      this.model = { checked: true };
    }
    else {
      this.model = { checked: false };
    }
  }

  search(query) {
  
    this.list = this.listData.filter(book => book.full_name.toLowerCase().indexOf(query.toLowerCase()) > -1 || book.id_card_no.toString().toLowerCase().indexOf(query.toLowerCase()) > -1)
    this.model.checked=false;
    let checkedData = this.listData.filter(book => book.checked === 'checked');
    let studentCheck = this.checkStudentData.filter(book => book.checked === 'checked' && book.tab === this.tab);
    console.log(checkedData.length, this.listData.length,studentCheck.length)
    if (checkedData.length == this.listData.length || this.listData.length==studentCheck.length) {
      this.model.checked = true;
    }
    else {
      this.model.checked = false;
    }
    console.log(this.model.checked);
    
  }

  openDialogWithoutRef() {
    this.dialog.open(this.secondDialog);
  }

  openDialogclose() {
    this.dialog.closeAll();
  }

  checkDataPush(element) {
    let count = 0;
    if (this.checkStudentData.length != 0) {
      for (let i = 0; i < this.checkStudentData.length; i++) {

        if (element.id == this.checkStudentData[i].id && this.tab == this.checkStudentData[i].tab) {
          count=1; 
        }
      }
      if (count == 0){
      element.tab = this.tab;
        this.checkStudentData.push(element);
      }
    }
    else {
      element.tab = this.tab;
      this.checkStudentData.push(element);
    }
  }

  unCheckDataPush(element) {
    if (this.checkStudentData.length != 0) {
      for (let i = 0; i < this.checkStudentData.length; i++) {

        if (element.id == this.checkStudentData[i].id && this.tab == this.checkStudentData[i].tab) {
          this.checkStudentData.splice(i, 1);
          break;

        }
      }
    }

  }

  onClick(check) {

    document.querySelector('ion-searchbar').getInputElement().then((searchInput) => {
      searchInput.value = '';
   });

   this.model.checked=false;
    this.tab = check;
    this.getStudentData(check);

  }

  onActive(type) {
    console.log("check......", type);

    if (type === 'absent') {  //////////////////////// absent Model///////////////
      this.absentList = this.listData.filter(book => book.checked === 'checked')
      if (this.absentList.length !== 0) {
        this.action = "absent";
        this.openDialogWithoutRef();
      }
    } else if (type === 'present') { //////////////////////// Present Model///////////////
      this.action = "present";
      this.saveAttendance();
    } else if (type === 'absent-present') { //////////////////////// Absent-Present Model///////////////
      this.absentList = this.listData.filter(book => book.checked === 'checked')
      this.action = "absent-present";
      this.openDialogWithoutRef();
    } else if (type === 'present-absent') { //////////////////////// Present-Absent Model///////////////
      this.absentList = this.listData.filter(book => book.checked !== 'checked')
      this.action = "present-absent";
      this.openDialogWithoutRef();
    }
  }

  getStudentData(id) {
    this.count_data = [];
    this.list = []
    this.listData = []
    this.student_list_url = 'attendance/studentlist?division_id=' + id
    this.studentListSubscribe = this.http.get(this.student_list_url).subscribe(
      (res: any) => {

        if (res.return_status == 1) {
          console.log('getstudent', res.return_data.student_data);
          this.count_data = res.return_data
          let list = res.return_data.student_data;
          if (this.checkStudentData.length != 0) {
            list.forEach(listelement => {
              let checkval="";
              this.checkStudentData.forEach(studentelement => {
              if(listelement.id==studentelement.id && this.tab==studentelement.tab)
              {
                checkval=studentelement.checked;
              }

              });
              listelement.checked=checkval
            });
          }
          this.list = list;
          this.listData = list;
          let checkedData = this.list.filter(book => book.checked == 'checked');
          if (checkedData.length == this.listData.length) {
            this.model = { checked: true };
          }
          else {
            this.model = { checked: false };
          }
        }

      },
      errRes => {
        console.log('DASHBOARD CHART COLOR => ', errRes);
      }
    );
  }

  saveAttendance() {
    this.totalData = []
    let fd = new FormData();
    if (this.action === 'absent') { //////////////////////// Absent List Send///////////////
      this.checkStudentData.forEach(element => {
        if (element.tab === this.tab) {
          element.checked = "unchecked"
          this.totalData.push(element)
        }
      });
    }
    else if (this.action === 'present') {//////////////////////// Present List Send///////////////
      this.checkStudentData.forEach(element => {
        if (element.tab === this.tab) {
          this.totalData.push(element)
        }
      });
    }
    else if (this.action === 'absent-present') {//////////////////////// Absent-Present List Send///////////////
      this.checkStudentData.forEach(element => {
        if (element.tab === this.tab) {
          element.checked = "unchecked";
          this.totalData.push(element)
        }
        // else {
        //   element.checked = "checked";
        //   this.totalData.push(element)
        // }
      });
      this.list=[]
      this.list=this.listData;
      this.list.forEach(element => {
        let count=0;
        this.checkStudentData.forEach(studentelement => {
          if (studentelement.tab === this.tab && studentelement.id ===element.id) {
            count=1;
          }
        });
        if(count==0)
        {
        element.checked = "checked";
        this.totalData.push(element)
        }
      });
    
    }
    else if (this.action === 'present-absent') {//////////////////////// Present Absent List Send///////////////
      this.checkStudentData.forEach(element => {
        if (element.tab === this.tab) {
          this.totalData.push(element)
        }
        // else {
        //   element.checked = "unchecked";
        //   this.totalData.push(element)
        // }
      });
      this.list=[]
      this.list=this.listData;
      this.list.forEach(element => {
        let count=0;
        this.checkStudentData.forEach(studentelement => {
          if (studentelement.tab === this.tab && studentelement.id ===element.id) {
            count=1
          }
        });
        if(count==0)
        {
        element.checked = "unchecked";
        this.totalData.push(element)
        }
        // if(element.checked !== "checked"){
        //   element.checked = "unchecked";
        //   this.totalData.push(element)
        // }
      });
    }

    let list = {
      data: this.totalData
    }
    // fd.append('studentList',);
    console.log(list);

    if (this.totalData.length !== 0) {
      this.openDialogclose()  
    
      this.saveAttendanceSubscribe = this.http.post('attendencestudentadd', list).subscribe(
        (response: any) => {
          if (response.return_status === 1) {
            this.getStudentData(this.tab);
            this.checkStudentData=[]; 
         
          }

        },
        errRes => {

        }
      );
    }
    else {
      this.commonUtils.presentToast('error', 'Select Student');

    }
  }

  getDivision() {
    let get_division_url = 'getdivision';
    this.getDivisionSubscribe = this.http.get(get_division_url).subscribe(
      (res: any) => {
        if (res.return_status == 1) {
          this.divisionlist = res.return_data.division_data;
        }
      },
      errRes => {
        console.log('DASHBOARD CHART COLOR => ', errRes);
      }
    );
  }

  ngOnDestory() {
    if (this.studentListSubscribe !== undefined) {
      this.studentListSubscribe.unsubscribe();
    }
    if (this.getDivisionSubscribe !== undefined) {
      this.getDivisionSubscribe.unsubscribe();
    }
    if (this.saveAttendanceSubscribe !== undefined) {
      this.saveAttendanceSubscribe.unsubscribe();
    }
  }

}
