import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {SharedService} from 'app/shared.service';

@Component({
  selector: 'app-adminuser',
  templateUrl: './adminuser.component.html',
  styleUrls: ['./adminuser.component.css']
})

export class AdminuserComponent implements OnInit {

  constructor(private http:HttpClient,
              private service:SharedService,
              private router : Router) { }
  adminusers: any=  [];
  maleusers: any=  [];
  femaleusers: any=  [];
  users: any=[];
  adminUser;
  modalTitle="";
  AdminId=0;
  AdminUserName="";
  AdminPass="";
  AdminFullName="";
  AdminLevel="";
  AdminStatus="";
  superadmin=1;

  FullName=null;
  CellPhone=null;
  Email=null;
  DateOfBirth=null;


  ngOnInit(): void {
    this.service.loginauth();
    this.refreshList();
    this.getCurrentAdmin();
    this.activeMenu(localStorage.getItem('menuadmin'));
  }
  refreshList(){
    this.service.getAdminList().subscribe(data=>{
        this.adminusers=data;
    });
    this.service.getMaleUserList().subscribe(data=>{
      this.maleusers = data;
    });
    this.service.getFemaleUserList().subscribe(data=>{
      this.femaleusers = data;
    });
  }
  getCurrentAdmin() {
      this.service.getAdminList(Number(localStorage.getItem('adminid'))).subscribe(data=>{
        this.adminUser = data;
        if(this.adminUser.adminUserName == "munasuperadmin") {
          if(!localStorage.getItem('menuadmin')) {
            this.menu[0].status=true;
            this.menu[1].status=false;
          }
          this.superadmin=0;
        }
      });
  }

  activeMenu(item) {
    if(item==2) { this.users = this.maleusers; }
    if(item==3) { this.users = this.femaleusers; }
    for(var i=0; i<this.menu.length; i++) {
      this.menu[i].status = (i == item);
      if(i == item) {
        this.menu[i].sub = !this.menu[i].sub;
      }
      else {
        this.menu[i].sub = false;
      }
    }
    //localStorage.setItem('menuadmin', item);
  }
  addClick(){
    this.modalTitle="Add Admin";
    this.AdminId=0;
    this.AdminUserName="";
    this.AdminPass="";
    this.AdminFullName="";
    this.AdminLevel="";
    this.AdminStatus="";
  }

  editClick(admin:any){
    this.modalTitle="Edit Admin";
    this.AdminId=admin.adminId;
    this.AdminUserName=admin.adminUserName;
    this.AdminPass=admin.adminPass;
    this.AdminFullName=admin.adminFullName;
    this.AdminLevel=admin.adminLevel;
    this.AdminStatus=admin.adminStatus;
  }

  createClick(){
    var val={
      adminUserName:this.AdminUserName,
      adminPass:this.AdminPass,
      adminFullName:this.AdminFullName,
      adminLevel:this.AdminLevel,
      adminStatus:this.AdminStatus
    };
    this.service.addAdminUser(val).subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    });
  }
  createUser() {
    var val= {
      fullName: this.FullName,
      email: this.Email,
      gender: 'Male',
      cellPhone: this.CellPhone,
      dateOfBirth: this.DateOfBirth,
      userPass: this.service.mEncrypt('1234'),
      matchShowLimit:5,
      status:"Active",
      openingDate:this.service.getDateTime(),
      lastEdit:this.service.getDateTime()
    };
    if(this.menu[2].status) {
      this.service.addMaleUser(val).subscribe(res=>{
        alert(res.toString());
        this.refreshList();
      });
    }
    if(this.menu[3].status) {
      val.gender = 'Female';
      this.service.addFemaleUser(val).subscribe(res=>{
        alert(res.toString());
        this.refreshList();
      });
    }
  }
  editUser(currentUser) {
    localStorage.setItem('userid',currentUser.userId);
    localStorage.setItem('gender',currentUser.gender);
    this.router.navigate(['/edit-profile']);
  }

  updateClick(){
    var val={
      adminId:this.AdminId,
      adminUserName:this.AdminUserName,
      adminPass:this.AdminPass,
      adminFullName:this.AdminFullName,
      adminLevel:this.AdminLevel,
      adminStatus:this.AdminStatus
    };
    this.service.updateAdminUser(val).subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    });
  }

  deleteClick(id:any){
    if(confirm('Are you sure?')){
    this.service.deleteAdminUser(id).subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    });
    }
  }

  menu = [
    {
      id: 0,
      name: "Admin Panel",
      submenu: ['Create Admin'],
      status: false,  //for demonstrating this item section
      sub: false  //for showing submenu
    },
    {
      id: 1,
      name: "Dashboard",
      submenu: [],
      status: true,
      sub: false
    },
    {
      id: 2,
      name: "Male User",
      submenu: ['Create Male User'],
      status: false,
      sub: false
    },
    {
      id: 3,
      name: "Female User",
      submenu: ['Create Female User'],
      status: false,
      sub: false
    },
    {
      id: 4,
      name: "Message",
      submenu: [],
      status: false,
      sub: false
    },
  ];
}
