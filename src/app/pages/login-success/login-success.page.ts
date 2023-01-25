import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-success',
  templateUrl: './login-success.page.html',
  styleUrls: ['./login-success.page.scss'],
})
export class LoginSuccessPage implements OnInit {

  centered = false;

  radius: number;
  color: string;
  id_card_no: any;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id_card_no = this.activatedRoute.snapshot.paramMap.get('id');

  }

}
