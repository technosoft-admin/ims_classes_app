import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';
import { Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-home-work-student-list',
  templateUrl: './home-work-student-list.page.html',
  styleUrls: ['./home-work-student-list.page.scss'],
})
export class HomeWorkStudentListPage implements OnInit {

  @Input() getData: string;
  tab: any;
  all: any;
  divA: any;
  divB: any;
  list: any;
  private getDivisionSubscribe: Subscription;
  private studentListSubscribe: Subscription;
  private getHomeWorkIdSubscribe: Subscription;
  student_list_url: string;
  file_url = environment.fileUrl;
  divisionlist: any;
  range: any;
  listData: any;
  sms: boolean;
  app: boolean;
  divisionId: any;
  classId: any;
  id: any;
  homeworkList: any;
  homeworkListData: any;
  model: any = {}
  checkStudentData: any = [];


  // allComplete = false;

  constructor(private http: HttpClient, private router: Router, private commonUtils: CommonUtils, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getDivision();
    this.model = { search: null,checked:false };
    this.checkStudentData=[];
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.sms = false;
    this.app = true;
    if (this.id != 0) {
      this.getHomeWorkId(this.id)
    }
    console.log('type', this.app, this.sms)
  }
  ionViewWillEnter() {
    this.checkStudentData=[]
    this.sms = false;
    this.app = true;
    this.model = { search: null,checked:false };
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id != 0) {
      this.getHomeWorkId(this.id)
    }
    this.tab = this.divisionId;
    this.getDivision();
    console.log(this.app, this.sms)
  }
  getHomeWorkId(_id) {
    this.getHomeWorkIdSubscribe = this.http.get('getHomworkById/' + _id).subscribe(
      (res: any) => {
        if (res.return_status === 1) {
          this.homeworkList = res.return_data.homework_student_map;
          this.homeworkListData = res.return_data.student_edit_data;
          let type = this.homeworkListData.sent_to.split(",")
          if (type[0] == 'sms' || type[1] == 'sms') {
            this.sms = true
          }
          else {
            this.sms = false
          }
          if (type[0] == 'app' || type[1] == 'app') {
            this.app = true
          }
          else {
            this.app = false
          }
        }
      },
      errRes => {
        console.log('DASHBOARD CHART COLOR => ', errRes);
      }
    );
  }


  onClick(check, id) {
    console.log(this.checkStudentData);

    this.model = { search: null,checked:false };

    this.tab = check;
    this.classId = id;
    this.getStudentData(check)

  }

  getStudentData(id) {
    this.student_list_url = 'getstudent?id=' + id
    this.studentListSubscribe = this.http.get(this.student_list_url).subscribe(
      (res: any) => {
        if (res.return_status == 1) {
          console.log('getstudent', res.return_data.student_data);
          let list = res.return_data.student_data;
          if (this.id != 0) {
            if (this.checkStudentData.length === 0) {
            list.forEach(element => {
              element.checked = '';
              this.homeworkList.forEach(elementid => {
                if (element.id_card_no === elementid.id_card_no) {
                  element.checked = 'checked';
                  this.checkDataPush(element);
                  
                  Breakpoints
                }
              });
            });
          }
          else
          {
            list.forEach(element => {
              element.checked = '';
              this.checkStudentData.forEach(elementid => {
                if (element.id_card_no === elementid.id_card_no) {
                  element.checked = 'checked';     
                  Breakpoints
                }
              });
            });
          }
          }
          else
          {
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

  onSubmit() {
    let totalData = []
    let type = []
    if (this.sms === true) {
      type.push('sms')
    }
    if (this.app === true) {
      type.push('app')
    }
    if (this.sms === true || this.app === true) {
      for (let i = 0; i < this.checkStudentData.length; i++) {
        console.log('dwv', this.checkStudentData[i]);

        if (this.checkStudentData[i].tab === this.tab) {
          totalData.push(this.checkStudentData[i]);
        }
      }
      if (totalData.length > 0) {
        console.log(this.sms, this.app);

        localStorage.setItem('studentHomework', JSON.stringify({ 'student': totalData, 'type': type, 'class_id': this.classId, 'division_id': this.tab }));

        this.router.navigateByUrl('/home-work-add/' + this.id);

      }
      else {
        this.commonUtils.presentToast('error', 'Choose anyone student');
      }
    }
    else {
      this.commonUtils.presentToast('error', 'Choose anyone notification');

    }

  }

  allComplete(value, _id) {
    
    if (_id == 0) {
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
      this.list.forEach(element => {
        if (element.id == _id) {
          if (value.checked) {
            element.checked = 'checked'
            console.log('checked');
            
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

  getDivision() {
    let get_division_url = 'getdivision'
    this.getDivisionSubscribe = this.http.get(get_division_url).subscribe(
      (res: any) => {
        if (res.return_status == 1) {
          this.divisionlist = res.return_data.division_data;
          console.log('divisionlist', this.divisionlist[0]);
          this.divisionId = this.divisionlist[0].id
          this.tab = this.divisionId
          this.classId = this.divisionlist[0].classmodel.id
          this.getStudentData(this.divisionId)

        }

      },
      errRes => {
        console.log('DASHBOARD CHART COLOR => ', errRes);
      }
    );
  }

  search(query) {
    this.model = { checked: false };
    console.log(this.model);
    this.list = this.listData.filter(book => book.full_name.toLowerCase().indexOf(query.toLowerCase()) > -1 || book.id_card_no.toString().toLowerCase().indexOf(query.toLowerCase()) > -1)
    let checkedData = this.listData.filter(book => book.checked === 'checked');
    let studentCheck = this.checkStudentData.filter(book => book.checked === 'checked' && book.tab === this.tab);
    console.log(checkedData.length, this.listData.length)
    if (checkedData.length == this.listData.length || this.listData.length==studentCheck.length) {
      this.model.checked = true;
    }
    else {
      this.model.checked = false;
    }
  }

  onChecked(val, type) {
    console.log(val);

    console.log(this.app, this.sms);
    if (type == 'SMS') {
      this.sms = val.checked
    }
    else {
      this.app = val.checked
    }
    console.log(this.app, this.sms);

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

  ngOnDestory() {
    if (this.studentListSubscribe !== undefined) {
      this.studentListSubscribe.unsubscribe();
    }
    if (this.getDivisionSubscribe !== undefined) {
      this.getDivisionSubscribe.unsubscribe();
    }
  }


}
