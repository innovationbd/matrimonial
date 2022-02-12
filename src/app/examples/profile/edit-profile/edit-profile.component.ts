import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SharedService} from 'app/shared.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private service:SharedService,
              private router : Router) { }
  focus;
  focus1;
  model;
  currentUser;
  gotid;
  STATES = this.service.STATES;

  ngOnInit(): void {
    this.service.loginauth();
    this.getCurrentUser();
    this.gotid=localStorage.getItem('userid');
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
    return true;
  }
  imStatusOther() {
    if(this.currentUser.immigrationStatus == null) { return false; }
    if(this.currentUser.immigrationStatus == "US Citizen" || this.currentUser.immigrationStatus == "Permanent Resident") { return false; }
    else { return true; }
  }
  relPracticeOther() {
    if(this.currentUser.religiousPractice == "Other") { return true; }
  }
  preReligiousOther() {
    if(this.currentUser.preReligious == "Other") { return true; }
  }
  ownEthnicity() {
    if(this.currentUser.preEthnic == "Own Ethnicity") { return true; }
  }
  specificEthnicity() {
    if(this.currentUser.preEthnic == "Specific Ethnicity") { return true; }
  }
  preImStatusOther() {
    if(this.currentUser.preImmigrationStatus == "Other") { return true; }
  }
  preEmployed() {
    if(this.currentUser.preEmployment == "Employed") { return true; }
  }
  isMale() {
    if(this.currentUser.gender == 'Male') { return true; }
  }
  clickSave() {
    this.currentUser.userToken = localStorage.getItem('usertoken');
    if(!this.imStatusOther()) { this.currentUser.immigrationStatusOther = null; }
    if(this.currentUser.gender == 'Male') {
      this.service.updateMaleUser(this.currentUser).subscribe(res=>{
        alert(res.toString());
      });
    }
    else if (this.currentUser.gender == 'Female') {
      this.service.updateFemaleUser(this.currentUser).subscribe(res=>{
        alert(res.toString());
      });
    }

  }
  getAge() {
    var todate = new Date();
    var bdate = new Date(this.currentUser.dateOfBirth);
    var diff = todate.getTime() - bdate.getTime();
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    this.currentUser.age = Math.round(diffDays / 365);
    localStorage.setItem('userage',this.currentUser.age);
    return true;
  }
  FullName;
  NickName;
  Gender;
  Address;
  City;
  State;
  Zip;
  CellPhone;
  WorkPhone;
  HomePhone;
  Email;
  PersonalWebsite;
  Age;
  DateOfBirth;
  Height;
  Weight;
  PlaceOfBirth;
  Health;
  MaritalStatus;
  Children;
  ChildrenNumber;
  ChildrenAges;
  ImmigrationStatus;
  HighSchool;
  HighSchoolYear;
  Bachelors;
  BachelorsYear;
  Masters;
  MastersYear;
  Doctorate;
  DoctorateYear;
  OtherDegree;
  OtherDegreeYear;
  Employed;
  Employment;
  Position;
  Income;
  ReligiousPractice;
  ReligiousPracticeBrief;
  RevertTime;
  Beard;
  Smoker;
  PreReligious;
  PreReligiousBrief;
  PreWear;
  PreSmoking;
  PreEthnic;
  PreEthnicSpecific;
  PreImmigrationStatus;
  PreMaritalStatus;
  PreChildren;
  PreEducation;
  PreEmployment;
  PreIncome;
  PreAgeGap;
  GuarName;
  GuarAddress;
  GuarCity;
  GuarState;
  GuarCountry;
  GuarPhone;
  GuarEmail;
  GuarProfession;
  FamilyBrief;
  RefName1;
  RefRelation1;
  RefPhone1;
  RefName2;
  RefRelation2;
  RefPhone2;
  RefName3;
  RefRelation3;
  RefPhone3;
  Photo;
  Cv;
  Album;
  GovIssuedId;
  MatchShowLimit=5;
  UserPass;
  Status;
  OpeningDate;
  LastEdit;


}
