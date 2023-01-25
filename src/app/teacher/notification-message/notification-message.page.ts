import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Storage } from '@ionic/storage';
import { CommonUtils } from 'src/app/services/common-utils/common-utils';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-notification-message',
  templateUrl: './notification-message.page.html',
  styleUrls: ['./notification-message.page.scss'],
})
export class NotificationMessagePage implements OnInit {
  selectedCar: number;
  message: string;
  model:any={};
  private getTemplateSubscribe: Subscription;
  private getTemplateByIdSubscribe: Subscription;
  template: any;
  recipientList = [{ 'name': 'Father Mob.number' }, { 'name': 'Mother Mob.number' }, { 'name': 'Student Mob.number' }]
  recipient: any;
  storeData: any;
  constructor(private http: HttpClient, private router: Router, private commonUtils: CommonUtils) { }

  ngOnInit() {
    // console.log('student',this.storeData.student);

    this.storeData = JSON.parse(localStorage.getItem('studentNotfication'))
    this.getTemplate(this.storeData.type);
  }
  ionViewWillEnter() {
    console.log('student',this.storeData.student);
    
    this.storeData = JSON.parse(localStorage.getItem('studentNotfication'))
    this.getTemplate(this.storeData.type);
  }
  getTemplate(type) {
    let get_template_url = 'getsmstemplate?app=' + type.app + '&sms=' + type.sms;
    this.getTemplateSubscribe = this.http.get(get_template_url).subscribe(
      (res: any) => {
        if (res.return_status == 1) {
          this.template = res.return_data.template_data;
          console.log(this.template)
          // this.divisionlist = res.return_data.division_data;
        }

      }
    );
  }

  getTemplateById(val) {
    console.log(val);
    if (val) {
      let get_template_by_url = 'getsmstemplate/' + val
      this.getTemplateByIdSubscribe = this.http.get(get_template_by_url).subscribe(
        (res: any) => {
          if (res.return_status == 1) {
            this.message = res.return_data.template_data.template;
            console.log(res.return_data.template_data)
            // this.divisionlist = res.return_data.division_data;
          }

        }
      );
    }
    else {
      this.message = '';

    }
  }
  
  onSubmit(_form) {
    console.log('form Data', _form.value, this.storeData.type);
    if (this.storeData.type.sms == true) {
      if (!_form.value.template_id) {
        this.commonUtils.presentToast('error', 'Template is Required');
        return;
      }
    }
    // get form value
    let fd = new FormData();
    for (let val in _form.value) {
      if (_form.value[val] == undefined) {
        _form.value[val] = '';
      }

      fd.append(val, _form.value[val]);
      console.log(fd);


    };
    if (this.storeData.type.sms === true) {
      fd.append('sent_to', 'sms');
    }
    if (this.storeData.type.app === true) {
      fd.append('sent_to', 'app');
    }
    fd.append('student_id', this.storeData.student);
    console.log(this.storeData.type);

    let send_template_by_url = 'sendnotification'
    this.getTemplateByIdSubscribe = this.http.post(send_template_by_url, fd).subscribe(
      (res: any) => {
        if (res.return_status == 1) {
        this.commonUtils.presentToast('success', res.return_message);
        this.router.navigateByUrl('/dashboard');

         
        }

      }
    );


  }
  backspace()
  {
    console.log('hello');
    
    this.router.navigateByUrl('/notification-save');

  }
  ngOnDestory() {
    if (this.getTemplateSubscribe !== undefined) {
      this.getTemplateSubscribe.unsubscribe();
    }
    if (this.getTemplateByIdSubscribe !== undefined) {
      this.getTemplateByIdSubscribe.unsubscribe();
    }
  }

}
