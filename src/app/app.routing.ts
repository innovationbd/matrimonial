import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { ServicesComponent } from './components/services/services.component';
import { EventsComponent } from './components/events/events.component';
import { AboutComponent } from './components/about/about.component';
import { FaqComponent } from './components/faq/faq.component';
import { DonateComponent } from './components/donate/donate.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { EditProfileComponent } from './examples/profile/edit-profile/edit-profile.component';
import { MessageComponent } from './examples/profile/message/message.component';
import { NotificationComponent } from './examples/profile/notification/notification.component';
import { TopMatchesComponent } from './examples/profile/top-matches/top-matches.component';
import { ViewProfileComponent } from './examples/profile/view-profile/view-profile.component';
import { AdminComponent } from './examples/profile/admin/admin.component';
import { PasswordComponent } from './examples/password/password.component';

import { SignupComponent } from './examples/signup/signup.component';
import { LoginComponent } from './examples/login/login.component';
import { LandingComponent } from './examples/landing/landing.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { AdminuserComponent } from './adminuser/adminuser.component';
import { MaleuserComponent } from './maleuser/maleuser.component';

import { AuthGuard } from './guards/auth.guard';


const routes: Routes =[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',             component: ComponentsComponent },
    { path: 'servicess',         component: ServicesComponent },
    { path: 'events',           component: EventsComponent },
    { path: 'abouts',            component: AboutComponent },
    { path: 'faqs',              component: FaqComponent },
    { path: 'donate',           component: DonateComponent },
    { path: 'contacts',          component: ContactComponent },
    { path: 'user-profile',     component: ProfileComponent}, //canActivate : [AuthGuard] },
    { path: 'edit-profile',     component: EditProfileComponent },
    { path: 'message',          component: MessageComponent },
    { path: 'notification',     component: NotificationComponent },
    { path: 'top-matches',      component: TopMatchesComponent },
    { path: 'view-profile',     component: ViewProfileComponent },
    { path: 'adminuser',        component: AdminuserComponent },
    { path: 'admin',            component: AdminComponent },
    { path: 'maleuser',         component: MaleuserComponent },
    { path: 'signup',           component: SignupComponent },
    { path: 'login',            component: LoginComponent },
    { path: 'password',         component: PasswordComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'nucleoicons',      component: NucleoiconsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
