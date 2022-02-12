import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ILogin } from 'app/interfaces/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {SharedService} from 'app/shared.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  constructor(private service:SharedService,
              private router : Router
              ) { }
  test : Date = new Date();
  focus;
  focus1;
  TempList:any = [];
  currentUser;
  adminUser;
  userEmail="";
  password="";

  errorMessage="";

  pass1=""; pass2;
  UserPass;

  ngOnInit(): void {
    this.service.loginauth();
    this.getCurrentUser();
  }
  getCurrentUser() {
    if(localStorage.getItem('usertype')=='0') {
        this.service.getAdminList(Number(localStorage.getItem('adminid'))).subscribe(data=>{
          this.adminUser = data;
        });
    }
    else if(localStorage.getItem('usertype')=='1') {
        this.service.getMaleUserList(Number(localStorage.getItem('userid'))).subscribe(data=>{
          this.currentUser = data;
        });
    }
    else if(localStorage.getItem('usertype')=='2') {
        this.service.getFemaleUserList(Number(localStorage.getItem('userid'))).subscribe(data=>{
          this.currentUser = data;
        });
    }
    return true;
  }
  passMatched() {
    if(this.pass1 != "" && this.pass1 == this.pass2) {
      this.UserPass = this.service.mEncrypt(this.pass1);
      return true;
    }
    return false;
  }
  changePassword() {
    if(!this.passMatched()) {
      this.errorMessage = "Please retype new password correctly.";
      return false;
    }
    var changed=true;
    var rout = '/user-profile';
    if(localStorage.getItem('usertype')=='0') {
        if(this.adminUser.adminPass == this.password) {
          this.service.updateAdminUser({adminId: this.adminUser.adminId, adminPass: this.pass1}).subscribe();
          rout = '/admin';
        }
        else {changed=false;}
    }
    else if(localStorage.getItem('usertype')=='1') {
      if(this.currentUser.userPass == this.service.mEncrypt(this.password)) {
        this.service.updateMaleUser({userId: this.currentUser.userId, userPass: this.UserPass}).subscribe();
      }
      else {changed=false;}
    }
    else if(localStorage.getItem('usertype')=='2') {
      if(this.currentUser.userPass == this.service.mEncrypt(this.password)) {
        this.service.updateFemaleUser({userId: this.currentUser.userId, userPass: this.UserPass}).subscribe();
      }
      else {changed=false;}
    }
    if(!changed) {
      this.errorMessage = "Password Wrong!";
      return false;
    }
    alert("Password Changed Successfully");
    this.router.navigate([rout]);
  }


}
