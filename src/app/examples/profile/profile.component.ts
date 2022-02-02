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
    maleUser;
    femaleUser;
    currentUser;
    userId;
    val = false;
    ngOnInit() {
      
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
