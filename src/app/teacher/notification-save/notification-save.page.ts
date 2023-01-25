import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';

@Component({
  selector: 'app-notification-save',
  templateUrl: './notification-save.page.html',
  styleUrls: ['./notification-save.page.scss'],
})
export class NotificationSavePage implements OnInit {
  @Input() getData: string;
  tab: any;
  all: any;
  divA: any;
  divB: any;
  list: any;
  private getDivisionSubscribe: Subscription;
  private studentListSubscribe: Subscription;
  student_list_url: string;
  file_url = environment.fileUrl;
  divisionlist: any;
  range: any;
  listData: any;
  sms: boolean;
  app: boolean;
  model: any = {}
  checkStudentData: any = [];
  // allComplete = false;

  constructor(private http: HttpClient, private router: Router, private commonUtils: CommonUtils) { }

  ngOnInit() {
    this.model = { search: null, checked: false };
    this.checkStudentData=[]
    this.sms = false;
    this.app = true;
    this.getStudentData(0)
    this.getDivision();
  }
  ionViewWillEnter() {
    this.model = { search: null, checked: false };
    this.checkStudentData=[]

    this.tab = 0;
    this.sms = false;
    this.app = true;
    this.getStudentData(0)
    this.getDivision();

  }


  onClick(check) {
    document.querySelector('ion-searchbar').getInputElement().then((searchInput) => {
      searchInput.value = '';
    });

    this.model.checked = false;
    this.tab = check;
    this.getStudentData(check)

  }
  getStudentData(id) {
    this.student_list_url = 'getstudent?id=' + id
    this.studentListSubscribe = this.http.get(this.student_list_url).subscribe(
      (res: any) => {
        if (res.return_status == 1) {
          console.log('getstudent', res.return_data.student_data);
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
          // list.forEach(element => {
          //   element.checked = '';
          // });
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
    if (this.sms === true || this.app === true) {
      for (let i = 0; i < this.checkStudentData.length; i++) {
        if (this.checkStudentData[i].tab === this.tab) {
          totalData.push(this.checkStudentData[i].id);
        }
      }
      if (totalData.length > 0) {
        console.log(this.sms, this.app);

        localStorage.setItem('studentNotfication', JSON.stringify({ 'student': totalData, 'type': { 'sms': this.sms, 'app': this.app } }));
        this.router.navigateByUrl('/notification-message');

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
    let deleteId = -1;
    // console.log('old',value,_id);

    if (_id == 0) {
        // this.list=this.listData
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
            console.log(element);
            
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
    //  this.checkDataPush(this.list)
    console.log('update', this.list, this.checkStudentData);

  }

  getDivision() {
    let get_division_url = 'getdivision'
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

  search(query) {

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
