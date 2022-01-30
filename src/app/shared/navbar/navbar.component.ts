import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import {SharedService} from 'app/shared.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;

    constructor(public location: Location, private element : ElementRef, private service:SharedService) {
        this.sidebarVisible = false;
    }

    currentUser;

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        // console.log(toggleButton, 'toggle');

        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };
    isHome() {
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
        if( titlee === '/home' ) {
            return true;
        }
        else {
            return false;
        }
    }
    isDocumentation() {
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
        if( titlee === '/documentation' ) {
            return true;
        }
        else {
            return false;
        }
    }
    isSignup() {
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
        if( titlee === '/signup' ) {
            return true;
        }
        else {
            return false;
        }
    }
    isLogin() {
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
        if( titlee === '/login' ) {
            return true;
        }
        else {
            return false;
        }
    }
    isLoggedin() {
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
        if( titlee === '/user-profile' || titlee === '/view-profile' || titlee === '/top-matches' || titlee === '/edit-profile' ) {
            return true;
        }
        else {
            return false;
        }
    }
    logout() :void {
       if(localStorage.getItem('usertype')=='1') {
         this.service.getMaleUserList(Number(localStorage.getItem('userid'))).subscribe(data=>{
           this.currentUser = data;
           var UserToken = this.service.getRandomInt(12345678,87654321);
           this.service.updateMaleUser({userId: this.currentUser.userId, userToken: UserToken}).subscribe();
         });
       }
       else if(localStorage.getItem('usertype')=='2') {
         this.service.getFemaleUserList(Number(localStorage.getItem('userid'))).subscribe(data=>{
           this.service.currentUser = data;
           var UserToken = this.service.getRandomInt(12345678,87654321);
           this.service.updateFemaleUser({userId: this.currentUser.userId, userToken: UserToken}).subscribe();
         });
       }
       localStorage.removeItem('usertype');
       localStorage.removeItem('usertoken');
       localStorage.removeItem('userid');
       localStorage.setItem('isLoggedOut','True');
     }
}
