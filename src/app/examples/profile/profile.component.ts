import { Component, OnInit } from '@angular/core';
import {SharedService} from 'app/shared.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

    constructor(private service:SharedService, private router : Router) { }

    currentUser;
    userId;
    val = false;
    pct;  //percentage of profile completeness
    ngOnInit() {
      this.getCurrentUser();
    }
    profilePercentage(user, male=true) {
      var param = [
        Number(user.fullName != null),
        Number(user.state != null),
        Number(user.cellPhone != null),
        Number(user.email != null),
        Number(user.age != null),
        Number(user.dateOfBirth != null),
        Number(user.height != null),
        Number(user.weight != null),
        Number(user.maritalStatus != null),
        Number(user.children != null),
        Number(user.immigrationStatus != null),
        Number(user.highSchool != null),
        Number(user.bachelors != null),
        Number(user.masters != null),
        Number(user.doctorate != null),
        Number(user.employed != null),
        Number(user.religiousPractice != null),
        Number(user.smoker != null),
        Number(user.preReligious != null),
        Number(user.preSmoking != null),
        Number(user.preEthnic != null),
        Number(user.preImmigrationStatus != null),
        Number(user.preMaritalStatus != null),
        Number(user.preChildren != null),
        Number(user.preEducation != null),
        Number(user.preEmployment != null),
        Number(user.preIncome != null),
        Number(user.preAgeGap != null)
      ];
      if (male) {
        param.push(Number(user.beard != null));
        param.push(Number(user.preWear != null));
      }
      else {
        param.push(Number(user.wear != null));
        param.push(Number(user.preBeard != null));
      }
      var sum = 0;
      for(var i=0; i<param.length; i++) {
        sum = sum + param[i];
      }
      return sum*100/30;
    }
    profileComplete() {
      if (this.pct >= 80) { return true; }
    }
    getCurrentUser() {
      if(localStorage.getItem('usertype')=='1') {
          this.service.getMaleUserList(Number(localStorage.getItem('userid'))).subscribe(data=>{
            this.currentUser = data;
            this.pct = this.profilePercentage(this.currentUser);
          });
      }
      else if(localStorage.getItem('usertype')=='2') {
          this.service.getFemaleUserList(Number(localStorage.getItem('userid'))).subscribe(data=>{
            this.currentUser = data;
            this.pct = this.profilePercentage(this.currentUser,false);
          });
      }
    }
    islogin() {
      if (this.userId == localStorage.getItem('userid')) {
        return true;
      }
      else {
        this.router.navigate(['/login']);
        return false;
      }
    }

}
