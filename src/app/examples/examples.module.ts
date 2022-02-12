import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ViewProfileComponent } from './profile/view-profile/view-profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { TopMatchesComponent } from './profile/top-matches/top-matches.component';
import { MessageComponent } from './profile/message/message.component';
import { NotificationComponent } from './profile/notification/notification.component';
import { ProfileHomeComponent } from './profile/profile-home/profile-home.component';
import { AdminComponent } from './profile/admin/admin.component';
import { PasswordComponent } from './password/password.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        RouterModule
    ],
    declarations: [
        LandingComponent,
        SignupComponent,
        ProfileComponent,
        LoginComponent,
        ViewProfileComponent,
        EditProfileComponent,
        TopMatchesComponent,
        MessageComponent,
        NotificationComponent,
        ProfileHomeComponent,
        AdminComponent,
        PasswordComponent,
    ]
})
export class ExamplesModule { }
