import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';
import { NgForm } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor'

@Component({
  selector: 'app-student-leave-add',
  templateUrl: './student-leave-add.page.html',
  styleUrls: ['./student-leave-add.page.scss'],
})
export class StudentLeaveAddPage implements OnInit {
  id: number;
  model: any = {};
  type: string;
  private addLeaveSubscribe: Subscription;
  private getLeavekIdSubscribe: Subscription;

  constructor(private http: HttpClient, private router: Router, private commonUtils: CommonUtils,private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
  this.id = +this.activatedRoute.snapshot.paramMap.get('id');
  this.type="Add";
    if(this.id != 0)
    {
    this.type="Edit";
    this.getLeaveId(this.id)
    }
  }
  ionViewWillEnter() 
  {
  this.id = +this.activatedRoute.snapshot.paramMap.get('id');
  this.type="Add";
  if(this.id != 0)
  {
  this.type="Edit";
  this.getLeaveId(this.id)
  }
  }
  onSubmit(_form: NgForm){
    console.log(_form.value);
    let fd = new FormData();
    for (let val in _form.value) {
      if(_form.value[val] == undefined){
        _form.value[val] = '';
      }
    fd.append(val, _form.value[val]);
  };
 
  let leave_add_url="leaveadd"
  if(this.type=='Edit')
  {
    leave_add_url="leaveedit"
  fd.append("id",this.id.toString());

  }
  this.addLeaveSubscribe = this.http.post(leave_add_url,fd).subscribe(
    (res: any) => {
      if (res.return_status === 1) {3
        
        this.router.navigateByUrl('/student-leave-list');
      }
    }
  );

  }
  getLeaveId(_id)
  {
    this.getLeavekIdSubscribe = this.http.get('getleaveid/'+_id).subscribe(
      (res: any) => {
        if (res.return_status === 1) {
            // this.homeworkList=res.return_data.homework_student_map;
            // this.homeworkListData =res.return_data.student_edit_data;
            this.model = {
              from_date : res.return_data.from_date,
              to_date : res.return_data.to_date,
              reason : res.return_data.reason,
              subject_name : res.return_data.subject_name,
            }
            console.log('this.model',   this.model);
            
         
        }
      },
      errRes => {
        console.log('DASHBOARD CHART COLOR => ', errRes);
      }
    ); 
  }
  backPage()
  {
    console.log("sdsd")
    this.router.navigateByUrl('student-leave-list');

  }
  ngOnDestory() {
    if (this.addLeaveSubscribe !== undefined) {
      this.addLeaveSubscribe.unsubscribe();
    }
  
  }

}
