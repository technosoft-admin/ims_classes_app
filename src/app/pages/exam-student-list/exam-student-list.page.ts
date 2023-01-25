import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { present } from '@ionic/core/dist/types/utils/overlays';
import { element } from 'protractor';
import { Subscription } from 'rxjs';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-exam-student-list',
  templateUrl: './exam-student-list.page.html',
  styleUrls: ['./exam-student-list.page.scss'],
})
export class ExamStudentListPage implements OnInit {
  sub: any = {};
  @Input() getData: string;
  tab: any;
  all: any;
  divA: any;
  divB: any;
  list: any;
  click_modal: boolean = false;
  private getDivisionSubscribe: Subscription;
  private studentListSubscribe: Subscription;
  private studentExamMarkSubscribe: Subscription;
  private getGradeSubscribe: Subscription;
  private examStudentSubscribe: Subscription;
  student_list_url: string;
  file_url = environment.fileUrl;
  divisionlist: any;
  gradelist: any;
  range: any;
  listData: any;
  sms: boolean;
  app: boolean;
  div: string;
  selectall: boolean;
  model: any = {}
  getSubject: any;
  modal: any = {};
  model1 = [[]]
  examId: any;
  requiredData: any[];
  editExamMarkData: any;
  // allComplete = false;

  constructor(private AlertCtrl: AlertController, private http: HttpClient, private router: Router, private commonUtils: CommonUtils, private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.div = this.activatedRoute.snapshot.paramMap.get('div');
    this.sms = false;
    this.app = true;
    this.selectall = false
    console.log('subjectList', JSON.parse(localStorage.getItem('examData')));
    let subject = JSON.parse(localStorage.getItem('examData'))
    this.getSubject = subject?.subjectList;
    this.examId = subject?.examId;

    console.log("getSubject Data....", this.examId);

    this.getStudentData(this.div)
    this.getDivision(this.div);
    this.getGrade();
  }

  ionViewWillEnter() {
    this.selectall = false
    this.div = this.activatedRoute.snapshot.paramMap.get('div');
    this.tab = this.div;
    let subject = JSON.parse(localStorage.getItem('examData'))
    this.getSubject = subject?.subjectList
    this.examId = subject?.examId;
    console.log('div', this.div, this.tab);
    this.getStudentData(this.div)
    this.getDivision(this.div);
    this.getGrade();

  }

  ///////////Validation Check//////////
  checkVal(event, max, min, _idcardno, _subjectName) {
    console.log();

    let msg = _subjectName + " is Max Mark " + max + " & Min Mark " + min;
    let p = 1;
    if (event.target.value == 'AB') {
      p = 0
    }
    else {
      if (event.target.value.replace(/[^0-9.]*/g, '') == event.target.value) {
        if (parseFloat(event.target.value) <= parseFloat(max) && parseFloat('0') <= parseFloat(event.target.value)) {
          p = 0
        }
      }
      else {
        msg = 'Special Characters Not Allowed Only Allow AB And Dot(.)'
      }
    }
    // console.log("p", p)

    this.list.forEach(element => {
      if (element.id_card_no == _idcardno) {
        if (p == 1) {
          element[_subjectName] = '';
          this.commonUtils.presentToast('error', msg);

        }
        else {
          element[_subjectName] = event.target.value

        }
      }
    });
  }

  onClick(check) {
    this.ngOnInit();
    document.querySelector('ion-searchbar').getInputElement().then((searchInput) => {
      console.log(searchInput.value);

      searchInput.value = '';
    });
    this.model.search = null;
    this.getStudentData(check)
  }


  getStudentData(id) {
    let arrayData = []

    this.getSubject.forEach(element => {
      if (element.openData == true)
        arrayData.push(element.id)
    })
    this.getExamDivExamSub(this.div, this.examId, arrayData.toString())
    this.student_list_url = 'getstudentbydivisionid/' + id;

    this.studentListSubscribe = this.http.get(this.student_list_url).subscribe(
      (res: any) => {
        if (res.return_status == 1) {
          console.log('getstudent', res.return_data.student_data);

          let list = res.return_data.student_data;
          this.list = list;
          //////// Add Subject In Object
          let type = 'add1'
          if (type == 'add') {
            this.list.forEach(element => {
              this.getSubject.forEach(element1 => {
                element[element1.type] = ""
              })
            });
            this.listData = list;
          }
          else {

            this.list.forEach(element => {
              this.getSubject.forEach(element1 => {
                if (this.editExamMarkData.length != 0) {
                  this.editExamMarkData.forEach(edit => {
                    if (edit.id_card_no == element.id_card_no) {
                      if (edit.subject_id == element1.id) {
                        if (element1.marking_scheme === "Marks System") {
                          element[element1.type] = edit.obtain_marks
                          // element[element1.type] = '5'
                          if (parseFloat(edit.obtain_marks) <= parseFloat(element1.max) && parseFloat('0') <= parseFloat(edit.obtain_marks)) {
                            element[element1.type] = edit.obtain_marks
                            // element[element1.type] = '5'

                          }
                          else {
                            element[element1.type] = ''

                            if (edit.obtain_marks == 'AB') {
                              element[element1.type] = edit.obtain_marks
                            }
                          }
                        }
                        else {
                          element[element1.type] = edit.obtain_grade_id
                        }

                      }

                      if (element1.openData == false) {
                        element[element1.type] = ''
                      }
                    }
                  });
                }
                else {
                  element[element1.type] = ""
                }


              });

            });
            console.log('list', this.getSubject)
            this.listData = list;

          }
        }

      },
      errRes => {
        console.log('DASHBOARD CHART COLOR => ', errRes);
      }
    );
  }

  onSubmit() {
    let p = 1;
    this.requiredData = []


    this.listData.forEach(element => {
      let subjectName = []
      this.getSubject.forEach(element1 => {
        if (element[element1.type] == "") {
          subjectName.push(element1.type)
          p = 0;
        }
      })
      if (subjectName.length != 0)
        this.requiredData.push({ 'name': element.full_name, 'subject': subjectName.toString() });

    });

    if (p == 0) {
      this.click_modal = true;
      this.commonUtils.presentToast('error', 'All Subject Mark Is Required');
      return;
    }




    this.getSubject.forEach(subject => {
      let shortData = []
      if (subject.marking_scheme == "Marks System") {
        this.listData.forEach(list => {
          shortData.push({ 'id_card_no': list.id_card_no, 'mark': list[subject.type], 'type': subject.type })

        });
        let sortedBuilds = shortData.sort((n1, n2) => (parseFloat(n1.mark) > parseFloat(n2.mark)) ? -1 : 1);
        console.log(subject.type,sortedBuilds);
        
        //////////////////Rank Add/////////////
        let rank = 1;
        for (let k = 0; k < sortedBuilds.length; k++) {
          if (k > 0 && parseFloat(sortedBuilds[k].mark) < parseFloat(sortedBuilds[k - 1].mark)) {
            rank++;
          }
          this.listData.forEach(list => {
            if (list.id_card_no == sortedBuilds[k].id_card_no) {
              list[subject.type + "_rank"] = rank;
            }

          });

        }
      }
    });
    console.log(this.listData);
    
    let postData = { 'examData': JSON.stringify(this.listData), 'examId': this.examId, 'subject': JSON.stringify(this.getSubject) }

    this.examStudentSubscribe = this.http.post('exam/addmark', postData).subscribe(
      (res: any) => {
        if (res.return_status == 1) {
          localStorage.removeItem('examData');
          this.commonUtils.presentToast('success', res.return_message);
          //  this.router.navigateByUrl('dashboard');

        }

      },
      errRes => {
        console.log('DASHBOARD CHART COLOR => ', errRes);
        this.commonUtils.presentToast('error', 'Exam Mark Add UnsuccesFully');

      }
    );

  }

  getExamDivExamSub(div, exam, subject) {
    let url = "exam/check-div-exam-subject"
    let fd = new FormData();

    fd.append('div', div);
    fd.append('exam', exam);
    fd.append('subject', subject);
    this.studentExamMarkSubscribe = this.http.post(url, fd).subscribe(
      (res: any) => {
        if (res.return_status == 1) {
          console.log('getstudent', res.return_data);
          this.editExamMarkData = res.return_data.exammark
          // let list = res.return_data.student_data;
          // this.list = list;
          // //////// Add Subject In Object

          // this.list.forEach(element => {
          //   this.getSubject.forEach(element1 => {
          //     element[element1.type] = ""
          //   })
          // });
          // this.listData = list;
        }

      },
      errRes => {
        console.log('DASHBOARD CHART COLOR => ', errRes);
      }
    );
  }


  getDivision(div) {
    let get_division_url = 'getdivisionbyid/' + this.div;
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

  clickedOut() {
    this.click_modal = false;
    console.log('this.click_modal', this.click_modal);

  }

  getGrade() {
    let get_division_url = 'getgrade';
    this.getGradeSubscribe = this.http.get(get_division_url).subscribe(
      (res: any) => {
        if (res.return_status == 1) {
          this.gradelist = res.return_data.grade;
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

  onChecked(val, div) {
    console.log(val);

    console.log(this.app, this.sms);
    if (div == 'SMS') {
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
    if (this.getGradeSubscribe !== undefined) {
      this.getGradeSubscribe.unsubscribe();
    }
    if (this.studentExamMarkSubscribe !== undefined) {
      this.studentExamMarkSubscribe.unsubscribe();
    }

  }


}
