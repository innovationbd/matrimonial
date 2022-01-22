import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {SharedService} from 'app/shared.service';
import { ILogin } from 'app/interfaces/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  test : Date = new Date();
  focus;
  focus1;
  TempList:any = [];
  currentUser;
  veriCode="";
  wrongCode = false;
  gotTempList = false;
  gotUserList = false;
  userid="";
  password="";
  UserList:any = [];
  MaleUserList:any = [];
  FemaleUserList:any = [];


  constructor(private service:SharedService,
              private router : Router
              ) { }

  ngOnInit(): void {
  }

  isSignedUp() {
    if (localStorage.getItem('isSignedUp') == "True") {return true; }
    else {return false;}
  }
  gotVeriCode() {
    if (localStorage.getItem('gotVeriCode') == "True") {return true; }
    else {return false;}
  }
  clickLogin() {
    if(this.loginValidate()) {
      var userToken = this.service.mEncrypt(this.service.getRandomInt(1234567,7654321));
      var val={
        /*fullName:this.currentUser.fullName,
        nickName:this.currentUser.nickName,
        gender:this.currentUser.gender,
        address:this.currentUser.ddress,
        city:this.currentUser.city,
        state:this.currentUser.state,
        zip:this.currentUser.zip,
        cellPhone:this.currentUser.cellPhone,
        workPhone:this.currentUser.workPhone,
        homePhone:this.currentUser.homePhone,
        email:this.currentUser.tempEmail,
        personalWebsite:this.PersonalWebsite,
        age:this.Age,
        dateOfBirth:this.currentUser.tempDateOfBirth,
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
        userPass:this.currentUser.tempPass,
        status:this.Status,
        openingDate:this.OpeningDate,
        lastEdit:this.LastEdit,*/
        userToken:userToken
      };
      this.service.updateMaleUser(val).subscribe(res=>{
        alert(res.toString());
      });
      this.service.isLoggedIn = true;
      localStorage.removeItem('isSignedUp');
    }
  }
  refreshUserList() {
    if(!this.gotUserList) {
      this.service.getMaleUserList().subscribe(data=>{
        this.MaleUserList = data;
      });
      this.service.getFemaleUserList().subscribe(data=>{
        this.FemaleUserList= data;
      });
      this.gotUserList = true;
    }
  }
  loginValidate() {
    this.UserList = [this.MaleUserList, this.FemaleUserList];
    this.currentUser = this.UserList.find(e => e.email == this.userid)
    if(this.currentUser == null) { return false; }
    if(this.service.mEncrypt(this.currentUser.userPass) == this.service.mEncrypt(this.password)) { return true; }
    else { return false; }
  }

  refreshTempList() {
    if(!this.gotTempList) {
      this.service.getTempList().subscribe(data=>{
        this.TempList = data;
      });
      this.gotTempList=true;
    }
  }
  verifyEmail() {
    this.currentUser = this.TempList.find(e => e.tempEmail == localStorage.getItem('userid'))
    if(this.currentUser == null) { return false; }
    else if(this.currentUser.tempVeriCode == this.veriCode) { this.wrongCode=false; return true; }
    else { return false; }
  }
  clickVerify() {
    if(!this.verifyEmail()) { this.wrongCode=true; return false; }
    if(this.currentUser.tempGender == "Male") {
      var valM={
        fullName:this.currentUser.tempName,
        nickName:this.NickName,
        gender:this.currentUser.tempGender,
        address:this.Address,
        city:this.City,
        state:this.currentUser.tempState,
        zip:this.Zip,
        cellPhone:this.currentUser.tempCellPhone,
        workPhone:this.WorkPhone,
        homePhone:this.HomePhone,
        email:this.currentUser.tempEmail,
        personalWebsite:this.PersonalWebsite,
        age:this.Age,
        dateOfBirth:this.currentUser.tempDateOfBirth,
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
        userPass:this.currentUser.tempPass,
        status:this.Status,
        openingDate:this.OpeningDate,
        lastEdit:this.LastEdit,
        userToken:null
      };
      this.service.addMaleUser(valM).subscribe(res=>{
        alert(res.toString());
      });
    }
    else {
      var valF={
        fullName:this.currentUser.tempName,
        nickName:this.NickName,
        gender:this.currentUser.tempGender,
        address:this.Address,
        city:this.City,
        state:this.currentUser.tempState,
        zip:this.Zip,
        cellPhone:this.currentUser.tempCellPhone,
        workPhone:this.WorkPhone,
        homePhone:this.HomePhone,
        email:this.currentUser.tempEmail,
        personalWebsite:this.PersonalWebsite,
        age:this.Age,
        dateOfBirth:this.currentUser.tempDateOfBirth,
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
        wear:this.Wear,
        smoker:this.Smoker,
        preReligious:this.PreReligious,
        preReligiousBrief:this.PreReligiousBrief,
        preBeard:this.preBeard,
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
        userPass:this.currentUser.tempPass,
        status:this.Status,
        openingDate:this.OpeningDate,
        lastEdit:this.LastEdit,
        userToken:null
      };
      this.service.addFemaleUser(valF).subscribe(res=>{
        alert(res.toString());
      });
    }
    this.service.deleteTempUser(this.currentUser.tempId).subscribe(res=>{
      alert(res.toString());
    });
    localStorage.setItem('isSignedUp', "True");
    localStorage.removeItem('gotVeriCode');
    localStorage.removeItem('userid');
    //this.router.navigate(['/login']);
  }

/*  createClick(){

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


      var emailVal={
        subject: "Greetings from MUNA",
        message: "Your verification code is " + this.code,
        toEmail: [this.Email]
      }

      this.service.sendEmail(emailVal).subscribe(res=>{
        alert(res.toString());
      });
    }
*/

  //fields of user table
  maleusers: any=  [];
  modalTitle="";

  MaleId=0;
  FemaleId=0;

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
  Wear=null;

  Smoker=null;
  PreReligious=null;
  PreReligiousBrief=null;

  PreWear=null;
  preBeard=null;

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

}
