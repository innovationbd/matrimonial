import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adminuser',
  templateUrl: './adminuser.component.html',
  styleUrls: ['./adminuser.component.css']
})
export class AdminuserComponent implements OnInit {

  API_URL= "http://127.0.0.1:8000/";
  PHOTO_URL= "http://127.0.0.1:8000/photos/";

  constructor(private http:HttpClient) { }
  adminusers: any=  [];
  modalTitle="";
  AdminId=0;
  AdminUserName="";
  AdminPass="";
  AdminFullName="";
  AdminLevel="";
  AdminStatus="";



  ngOnInit(): void {  this.refreshList();
  }
  refreshList(){
    this.http.get<any>(this.API_URL+'adminuser')
    .subscribe(data=>{
        this.adminusers=data;
    });
    }

  addClick(){
    this.modalTitle="Add Admin User";
    this.AdminId=0;
    this.AdminUserName="";
    this.AdminPass="";
    this.AdminFullName="";
    this.AdminLevel="";
    this.AdminStatus="";
  }

  editClick(admin:any){
    this.modalTitle="Edit Admin User";
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

    this.http.post(this.API_URL+'adminuser',val)
    .subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    });
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

    this.http.put(this.API_URL+'adminuser',val)
    .subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    });
  }

  deleteClick(id:any){
    if(confirm('Are you sure?')){
    this.http.delete(this.API_URL+'adminuser/'+id)
    .subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    });
    }
  }

}
