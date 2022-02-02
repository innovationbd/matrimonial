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
  //gender;
  currentUser;
  ngOnInit(): void {
    this.userName = localStorage.getItem('username');
    this.userAge = localStorage.getItem('userage');
    this.userGender = this.getGender();
    this.service.loginauth();
    //this.getCurrentUser();
  }
  getCurrentUser() {
    if(localStorage.getItem('usertype')=='1') {
        this.service.getMaleUserList(Number(localStorage.getItem('userid'))).subscribe(data=>{
          this.currentUser = data;
        });
    }
    else if(localStorage.getItem('usertype')=='2') {
        this.service.getFemaleUserList(Number(localStorage.getItem('userid'))).subscribe(data=>{
          this.currentUser = data;
        });
    }
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
