import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Subscription } from 'rxjs';
import { Storage } from '@ionic/storage';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';
import { NgForm } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { present } from '@ionic/core/dist/types/utils/overlays';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-result-preparation',
  templateUrl: './result-preparation.page.html',
  styleUrls: ['./result-preparation.page.scss'],
})
export class ResultPreparationPage implements OnInit {

  selectedCar: number;
  message: string;
  private getExamSubscribe: Subscription;
  private getClassSubscribe: Subscription;
  private editExamMarkSubscribe: Subscription;
  private getDivisionSubscribe: Subscription;
  exam: any;
  model: any = {};
  recipientList = [{ 'name': 'Father Mob.number' }, { 'name': 'Mother Mob.number' }, { 'name': 'Student Mob.number' }]
  recipient: any;
  storeData: any;
  myFiles:string [] = [];
  length: any;
  vlength: number;
  myFilesVideo:string [] = [];homeworkId: number;
  homeworkList: any;
  homeworkListData: [];
  type: string;
  subject_class:boolean=false;
  file_url = environment.fileUrl;
  videoData: any=[];
  imageData: any=[];  
  removeFile:any =[];
  imagesedit: any=[];
  videoedit: any=[];
  classData: any;
  division: any;
  constructor(
    private http: HttpClient, 
    private router: Router, 
    private commonUtils: CommonUtils,
    private activatedRoute: ActivatedRoute,
  
    ) { }

  ngOnInit() {
    this.getExam();
    // this.getClass();

  }



  ionViewWillEnter() 
  {    
    this.getExam();
    // this.getClass();
  }
 
  getExam()
  {
    let exam_url = 'exam'
    this.getExamSubscribe = this.http.get(exam_url).subscribe(
      (res: any) => {
        if (res.return_status === 1) {
         this.exam=res.return_data.exam;  
        }
      }
    );
  }

  onClass(exam_id) {
    this.model.class_id="";
    this.model.division_id="";
    this.division=[]
    let url = 'getmark/class/'+exam_id
    this.getClassSubscribe = this.http.get(url).subscribe(
      (res: any) => {
        if (res.return_status === 1) {
         this.classData=res.return_data;  
        }
      }
    );
  }
  onDivision(class_id)
  {
    console.log(class_id)
    this.model.division_id=""
    let fd = new FormData();
    let data=class_id
    fd.append('id', data.toString());
    let url = 'getDivisionbyid'
    this.getDivisionSubscribe = this.http.post(url,fd).subscribe(
      (res: any) => {
        if (res.return_status === 1) {
         this.division=res.return_data;  
        }
      }
    );

  }




  onSelectFile(event) {
   
      let fileData=event.target.files;
      for (let i = 0; i < fileData.length; i++) {
      let file = event.target.files && event.target.files[i];

    }
  }
// -------Submit Form Start------
  onSubmit(_form: NgForm){
    console.log(_form.value);
    // return "hello";
    let fd = new FormData();
    for (let val in _form.value) {
      if(_form.value[val] == undefined){
        _form.value[val] = '';
      }
    fd.append(val, _form.value[val]);
  };

  this.editExamMarkSubscribe = this.http.post('examMarkShort',fd).subscribe(
    (res: any) => {
      if (res.return_status === 1) {
      //  this.exam=res.return_data;  
        // this.router.navigateByUrl('/home-work');
      }
    }
  );

  _form.reset();

  }
// -------Submit Form End------

  ngOnDestory() {
    if (this.getExamSubscribe !== undefined) {
      this.getExamSubscribe.unsubscribe();
    }
    if (this.getClassSubscribe !== undefined) {
      this.getClassSubscribe.unsubscribe();
    }
    if (this.editExamMarkSubscribe !== undefined) {
      this.editExamMarkSubscribe.unsubscribe();
    }
    if (this.getDivisionSubscribe !== undefined) {
      this.getDivisionSubscribe.unsubscribe();
    }
  }
////////////////////VIDEO AND IMAGE UPLOAD////




}
