import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';
import { AuthLoginService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.page.html',
  styleUrls: ['./exam-list.page.scss'],
})
export class ExamListPage implements OnInit {

  @Input() getData: string;
  tab: any;
  all: any;
  divA: any;
  divB: any;
  list: any;
  private getDivisionSubscribe: Subscription;
  private examListSubscribe: Subscription;
  private checkMarkExamClassDivSubscribe: Subscription;
  private getSubjectSubscribe:Subscription
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
  subjectlistCount: any;

  user_type: any;

  // allComplete = false;

  constructor( private authService: AuthLoginService,private http: HttpClient, private router: Router, private commonUtils: CommonUtils,private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    let get_global_params = this.authService.getTokenSessionMaster();
    this.user_type=get_global_params.user.user_type;
    console.log(this.user_type);
    
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    this.sms = false;
    this.app = true;
    this.selectall=false
    this.getExamData()
    if(this.user_type=='teacher')
    {
    this.getDivision();
    }
  }
  
  ionViewWillEnter() {
    this.selectall=false
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    console.log('type',this.type);
    this.tab = 0;
    
    this.getExamData()
    this.getDivision();

  }


  onClick(check,div) {

   this.model.search=null;
    this.tab = check;
    // this.getExamData(check)
    this.listData.forEach(element => {
      element.complete=""
    })
    console.log(check,div);
    this.subjectlistCount=''
    this.getSubject(check,div) 
    
    
    
  }

  getSubject(classid,id) {
    let get_subject_url = 'subjectgetid/'+id
    this.getSubjectSubscribe = this.http.get(get_subject_url).subscribe(
      (res: any) => {
        if (res.return_status == 1) {
    this.completeCheckExam(classid,id);

          this.subjectlistCount = res.return_data.length;
          // this.examMarkCheck();
        }

      },
      errRes => {
        console.log('DASHBOARD CHART COLOR => ', errRes);
      }
    );
  }

  completeCheckExam(classid,div)
  {
    let fd = new FormData();
    fd.append('div',div);
    fd.append('class',classid);
    this.checkMarkExamClassDivSubscribe = this.http.post('exam/complete/check',fd).subscribe(
      (res: any) => {
        if (res.return_status == 1) {
          let editExamData=res.return_data.exammark.count
       
            editExamData.forEach(editCount => {
              this.listData.forEach(list => {  
              if(list.id==editCount.exam_id)
              {
               console.log('this.subjectlistCount',this.subjectlistCount,editCount.count,list.id);

                if(this.subjectlistCount==editCount.count)
                {
                list.complete="active-item-bgcolor"
                }
              }
              });
            });
            console.log(this.listData,'listData')
          
        }

      },
      errRes => {
        console.log('DASHBOARD CHART COLOR => ', errRes);

      }
    );
  }

  getExamData() {
    this.student_list_url = 'exam';
    this.examListSubscribe = this.http.get(this.student_list_url).subscribe(
      (res: any) => {
        if (res.return_status == 1) {
          console.log('getexam', res.return_data.exam);
          let list = res.return_data.exam;
          list.forEach(element => {
            element.complete=""
          });
          this.list = list;
          this.listData = list;
        }

      },
      errRes => {
        console.log('DASHBOARD CHART COLOR => ', errRes);
      }
    );
  }
  
  onSubmit(examId) {
    if(this.user_type==='teacher')
    {
      this.router.navigateByUrl('/exam-subject-list/'+examId+"/"+this.tab);
    }
    else
    {
      this.router.navigateByUrl('/student-exam-result/'+examId);

    }
  }



  getDivision() {
    let get_division_url = 'getdivision'
    this.getDivisionSubscribe = this.http.get(get_division_url).subscribe(
      (res: any) => {
        if (res.return_status == 1) {
          this.divisionlist = res.return_data.division_data;
        }
        this.tab= this.divisionlist[0].id
        this.getSubject(this.divisionlist[0].classmodel.id,this.tab) 
        // this.completeCheckExam( this.divisionlist[0].classmodel.id,this.tab)
      },
      errRes => {
        console.log('DASHBOARD CHART COLOR => ', errRes);
      }
    );
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
    if (this.examListSubscribe !== undefined) {
      this.examListSubscribe.unsubscribe();
    }
    if (this.getDivisionSubscribe !== undefined) {
      this.getDivisionSubscribe.unsubscribe();
    }
    if (this.checkMarkExamClassDivSubscribe !== undefined) {
      this.checkMarkExamClassDivSubscribe.unsubscribe();
    }
    if (this.getSubjectSubscribe !== undefined) {
      this.checkMarkExamClassDivSubscribe.unsubscribe();
    }
  }

}
