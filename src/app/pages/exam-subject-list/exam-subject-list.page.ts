import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';
import { Breakpoints } from '@angular/cdk/layout';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-exam-subject-list',
  templateUrl: './exam-subject-list.page.html',
  styleUrls: ['./exam-subject-list.page.scss'],
})
export class ExamSubjectListPage implements OnInit {


  @Input() getData: string;
  tab: any;
  all: any;
  divA: any;
  divB: any;
  list: any;
  private getSubjectSubscribe: Subscription;
  private studentListSubscribe: Subscription;
  private getHomeWorkIdSubscribe: Subscription;
  private examMarkCheckSubscribe:Subscription;

  student_list_url: string;
  file_url = environment.fileUrl;
  subjectlist: any;
  range: any;
  listData: any;
  sms: boolean;
  app: boolean;
  divisionId: any;
  classId: any;
  id: any;
  homeworkList: any;
  homeworkListData: any;
  model: any = [];
  checkStudentData: any = [];
  subLength:any = [];
  check: boolean = false;
  maxData: any;
  minData: any;
  systemData: any;
  showhide: boolean = false;
  // model: any = {};
  step = 0;
  div: string;
  examId: string;
  examMark: any;
  // allComplete = false;

  constructor(private http: HttpClient, private router: Router, private commonUtils: CommonUtils, private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.maxData="";
    this.minData="";
    this.systemData="";
    this.div=this.activatedRoute.snapshot.paramMap.get('div');
    this.examId=this.activatedRoute.snapshot.paramMap.get('exam');

    this.getSubject(this.div);
    this.model = { search: null,checked:false };
    this.checkStudentData=[];
    // this.id = this.activatedRoute.snapshot.paramMap.get('div');
    this.sms = false;
    this.app = true;
   this.check = true;
    console.log('type', this.app, this.sms)
    
  }
  ionViewWillEnter() {
    this.checkStudentData=[]
    this.sms = false;
    this.app = true;
    this.model = { search: null,checked:false };
    this.div=this.activatedRoute.snapshot.paramMap.get('div');
    this.tab = this.divisionId;
    this.getSubject(this.div);
    console.log(this.app, this.sms)
  }

  setStep(index: number){
    console.log(index);
    
    this.step = index;
  }

  showData(_evant){
    console.log("Show Data....", _evant);
    if(_evant == true){
      this.showhide = true;
    }
    else{
      this.showhide = false;
    }
    
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

  examMarkCheck()
  {
     let checkExamId='exam/check-div-exam/'+this.examId+'/'+this.div
     this.examMark=[]
    this.examMarkCheckSubscribe = this.http.get(checkExamId).subscribe(
      (res: any) => {
        if (res.return_status == 1) {
          this.examMark=res.return_data.exammark;
            this.subjectlist.forEach(element => {
              this.examMark.forEach(element1 => {
                if(element.id==element1.subject_id)
                {
                  element.isDone=true;
                  element.open=true
                  element.max=parseInt(element1.max_marks)
                  element.min=element1.min_marks
                  if(element1.obtain_grade_id==null)
                  {
                    element.marking_scheme ="Marks System";
                  }
                  else
                  {
                    element.marking_scheme ="Grading System";

                  }
                }
            });
         });
         console.log('this.subjectlist',this.subjectlist)
        }

      },
      errRes => {
        console.log('DASHBOARD CHART COLOR => ', errRes);
      }
    );
  }
  
  onSubmit(_form: NgForm) {
    let p=0,count=0;
    console.log(_form.value,_form)
    // get form value
    let subjectData=[]
          let fd = new FormData();
          for (let val in _form.value) {
            if(_form.value[val] == undefined){
              _form.value[val] = '';
            }
            else
            {
            fd.append(val, _form.value[val]);
            }
          };
          for (let i = 0; i < this.subjectlist.length; i++) {
          if( _form.value['isDone'+(i+1)]==true)
          {
            if(_form.value['max'+(i+1)]=='' || _form.value['min'+(i+1)]==''|| _form.value['marking_scheme'+(i+1)]=='')
            {
              p=1;
              break;
            }
          }
          else
          {
            count++;
          }
          };
          console.log('p',p)
          if(this.subjectlist.length==count)
          {
            this.commonUtils.presentToast('error', 'One Subject Is Required');
            return; 
          }
          if(p==1)
          {
            this.commonUtils.presentToast('error', 'Checked Field Is Required');
            return;
          }
          for (let i = 0; i < this.subjectlist.length; i++) {
            // console.log(this.subjectlist);
            
              if(_form.value['isDone'+(i+1)]==true)
              {

                let data={id:this.subjectlist[i].id,type:this.subjectlist[i].subject_name,max:_form.value['max'+(i+1)],min:_form.value['min'+(i+1)],marking_scheme:_form.value['marking_scheme'+(i+1)],openData:false}
                if(this.subjectlist[i].open==true)
                {
                  data={id:this.subjectlist[i].id,type:this.subjectlist[i].subject_name,max:_form.value['max'+(i+1)],min:_form.value['min'+(i+1)],marking_scheme:_form.value['marking_scheme'+(i+1)],openData:true}
                }
                subjectData.push(data)
              }
          }
          // console.log('subjectData',subjectData)
          localStorage.setItem('examData', JSON.stringify({'subjectList':subjectData,'examId':this.examId}));
          this.router.navigateByUrl('/exam-student-list/'+this.div);
          
        

  }

  subjectSelect(event, id) {
    console.log("subject Select Data...", event.target.checked,id);
    if (event.target.checked == true) {
      // this.showhide = true;
      console.log("Show Hide Data", this.showhide);
    }
    else{
      // this.showhide = false;
      console.log("Show Hide Data12", this.showhide);
    }

  }
  
  setData(event,type,id)
  {
    console.log(event.target.value,type,id)
    if(type=='max')
    {
      this.maxData=event.target.value
    }
    if(type=='min')
    {
      this.minData=event.target.value
    }
    if(type=='system')
    {
      this.systemData=event.target.value
    }
    this.subLength.forEach(element => {
      if(element.id==id)
      {
        if(type=='max')
        {
          element.max=this.maxData;
        }
        if(type=='min')
        {
          element.min=this.minData;
        }
        if(type=='system')
        {
          element.system=this.systemData;
        }
      }
    });
    console.log(this.subLength);
    

  }

  getSubject(id) {
    let get_subject_url = 'subjectgetid/'+id
    this.getSubjectSubscribe = this.http.get(get_subject_url).subscribe(
      (res: any) => {
        if (res.return_status == 1) {
          this.subjectlist = res.return_data;
          this.examMarkCheck();
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

 
}
