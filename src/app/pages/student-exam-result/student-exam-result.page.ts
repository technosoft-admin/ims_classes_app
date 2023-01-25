import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';
import { AuthLoginService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-student-exam-result',
  templateUrl: './student-exam-result.page.html',
  styleUrls: ['./student-exam-result.page.scss'],
})
export class StudentExamResultPage implements OnInit {


  tab : any;
  all : any;
  general : any;
  attendance : any;
  libary : any;
  list : any[];

  load = false;
private getExamMark: Subscription;
  exam_id: string;
  constructor(private http: HttpClient,private activatedRoute: ActivatedRoute,private authService: AuthLoginService) { }

  ngOnInit() {
    let get_global_params = this.authService.getTokenSessionMaster();
    console.log('get_global_params',get_global_params);
    

    this.exam_id = this.activatedRoute.snapshot.paramMap.get('exam_id');
    this.getExamMarkIdcardno(this.exam_id,100010012)
   
  }
  // onLoader(){
  //   this.load = true;
  //   console.log('this.load1', this.load);
  //   setTimeout(()=>{
  //     this.load = false;
  //   }, 1000);

  //   console.log('this.load2', this.load);
    
  // }

  ionViewWillEnter() {
    this.tab='all';
  }
  onClick(check){
    //    console.log(check);
      
    }

    getExamMarkIdcardno(examid,id_card_no) {
      let get_subject_url = 'getexammark/'+examid+"/"+id_card_no
      this.getExamMark = this.http.get(get_subject_url).subscribe(
        (res: any) => {
          if (res.return_status == 1) {
            let i=1;
            let data=res.return_data.exammark;
       
            console.log('data',data);
            
            this.list = data;
          }
  
        },
        errRes => {
          console.log('DASHBOARD CHART COLOR => ', errRes);
        }
      );
    }
    ngOnDestory() {
      if (this.getExamMark !== undefined) {
        this.getExamMark.unsubscribe();
      }
      
    }

}
