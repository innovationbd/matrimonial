import { Component, OnInit } from '@angular/core';
import {SharedService} from 'app/shared.service';

@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.css']
})
export class ProfileHomeComponent implements OnInit {

  constructor(private service:SharedService) { }
  userName;
  userAge;
  userGender;
  userEmail;
  //gender;
  currentUser;
  man;
  gotid;
  ngOnInit(): void {
    this.userName = localStorage.getItem('username');
    this.userAge = localStorage.getItem('userage');
    this.gotid = localStorage.getItem('userid');
    this.userGender = this.getGender();
    //this.userEmail = this.currentUser.email;
    this.service.loginauth();
    //this.man = Number(this.userAge == this.userAge);
    this.getCurrentUser();
  }
  getCurrentUser() {
    if(localStorage.getItem('usertype')=='1' || (localStorage.getItem('usertype')=='0' && localStorage.getItem('gender')=='Male')) {
        this.service.getMaleUserList(Number(localStorage.getItem('userid'))).subscribe(data=>{
          this.currentUser = data;
        });
    }
    else if(localStorage.getItem('usertype')=='2' || (localStorage.getItem('usertype')=='0' && localStorage.getItem('gender')=='Female')) {
        this.service.getFemaleUserList(Number(localStorage.getItem('userid'))).subscribe(data=>{
          this.currentUser = data;
        });
    }
  }
  getU() {
    if(localStorage.getItem('usertype')=='0') {
      if(localStorage.getItem('userid') != this.gotid) {
        this.getCurrentUser();
        this.gotid=localStorage.getItem('userid');
      }
    }
    return true;
  }
  getGender() {
    if(localStorage.getItem('usertype')=='1') {
        return 'Male';
    }
    else if(localStorage.getItem('usertype')=='2') {
        return 'Female';
    }
  }

}
