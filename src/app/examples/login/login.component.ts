import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  test : Date = new Date();
  focus;
  focus1;
  constructor() { }

  ngOnInit(): void {
  }

  isSignedUp() {
    if (localStorage.getItem('isSignedUp') == "true") {
      //localStorage.setItem('isSignedUp', "false");
      return true;
    }
    return false;
  }

  clearSignedUp() {
    localStorage.removeItem('isSignedUp');
    return true;
  }

}
