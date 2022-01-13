import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import {SharedService} from 'app/shared.service';
import { ILogin } from 'app/interfaces/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


    test : Date = new Date();
    focus;
    focus1;
    date: {year: number, month: number};
    pass1=null;
    pass2="";

    constructor(private service:SharedService,
                private router : Router,
                private _util: UtilService,
                private _http: HttpService) { }

    maleusers: any=  [];
    modalTitle="";
    MaleId=0;
    FullName=null;
    NickName=null;
    Gender=null;
    Address=null;
    City=null;
    State=null;
    Zip=null;
    CellPhone=null;
    WorkPhone=null;
    HomePhone=null;
    Email=null;
    PersonalWebsite=null;
    Age=null;
    DateOfBirth=null;
    Height=null;
    Weight=null;
    PlaceOfBirth=null;
    Health=null;
    MaritalStatus=null;
    Children=null;
    ChildrenNumber=null;
    ChildrenAges=null;
    ImmigrationStatus=null;
    HighSchool=null;
    HighSchoolYear=null;
    Bachelors=null;
    BachelorsYear=null;
    Masters=null;
    MastersYear=null;
    Doctorate=null;
    DoctorateYear=null;
    OtherDegree=null;
    OtherDegreeYear=null;
    Employed=null;
    Employment=null;
    Position=null;
    Income=null;
    ReligiousPractice=null;
    ReligiousPracticeBrief=null;
    RevertTime=null;
    Beard=null;
    Smoker=null;
    PreReligious=null;
    PreReligiousBrief=null;
    PreWear=null;
    PreSmoking=null;
    PreEthnic=null;
    PreEthnicSpecific=null;
    PreImmigrationStatus=null;
    PreMaritalStatus=null;
    PreChildren=null;
    PreEducation=null;
    PreEmployment=null;
    PreIncome=null;
    PreAgeGap=null;
    GuarName=null;
    GuarAddress=null;
    GuarCity=null;
    GuarState=null;
    GuarCountry=null;
    GuarPhone=null;
    GuarEmail=null;
    GuarProfession=null;
    FamilyBrief=null;
    RefName1=null;
    RefRelation1=null;
    RefPhone1=null;
    RefName2=null;
    RefRelation2=null;
    RefPhone2=null;
    RefName3=null;
    RefRelation3=null;
    RefPhone3=null;
    Photo=null;
    Cv=null;
    Album=null;
    GovIssuedId=null;
    MatchShowLimit=5;
    UserPass=null;
    Status=null;
    //#OpeningDate:number = Date.now();
    OpeningDate=null;
    LastEdit=null;

    passMisMatched=false;
    status = true;

    ngOnInit() {

    }

    fullNameValidate() {
      if(this.FullName == "") { return false; }
      else { return true; }
    }
    emailValidate() {
      if(this.Email == "") { return false; }
      else { return true; }
    }
    genderValidate() {
      if(this.Gender == "") { return false; }
      else { return true; }
    }
    passwordValidate() {
      if(this.pass1 == "") { return false; }
      else { return true; }
    }

    createClick(){

         if(this.FullName==null) { this.FullName=""; this.status=false; }
         if(this.Email==null) { this.Email=""; this.status=false; }
         if(this.Gender==null) { this.Gender=""; this.status=false; }
         if(this.pass1==null) { this.pass1=""; this.status=false; }
         if(!this.passMatched()) { this.passMisMatched = true; this.status=false; }
         if(!this.status) { return false; }


        var val={
        fullName:this.FullName,
        nickName:this.NickName,
        gender:this.Gender,
        address:this.Address,
        city:this.City,
        state:this.State,
        zip:this.Zip,
        cellPhone:this.CellPhone,
        workPhone:this.WorkPhone,
        homePhone:this.HomePhone,
        email:this.Email,
        personalWebsite:this.PersonalWebsite,
        age:this.Age,
        dateOfBirth:this.DateOfBirth.year+'-'+this.DateOfBirth.month+'-'+this.DateOfBirth.day,
        height:this.Height,
        weight:this.Weight,
        placeOfBirth:this.PlaceOfBirth,
        health:this.Health,
        maritalStatus:this.MaritalStatus,
        children:this.Children,
        childrenNumber:this.ChildrenNumber,
        childrenAges:this.ChildrenAges,
        immigrationStatus:this.ImmigrationStatus,
        highSchool:this.HighSchool,
        highSchoolYear:this.HighSchoolYear,
        bachelors:this.Bachelors,
        bachelorsYear:this.BachelorsYear,
        masters:this.Masters,
        mastersYear:this.MastersYear,
        doctorate:this.Doctorate,
        doctorateYear:this.DoctorateYear,
        otherDegree:this.OtherDegree,
        otherDegreeYear:this.OtherDegreeYear,
        employed:this.Employed,
        employment:this.Employment,
        position:this.Position,
        income:this.Income,
        religiousPractice:this.ReligiousPractice,
        religiousPracticeBrief:this.ReligiousPracticeBrief,
        revertTime:this.RevertTime,
        beard:this.Beard,
        smoker:this.Smoker,
        preReligious:this.PreReligious,
        preReligiousBrief:this.PreReligiousBrief,
        preWear:this.PreWear,
        preSmoking:this.PreSmoking,
        preEthnic:this.PreEthnic,
        preEthnicSpecific:this.PreEthnicSpecific,
        preImmigrationStatus:this.PreImmigrationStatus,
        preMaritalStatus:this.PreMaritalStatus,
        preChildren:this.PreChildren,
        preEducation:this.PreEducation,
        preEmployment:this.PreEmployment,
        preIncome:this.PreIncome,
        preAgeGap:this.PreAgeGap,
        guarName:this.GuarName,
        guarAddress:this.GuarAddress,
        guarCity:this.GuarCity,
        guarState:this.GuarState,
        guarCountry:this.GuarCountry,
        guarPhone:this.GuarPhone,
        guarEmail:this.GuarEmail,
        guarProfession:this.GuarProfession,
        familyBrief:this.FamilyBrief,
        refName1:this.RefName1,
        refRelation1:this.RefRelation1,
        refPhone1:this.RefPhone1,
        refName2:this.RefName2,
        refRelation2:this.RefRelation2,
        refPhone2:this.RefPhone2,
        refName3:this.RefName3,
        refRelation3:this.RefRelation3,
        refPhone3:this.RefPhone3,
        photo:this.Photo,
        cv:this.Cv,
        album:this.Album,
        govIssuedId:this.GovIssuedId,
        matchShowLimit:this.MatchShowLimit,
        userPass:this.UserPass,
        status:this.Status,
        openingDate:this.OpeningDate,
        lastEdit:this.LastEdit
        };

        localStorage.setItem('isSignedUp', "true");
        this.router.navigate(['/login']);

        this.service.addMaleUser(val).subscribe(res=>{
          alert(res.toString());
        });
      }

    passMatched() {
      if(this.pass1 != "" && this.pass1 == this.pass2) {
        this.UserPass = this.service.mEncrypt(this.pass1);
        return true;
      }
      return false;
    }

    isWeekend(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        return d.getDay() === 0 || d.getDay() === 6;
    }

    isDisabled(date: NgbDateStruct, current: {month: number}) {
        return date.month !== current.month;
    }

}
