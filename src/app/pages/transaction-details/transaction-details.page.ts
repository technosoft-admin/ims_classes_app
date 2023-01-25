import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.page.html',
  styleUrls: ['./transaction-details.page.scss'],
})
export class TransactionDetailsPage implements OnInit {

  centered = false;

  radius: number;
  color: string;

  constructor() { }

  ngOnInit() {
  }

}
