import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.page.html',
  styleUrls: ['./student-list.page.scss'],
})
export class StudentListPage implements OnInit {

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
  type: string;
  selectall: boolean;
  model: any = {}

  // allComplete = false;

  constructor(private http: HttpClient, private router: Router, private commonUtils: CommonUtils,private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    this.sms = false;
    this.app = true;
    this.selectall=false
    this.getStudentData(0)
    this.getDivision();
  }
  
  ionViewWillEnter() {
    this.selectall=false
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    console.log('type',this.type);
    this.tab = 0;
    this.getStudentData(0)
    this.getDivision();

  }


  onClick(check) {
   this.ngOnInit();
    document.querySelector('ion-searchbar').getInputElement().then((searchInput) => {
      console.log(searchInput.value);

      searchInput.value = '';
   });
   this.model.search=null;
    this.tab = check;
    this.getStudentData(check)
  }

  getStudentData(id) {
    this.student_list_url = 'studentlist?type=' + this.type+'&division='+id;
    this.studentListSubscribe = this.http.get(this.student_list_url).subscribe(
      (res: any) => {
        if (res.return_status == 1) {
          console.log('getstudent', res.return_data.student_data);
          let list = res.return_data.student_data;
          // list.forEach(element => {
          //   element.checked = '';
          // });
          this.list = list;
          this.listData = list;
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
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].checked === 'checked') {
          totalData.push(this.list[i].id);
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
    console.log("All Complete.....",value);

    if (_id == 0) {
      this.list.forEach(element => {
        if (value.checked) {
          element.checked = 'checked';
        }
        else {
          element.checked = ''

        }
      });
    }
    else {
      this.list.forEach(element => {
        if (element.id == _id) {
          if (value.checked) {
            element.checked = 'checked'
          }
          else {
            element.checked = ''
          }
        }
      });
      // console.log(localStorage.getItem('name'));
    }
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

  ngOnDestory() {
    if (this.studentListSubscribe !== undefined) {
      this.studentListSubscribe.unsubscribe();
    }
    if (this.getDivisionSubscribe !== undefined) {
      this.getDivisionSubscribe.unsubscribe();
    }
  }

}
