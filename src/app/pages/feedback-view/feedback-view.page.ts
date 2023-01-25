import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback-view',
  templateUrl: './feedback-view.page.html',
  styleUrls: ['./feedback-view.page.scss'],
})
export class FeedbackViewPage implements OnInit {

reviewquestion=[
  {'id':1,'question':'i) How the Subject contents are covered by teacher?'},
  {'id':2,'question':'ii) How clearly the concepts are taught by teacher?'},
  {'id':3,'question':'iii) How would you rate the teaching for application of concepts for solving questions?'},
  {'id':4,'question':'iv) How would you rate the teaching speed?'},
  {'id':5,'question':'v) What do you expect about teaching speed from the teacher?'},
  {'id':6,'question':'vi) How encouraging do you feel to ask your difficulties to the teacher?'},
  {'id':7,'question':'vii) How would you rate the solutions provided to your doubts and difficulties?'},
  {'id':8,'question':'viii) How would you rate quality of the questions asked in Test Papers?'},
  {'id':9,'question':'ix) How would you rate the Test Question Paper Explanation?'},
  {'id':10,'question':'x) How does the lecture duration match to your expectation?'},
  {'id':11,'question':'xi) How would you rate the punctuality of the teacher?'},
  {'id':12,'question':'xii) How would you rate the Notes provided to you?'},
  {'id':13,'question':'xiii) How efficiently & interactively do the teacher engages all students in online class?'},
  {'id':14,'question':'xiv) Do you think that your teacher works hard to improve your result?'},
  {'id':15,'question':'xv) How would you overall rate the teacher in all aspect?'},

];
shortquestion=[
    {'id':1,'squestion' : 'xvi) While asking doubts do you feel pressurised or insulting by the behavior or comments by the teacher?'},
    {'id':1,'squestion' : 'xvii) Is the TEACHER Personally in contact with you on Social Media/Mobile?'},
    {'id':1,'squestion' : 'xviii) Does the teacher give wrong or negative comments about other Teachers OR Other Institutes?'},
    {'id':1,'squestion' : 'xix) Does the teacher use foul language or bad words during lecture or doubt session?'},
    {'id':1,'squestion' : 'xx) Does the teacher use mobile phone in classroom?'},
  ];
  constructor() { }
  check1_1;
  check1_2;
  check1_3;
  check1_4;
  check1_5;
  check1_6;
  check1_7;
  check1_8;
  check1_9;
  check1_10;
  check1_11;
  check1_12;
  check1_13;
  check1_14;
  check1_15;

  check2_1;
  check2_2;
  check2_3;
  check2_4;
  check2_5;
  check2_6;
  check2_7;
  check2_8;
  check2_9;
  check2_10;
  check2_11;
  check2_12;
  check2_13;
  check2_14;
  check2_15;

  rating1_1;
  rating1_2;
  rating1_3;
  rating1_4;
  rating1_5;
  rating1_6;
  rating1_7;
  rating1_8;
  rating1_9;
  rating1_10;
  rating1_11;
  rating1_12;
  rating1_13;
  rating1_14;
  rating1_15;

  rating2_1;
  rating2_2;
  rating2_3;
  rating2_4;
  rating2_5;
  rating2_6;
  rating2_7;
  rating2_8;
  rating2_9;
  rating2_10;
  rating2_11;
  rating2_12;
  rating2_13;
  rating2_14;
  rating2_15;
  onClick1_1(__value)
  {

    this.rating1_1 = __value;
    console.log('star>>>',this.rating1_1);
    if(this.rating1_1 == 1 || this.rating1_1 == 2 )
    {
      this.check1_1="Less";
      console.log('first',this.rating1_1);
      
    }
    else if(this.rating1_1 == 3 || this.rating1_1 == 4)
    {
      this.check1_1="Good";
    }
    else if(this.rating1_1 == 5 || this.rating1_1 == 6)
    {
      this.check1_1="Better";
    }
    else if(this.rating1_1 == 7 || this.rating1_1 == 8)
    {
      this.check1_1="Best";
    }
    else if(this.rating1_1 == 9 || this.rating1_1 == 10)
    {
      this.check1_1="Excellent";
    }
  }
  onClick1_2(__value)
  {

    this.rating1_2 = __value;
    console.log('star>>>',this.rating1_2);
    if(this.rating1_2 == 1 || this.rating1_2 == 2 )
    {
      this.check1_2="Less";
      console.log('first',this.rating1_2);
      
    }
    else if(this.rating1_2 == 3 || this.rating1_2 == 4)
    {
      this.check1_2="Good";
    }
    else if(this.rating1_2 == 5 || this.rating1_2 == 6)
    {
      this.check1_2="Better";
    }
    else if(this.rating1_2 == 7 || this.rating1_2 == 8)
    {
      this.check1_2="Best";
    }
    else if(this.rating1_2 == 9 || this.rating1_2 == 10)
    {
      this.check1_2="Excellent";
    }
  }
  onClick1_3(__value)
  {

    this.rating1_3 = __value;
    console.log('star>>>',this.rating1_3);
    if(this.rating1_3 == 1 || this.rating1_3 == 2 )
    {
      this.check1_3="Less";
      console.log('first',this.rating1_3);
      
    }
    else if(this.rating1_3 == 3 || this.rating1_3 == 4)
    {
      this.check1_3="Good";
    }
    else if(this.rating1_3 == 5 || this.rating1_3 == 6)
    {
      this.check1_3="Better";
    }
    else if(this.rating1_3 == 7 || this.rating1_3 == 8)
    {
      this.check1_3="Best";
    }
    else if(this.rating1_3 == 9 || this.rating1_3 == 10)
    {
      this.check1_3="Excellent";
    }
  }onClick1_4(__value)
  {

    this.rating1_4 = __value;
    console.log('star>>>',this.rating1_4);
    if(this.rating1_4 == 1 || this.rating1_4 == 2 )
    {
      this.check1_4="Less";
      console.log('first',this.rating1_4);
      
    }
    else if(this.rating1_4 == 3 || this.rating1_4 == 4)
    {
      this.check1_4="Good";
    }
    else if(this.rating1_4 == 5 || this.rating1_4 == 6)
    {
      this.check1_4="Better";
    }
    else if(this.rating1_4 == 7 || this.rating1_4 == 8)
    {
      this.check1_4="Best";
    }
    else if(this.rating1_4 == 9 || this.rating1_4 == 10)
    {
      this.check1_4="Excellent";
    }
  }onClick1_5(__value)
  {

    this.rating1_5 = __value;
    console.log('star>>>',this.rating1_5);
    if(this.rating1_5 == 1 || this.rating1_5 == 2 )
    {
      this.check1_5="Less";
      console.log('first',this.rating1_5);
      
    }
    else if(this.rating1_5 == 3 || this.rating1_5 == 4)
    {
      this.check1_5="Good";
    }
    else if(this.rating1_5 == 5 || this.rating1_5 == 6)
    {
      this.check1_5="Better";
    }
    else if(this.rating1_5 == 7 || this.rating1_5 == 8)
    {
      this.check1_5="Best";
    }
    else if(this.rating1_5 == 9 || this.rating1_5 == 10)
    {
      this.check1_5="Excellent";
    }
  }onClick1_6(__value)
  {

    this.rating1_6 = __value;
    console.log('star>>>',this.rating1_6);
    if(this.rating1_6 == 1 || this.rating1_6 == 2 )
    {
      this.check1_6="Less";
      console.log('first',this.rating1_6);
      
    }
    else if(this.rating1_6 == 3 || this.rating1_6 == 4)
    {
      this.check1_6="Good";
    }
    else if(this.rating1_6 == 5 || this.rating1_6 == 6)
    {
      this.check1_6="Better";
    }
    else if(this.rating1_6 == 7 || this.rating1_6 == 8)
    {
      this.check1_6="Best";
    }
    else if(this.rating1_6 == 9 || this.rating1_6 == 10)
    {
      this.check1_6="Excellent";
    }
  }onClick1_7(__value)
  {

    this.rating1_7 = __value;
    console.log('star>>>',this.rating1_7);
    if(this.rating1_7 == 1 || this.rating1_7 == 2 )
    {
      this.check1_7="Less";
      console.log('first',this.rating1_7);
      
    }
    else if(this.rating1_7 == 3 || this.rating1_7 == 4)
    {
      this.check1_7="Good";
    }
    else if(this.rating1_7 == 5 || this.rating1_7 == 6)
    {
      this.check1_7="Better";
    }
    else if(this.rating1_7 == 7 || this.rating1_7 == 8)
    {
      this.check1_7="Best";
    }
    else if(this.rating1_7 == 9 || this.rating1_7 == 10)
    {
      this.check1_7="Excellent";
    }
  }onClick1_8(__value)
  {

    this.rating1_8 = __value;
    console.log('star>>>',this.rating1_8);
    if(this.rating1_8 == 1 || this.rating1_8 == 2 )
    {
      this.check1_8="Less";
      console.log('first',this.rating1_8);
      
    }
    else if(this.rating1_8 == 3 || this.rating1_8 == 4)
    {
      this.check1_8="Good";
    }
    else if(this.rating1_8 == 5 || this.rating1_8 == 6)
    {
      this.check1_8="Better";
    }
    else if(this.rating1_8 == 7 || this.rating1_8 == 8)
    {
      this.check1_8="Best";
    }
    else if(this.rating1_8 == 9 || this.rating1_8 == 10)
    {
      this.check1_8="Excellent";
    }
  }onClick1_9(__value)
  {

    this.rating1_9 = __value;
    console.log('star>>>',this.rating1_9);
    if(this.rating1_9 == 1 || this.rating1_9 == 2 )
    {
      this.check1_9="Less";
      console.log('first',this.rating1_9);
      
    }
    else if(this.rating1_9 == 3 || this.rating1_9 == 4)
    {
      this.check1_9="Good";
    }
    else if(this.rating1_9 == 5 || this.rating1_9 == 6)
    {
      this.check1_9="Better";
    }
    else if(this.rating1_9 == 7 || this.rating1_9 == 8)
    {
      this.check1_9="Best";
    }
    else if(this.rating1_9 == 9 || this.rating1_9 == 10)
    {
      this.check1_9="Excellent";
    }
  }onClick1_10(__value)
  {

    this.rating1_10 = __value;
    console.log('star>>>',this.rating1_10);
    if(this.rating1_10 == 1 || this.rating1_10 == 2 )
    {
      this.check1_10="Less";
      console.log('first',this.rating1_10);
      
    }
    else if(this.rating1_10 == 3 || this.rating1_10 == 4)
    {
      this.check1_10="Good";
    }
    else if(this.rating1_10 == 5 || this.rating1_10 == 6)
    {
      this.check1_10="Better";
    }
    else if(this.rating1_10 == 7 || this.rating1_10 == 8)
    {
      this.check1_10="Best";
    }
    else if(this.rating1_10 == 9 || this.rating1_10 == 10)
    {
      this.check1_10="Excellent";
    }
  }onClick1_11(__value)
  {

    this.rating1_11 = __value;
    console.log('star>>>',this.rating1_11);
    if(this.rating1_11 == 1 || this.rating1_11 == 2 )
    {
      this.check1_11="Less";
      console.log('first',this.rating1_11);
      
    }
    else if(this.rating1_11 == 3 || this.rating1_11 == 4)
    {
      this.check1_11="Good";
    }
    else if(this.rating1_11 == 5 || this.rating1_11 == 6)
    {
      this.check1_11="Better";
    }
    else if(this.rating1_11 == 7 || this.rating1_11 == 8)
    {
      this.check1_11="Best";
    }
    else if(this.rating1_11 == 9 || this.rating1_11 == 10)
    {
      this.check1_11="Excellent";
    }
  }onClick1_12(__value)
  {

    this.rating1_12 = __value;
    console.log('star>>>',this.rating1_12);
    if(this.rating1_12 == 1 || this.rating1_12 == 2 )
    {
      this.check1_12="Less";
      console.log('first',this.rating1_12);
      
    }
    else if(this.rating1_12 == 3 || this.rating1_12 == 4)
    {
      this.check1_12="Good";
    }
    else if(this.rating1_12 == 5 || this.rating1_12 == 6)
    {
      this.check1_12="Better";
    }
    else if(this.rating1_12 == 7 || this.rating1_12 == 8)
    {
      this.check1_12="Best";
    }
    else if(this.rating1_12 == 9 || this.rating1_12 == 10)
    {
      this.check1_12="Excellent";
    }
  }onClick1_13(__value)
  {

    this.rating1_13 = __value;
    console.log('star>>>',this.rating1_13);
    if(this.rating1_13 == 1 || this.rating1_13 == 2 )
    {
      this.check1_13="Less";
      console.log('first',this.rating1_13);
      
    }
    else if(this.rating1_13 == 3 || this.rating1_13 == 4)
    {
      this.check1_13="Good";
    }
    else if(this.rating1_13 == 5 || this.rating1_13 == 6)
    {
      this.check1_13="Better";
    }
    else if(this.rating1_13 == 7 || this.rating1_13 == 8)
    {
      this.check1_13="Best";
    }
    else if(this.rating1_13 == 9 || this.rating1_13 == 10)
    {
      this.check1_13="Excellent";
    }
  }onClick1_14(__value)
  {

    this.rating1_14 = __value;
    console.log('star>>>',this.rating1_14);
    if(this.rating1_14 == 1 || this.rating1_14 == 2 )
    {
      this.check1_14="Less";
      console.log('first',this.rating1_14);
      
    }
    else if(this.rating1_14 == 3 || this.rating1_14 == 4)
    {
      this.check1_14="Good";
    }
    else if(this.rating1_14 == 5 || this.rating1_14 == 6)
    {
      this.check1_14="Better";
    }
    else if(this.rating1_14 == 7 || this.rating1_14 == 8)
    {
      this.check1_14="Best";
    }
    else if(this.rating1_14 == 9 || this.rating1_14 == 10)
    {
      this.check1_14="Excellent";
    }
  }onClick1_15(__value)
  {

    this.rating1_15 = __value;
    console.log('star>>>',this.rating1_15);
    if(this.rating1_15 == 1 || this.rating1_15 == 2 )
    {
      this.check1_15="Less";
      console.log('first',this.rating1_15);
      
    }
    else if(this.rating1_15 == 3 || this.rating1_15 == 4)
    {
      this.check1_15="Good";
    }
    else if(this.rating1_15 == 5 || this.rating1_15 == 6)
    {
      this.check1_15="Better";
    }
    else if(this.rating1_15 == 7 || this.rating1_15 == 8)
    {
      this.check1_15="Best";
    }
    else if(this.rating1_15 == 9 || this.rating1_15 == 10)
    {
      this.check1_15="Excellent";
    }
  }
  onClick2_1(__value)
  {

    this.rating2_1 = __value;
    console.log('star>>>',this.rating2_1);
    if(this.rating2_1 == 1 || this.rating2_1 == 2 )
    {
      this.check2_1="Less";
      console.log('first',this.rating2_1);
      
    }
    else if(this.rating2_1 == 3 || this.rating2_1 == 4)
    {
      this.check2_1="Good";
    }
    else if(this.rating2_1 == 5 || this.rating2_1 == 6)
    {
      this.check2_1="Better";
    }
    else if(this.rating2_1 == 7 || this.rating2_1 == 8)
    {
      this.check2_1="Best";
    }
    else if(this.rating2_1 == 9 || this.rating2_1 == 10)
    {
      this.check2_1="Excellent";
    }
  }
  onClick2_2(__value)
  {

    this.rating2_2 = __value;
    console.log('star>>>',this.rating2_2);
    if(this.rating2_2 == 1 || this.rating2_2 == 2 )
    {
      this.check2_2="Less";
      console.log('first',this.rating2_2);
      
    }
    else if(this.rating2_2 == 3 || this.rating2_2 == 4)
    {
      this.check2_2="Good";
    }
    else if(this.rating2_2 == 5 || this.rating2_2 == 6)
    {
      this.check2_2="Better";
    }
    else if(this.rating2_2 == 7 || this.rating2_2 == 8)
    {
      this.check2_2="Best";
    }
    else if(this.rating2_2 == 9 || this.rating2_2 == 10)
    {
      this.check2_2="Excellent";
    }
  }
  onClick2_3(__value)
  {

    this.rating2_3 = __value;
    console.log('star>>>',this.rating2_3);
    if(this.rating2_3 == 1 || this.rating2_3 == 2 )
    {
      this.check2_3="Less";
      console.log('first',this.rating2_3);
      
    }
    else if(this.rating2_3 == 3 || this.rating2_3 == 4)
    {
      this.check2_3="Good";
    }
    else if(this.rating2_3 == 5 || this.rating2_3 == 6)
    {
      this.check2_3="Better";
    }
    else if(this.rating2_3 == 7 || this.rating2_3 == 8)
    {
      this.check2_3="Best";
    }
    else if(this.rating2_3 == 9 || this.rating2_3 == 10)
    {
      this.check2_3="Excellent";
    }
  }onClick2_4(__value)
  {

    this.rating2_4 = __value;
    console.log('star>>>',this.rating2_4);
    if(this.rating2_4 == 1 || this.rating2_4 == 2 )
    {
      this.check2_4="Less";
      console.log('first',this.rating2_4);
      
    }
    else if(this.rating2_4 == 3 || this.rating2_4 == 4)
    {
      this.check2_4="Good";
    }
    else if(this.rating2_4 == 5 || this.rating2_4 == 6)
    {
      this.check2_4="Better";
    }
    else if(this.rating2_4 == 7 || this.rating2_4 == 8)
    {
      this.check2_4="Best";
    }
    else if(this.rating2_4 == 9 || this.rating2_4 == 10)
    {
      this.check2_4="Excellent";
    }
  }onClick2_5(__value)
  {

    this.rating2_5 = __value;
    console.log('star>>>',this.rating2_5);
    if(this.rating2_5 == 1 || this.rating2_5 == 2 )
    {
      this.check2_5="Less";
      console.log('first',this.rating2_5);
      
    }
    else if(this.rating2_5 == 3 || this.rating2_5 == 4)
    {
      this.check2_5="Good";
    }
    else if(this.rating2_5 == 5 || this.rating2_5 == 6)
    {
      this.check2_5="Better";
    }
    else if(this.rating2_5 == 7 || this.rating2_5 == 8)
    {
      this.check2_5="Best";
    }
    else if(this.rating2_5 == 9 || this.rating2_5 == 10)
    {
      this.check2_5="Excellent";
    }
  }onClick2_6(__value)
  {

    this.rating2_6 = __value;
    console.log('star>>>',this.rating2_6);
    if(this.rating2_6 == 1 || this.rating2_6 == 2 )
    {
      this.check2_6="Less";
      console.log('first',this.rating2_6);
      
    }
    else if(this.rating2_6 == 3 || this.rating2_6 == 4)
    {
      this.check2_6="Good";
    }
    else if(this.rating2_6 == 5 || this.rating2_6 == 6)
    {
      this.check2_6="Better";
    }
    else if(this.rating2_6 == 7 || this.rating2_6 == 8)
    {
      this.check2_6="Best";
    }
    else if(this.rating2_6 == 9 || this.rating2_6 == 10)
    {
      this.check2_6="Excellent";
    }
  }onClick2_7(__value)
  {

    this.rating2_7 = __value;
    console.log('star>>>',this.rating2_7);
    if(this.rating2_7 == 1 || this.rating2_7 == 2 )
    {
      this.check2_7="Less";
      console.log('first',this.rating2_7);
      
    }
    else if(this.rating2_7 == 3 || this.rating2_7 == 4)
    {
      this.check2_7="Good";
    }
    else if(this.rating2_7 == 5 || this.rating2_7 == 6)
    {
      this.check2_7="Better";
    }
    else if(this.rating2_7 == 7 || this.rating2_7 == 8)
    {
      this.check2_7="Best";
    }
    else if(this.rating2_7 == 9 || this.rating2_7 == 10)
    {
      this.check2_7="Excellent";
    }
  }onClick2_8(__value)
  {

    this.rating2_8 = __value;
    console.log('star>>>',this.rating2_8);
    if(this.rating2_8 == 1 || this.rating2_8 == 2 )
    {
      this.check2_8="Less";
      console.log('first',this.rating2_8);
      
    }
    else if(this.rating2_8 == 3 || this.rating2_8 == 4)
    {
      this.check2_8="Good";
    }
    else if(this.rating2_8 == 5 || this.rating2_8 == 6)
    {
      this.check2_8="Better";
    }
    else if(this.rating2_8 == 7 || this.rating2_8 == 8)
    {
      this.check2_8="Best";
    }
    else if(this.rating2_8 == 9 || this.rating2_8 == 10)
    {
      this.check2_8="Excellent";
    }
  }onClick2_9(__value)
  {

    this.rating2_9 = __value;
    console.log('star>>>',this.rating2_9);
    if(this.rating2_9 == 1 || this.rating2_9 == 2 )
    {
      this.check2_9="Less";
      console.log('first',this.rating2_9);
      
    }
    else if(this.rating2_9 == 3 || this.rating2_9 == 4)
    {
      this.check2_9="Good";
    }
    else if(this.rating2_9 == 5 || this.rating2_9 == 6)
    {
      this.check2_9="Better";
    }
    else if(this.rating2_9 == 7 || this.rating2_9 == 8)
    {
      this.check2_9="Best";
    }
    else if(this.rating2_9 == 9 || this.rating2_9 == 10)
    {
      this.check2_9="Excellent";
    }
  }onClick2_10(__value)
  {

    this.rating2_10 = __value;
    console.log('star>>>',this.rating2_10);
    if(this.rating2_10 == 1 || this.rating2_10 == 2 )
    {
      this.check2_10="Less";
      console.log('first',this.rating2_10);
      
    }
    else if(this.rating2_10 == 3 || this.rating2_10 == 4)
    {
      this.check2_10="Good";
    }
    else if(this.rating2_10 == 5 || this.rating2_10 == 6)
    {
      this.check2_10="Better";
    }
    else if(this.rating2_10 == 7 || this.rating2_10 == 8)
    {
      this.check2_10="Best";
    }
    else if(this.rating2_10 == 9 || this.rating2_10 == 10)
    {
      this.check2_10="Excellent";
    }
  }onClick2_11(__value)
  {

    this.rating2_11 = __value;
    console.log('star>>>',this.rating2_11);
    if(this.rating2_11 == 1 || this.rating2_11 == 2 )
    {
      this.check2_11="Less";
      console.log('first',this.rating2_11);
      
    }
    else if(this.rating2_11 == 3 || this.rating2_11 == 4)
    {
      this.check2_11="Good";
    }
    else if(this.rating2_11 == 5 || this.rating2_11 == 6)
    {
      this.check2_11="Better";
    }
    else if(this.rating2_11 == 7 || this.rating2_11 == 8)
    {
      this.check2_11="Best";
    }
    else if(this.rating2_11 == 9 || this.rating2_11 == 10)
    {
      this.check2_11="Excellent";
    }
  }onClick2_12(__value)
  {

    this.rating2_12 = __value;
    console.log('star>>>',this.rating2_12);
    if(this.rating2_12 == 1 || this.rating2_12 == 2 )
    {
      this.check2_12="Less";
      console.log('first',this.rating2_12);
      
    }
    else if(this.rating2_12 == 3 || this.rating2_12 == 4)
    {
      this.check2_12="Good";
    }
    else if(this.rating2_12 == 5 || this.rating2_12 == 6)
    {
      this.check2_12="Better";
    }
    else if(this.rating2_12 == 7 || this.rating2_12 == 8)
    {
      this.check2_12="Best";
    }
    else if(this.rating2_12 == 9 || this.rating2_12 == 10)
    {
      this.check2_12="Excellent";
    }
  }onClick2_13(__value)
  {

    this.rating2_13 = __value;
    console.log('star>>>',this.rating2_13);
    if(this.rating2_13 == 1 || this.rating2_13 == 2 )
    {
      this.check2_13="Less";
      console.log('first',this.rating2_13);
      
    }
    else if(this.rating2_13 == 3 || this.rating2_13 == 4)
    {
      this.check2_13="Good";
    }
    else if(this.rating2_13 == 5 || this.rating2_13 == 6)
    {
      this.check2_13="Better";
    }
    else if(this.rating2_13 == 7 || this.rating2_13 == 8)
    {
      this.check2_13="Best";
    }
    else if(this.rating2_13 == 9 || this.rating2_13 == 10)
    {
      this.check2_13="Excellent";
    }
  }onClick2_14(__value)
  {

    this.rating2_14 = __value;
    console.log('star>>>',this.rating2_14);
    if(this.rating2_14 == 1 || this.rating2_14 == 2 )
    {
      this.check2_14="Less";
      console.log('first',this.rating2_14);
      
    }
    else if(this.rating2_14 == 3 || this.rating2_14 == 4)
    {
      this.check2_14="Good";
    }
    else if(this.rating2_14 == 5 || this.rating2_14 == 6)
    {
      this.check2_14="Better";
    }
    else if(this.rating2_14 == 7 || this.rating2_14 == 8)
    {
      this.check2_14="Best";
    }
    else if(this.rating2_14 == 9 || this.rating2_14 == 10)
    {
      this.check2_14="Excellent";
    }
  }onClick2_15(__value)
  {

    this.rating2_15 = __value;
    console.log('star>>>',this.rating2_15);
    if(this.rating2_15 == 1 || this.rating2_15 == 2 )
    {
      this.check2_15="Less";
      console.log('first',this.rating2_15);
      
    }
    else if(this.rating2_15 == 3 || this.rating2_15 == 4)
    {
      this.check2_15="Good";
    }
    else if(this.rating2_15 == 5 || this.rating2_15 == 6)
    {
      this.check2_15="Better";
    }
    else if(this.rating2_15 == 7 || this.rating2_15 == 8)
    {
      this.check2_15="Best";
    }
    else if(this.rating2_15 == 9 || this.rating2_15 == 10)
    {
      this.check2_15="Excellent";
    }
  }

  ngOnInit() {
    this.rating1_1 = 4;
    this.rating1_2 = 4;
    this.rating1_3 = 4;
    this.rating1_4 = 4;
    this.rating1_5 = 4;
    this.rating1_6 = 4;
    this.rating1_7 = 4;
    this.rating1_8 = 4;
    this.rating1_9 = 4;
    this.rating1_10 = 4;
    this.rating1_11 = 4;
    this.rating1_12 = 4;
    this.rating1_13 = 4;
    this.rating1_14 = 4;
    this.rating1_15 = 4;


    this.rating2_1 = 4;
    this.rating2_2 = 4;
    this.rating2_3 = 4;
    this.rating2_4 = 4;
    this.rating2_5 = 4;
    this.rating2_6 = 4;
    this.rating2_7 = 4;
    this.rating2_8 = 4;
    this.rating2_9 = 4;
    this.rating2_10 = 4;
    this.rating2_11 = 4;
    this.rating2_12 = 4;
    this.rating2_13 = 4;
    this.rating2_14 = 4;
    this.rating2_15 = 4;
  }

  isReadMore = true;
  isReadMore2 =true;

  showText() {
     this.isReadMore = !this.isReadMore
  }
  showText2() {
    this.isReadMore2 = !this.isReadMore2
 }

}
