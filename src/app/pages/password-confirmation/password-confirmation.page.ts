import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-confirmation',
  templateUrl: './password-confirmation.page.html',
  styleUrls: ['./password-confirmation.page.scss'],
})
export class PasswordConfirmationPage implements OnInit {
  id_card_no: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id_card_no = this.activatedRoute.snapshot.paramMap.get('id');

  }

}
