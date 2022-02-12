import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILogin } from './interfaces/login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
//readonly APIUrl = "http://127.0.0.1:8000";
//readonly PhotoUrl = "http://127.0.0.1:8000/media/";

readonly APIUrl = "http://b56a-220-152-112-162.ngrok.io";
readonly PhotoUrl = "http://b56a-220-152-112-162.ngrok.io/media/";

//readonly APIUrl = "https://marufbuet.pythonanywhere.com";
//readonly PhotoUrl = "https://marufbuet.pythonanywhere.com/media/";
  currentUser;
  adminUser;
  isadmin=false;
  checked = false;

  constructor(private http:HttpClient, private router : Router) { }

   loginauth() {
     if(localStorage.getItem('isLoggedOut') == 'True') {
       this.router.navigate(['/login']);
       return true;
     }
     if(localStorage.getItem('fromloginpage') == "True") {
       localStorage.removeItem('fromloginpage');
       return true;
     }
     else if(localStorage.getItem('usertype')=='0') {
         this.getAdminList(Number(localStorage.getItem('adminid'))).subscribe(data=>{
           this.adminUser = data;
           var token = this.adminUser.adminToken;
           if(token == localStorage.getItem('usertoken')) {
             var UserToken = this.getRandomInt(12345678,87654321);
             localStorage.setItem('usertoken', UserToken);
             this.updateAdminUser({adminId: this.adminUser.adminId, adminToken: UserToken}).subscribe();
             this.isadmin=true;
           }
           else {
             this.logout();
             this.router.navigate(['/login']);
           }
         });
         return true;
     }
     else if(localStorage.getItem('usertype')=='1') {
         this.getMaleUserList(Number(localStorage.getItem('userid'))).subscribe(data=>{
           this.currentUser = data;
           var token = this.currentUser.userToken;
           if(token == localStorage.getItem('usertoken')) {
             var UserToken = this.getRandomInt(12345678,87654321);
             localStorage.setItem('usertoken', UserToken);
             this.updateMaleUser({userId: this.currentUser.userId, userToken: UserToken}).subscribe();
           }
           else {
             this.logout();
             this.router.navigate(['/login']);
           }
         });
         return true;
     }
     else if (localStorage.getItem('usertype')=='2') {
         this.getFemaleUserList(Number(localStorage.getItem('userid'))).subscribe(data=>{
           this.currentUser = data;
           var token = this.currentUser.userToken;
           if(token == localStorage.getItem('usertoken')) {
             var UserToken = this.getRandomInt(12345678,87654321);
             localStorage.setItem('usertoken', UserToken);
             this.updateFemaleUser({userId: this.currentUser.userId, userToken: UserToken}).subscribe();
           }
           else {
             this.logout();
             this.router.navigate(['/login']);
           }
         });
         return true;
     }
     this.router.navigate(['/login']);
   }
   loggedin() {
     if(localStorage.getItem('isLoggedOut') == 'False') {
       return true;
     }
     else { return false; }
   }
   logout() :void {
     if(localStorage.getItem('usertype')=='0') {
       this.getAdminList(Number(localStorage.getItem('adminid'))).subscribe(data=>{
         this.adminUser = data;
         var UserToken = this.getRandomInt(12345678,87654321);
         this.updateAdminUser({adminId: this.adminUser.adminId, userToken: UserToken}).subscribe();
       });
     }
     else if(localStorage.getItem('usertype')=='1') {
        this.getMaleUserList(Number(localStorage.getItem('userid'))).subscribe(data=>{
          this.currentUser = data;
          var UserToken = this.getRandomInt(12345678,87654321);
          this.updateMaleUser({userId: this.currentUser.userId, userToken: UserToken}).subscribe();
        });
      }
      else if(localStorage.getItem('usertype')=='2') {
        this.getFemaleUserList(Number(localStorage.getItem('userid'))).subscribe(data=>{
          this.currentUser = data;
          var UserToken = this.getRandomInt(12345678,87654321);
          this.updateFemaleUser({userId: this.currentUser.userId, userToken: UserToken}).subscribe();
        });
      }
      localStorage.removeItem('usertype');
      localStorage.removeItem('usertoken');
      localStorage.removeItem('adminid');
      localStorage.removeItem('userid');
      localStorage.removeItem('username');
      localStorage.removeItem('userage');
      localStorage.removeItem('gender');
      localStorage.removeItem('menuadmin');
      localStorage.setItem('isLoggedOut','True');
    }

  getRandomInt(min, max) {
     min = Math.ceil(min);
     max = Math.floor(max);
     return Math.floor(Math.random() * (max - min + 1)) + min;
   }
   getDateTime(today=new Date()) {
     //return datetime in the format '2022-12-22 00:00:04'
     //database datetime format '2022-01-28T15:07:37Z'
     //var today = new Date();
     var dd = String(today.getDate());
     var mm = String(today.getMonth() + 1); //January is 0!
     var hh = String(today.getHours());
     var mn = String(today.getMinutes());
     var ss = String(today.getSeconds());
     var yyyy = today.getFullYear();
     return yyyy+'-'+mm+'-'+dd+' '+hh+':'+mn+':'+ss;
   }
   isAdmin() {
     if(localStorage.getItem('usertype')=='0') {return true;}
   }

  mEncrypt(val) {
    return btoa(btoa(btoa(val)));
  }

  getAdminList(id=0): Observable<any[]> {
    if(id==0) {
      return this.http.get<any[]> (this.APIUrl + '/adminuser');
    }
    else {
      return this.http.get<any[]> (this.APIUrl + '/adminuser/' + id);
    }
  }
  addAdminUser(val:any) {
    return this.http.post (this.APIUrl + '/adminuser', val);
  }
  updateAdminUser(val:any) {
    return this.http.put (this.APIUrl + '/adminuser', val);
  }
  deleteAdminUser(val:any) {
    return this.http.delete (this.APIUrl + '/adminuser/' + val);
  }

  getTempList(): Observable<any[]> {
    return this.http.get<any[]> (this.APIUrl + '/tempuser');
  }
  addTempUser(val:any) {
    return this.http.post (this.APIUrl + '/tempuser', val);
  }
  updateTempUser(val:any) {
    return this.http.put (this.APIUrl + '/tempuser', val);
  }
  deleteTempUser(val:any) {
    return this.http.delete (this.APIUrl + '/tempuser/' + val);
  }


  getMaleUserList(id=0): Observable<any[]> {
    if(id==0) {
      return this.http.get<any[]> (this.APIUrl + '/maleuser');
    }
    else {
      return this.http.get<any[]> (this.APIUrl + '/maleuser/' + id);
    }
  }
  addMaleUser(val:any) {
    return this.http.post (this.APIUrl + '/maleuser', val);
  }
  updateMaleUser(val:any) {
    return this.http.put (this.APIUrl + '/maleuser', val);
  }
  deleteMaleUser(val:any) {
    return this.http.delete (this.APIUrl + '/maleuser/' + val);
  }

  getFemaleUserList(id=0): Observable<any[]> {
    if(id==0) {
      return this.http.get<any[]> (this.APIUrl + '/femaleuser');
    }
    else {
      return this.http.get<any[]> (this.APIUrl + '/femaleuser/' + id);
    }
  }
  addFemaleUser(val:any) {
    return this.http.post (this.APIUrl + '/femaleuser', val);
  }
  updateFemaleUser(val:any) {
    return this.http.put (this.APIUrl + '/femaleuser', val);
  }
  deleteFemaleUser(val:any) {
    return this.http.delete (this.APIUrl + '/femaleuser/' + val);
  }


  sendEmail(val:any) {
    return this.http.post (this.APIUrl + '/sendmail', val);
  }



  getEmpList(): Observable<any[]> {
    return this.http.get<any[]> (this.APIUrl + '/employee/');
  }

  addEmployee(val:any) {
    return this.http.post (this.APIUrl + '/employee/', val);
  }

  updateEmployee(val:any) {
    return this.http.put (this.APIUrl + '/employee/', val);
  }

  deleteEmployee(val:any) {
    return this.http.delete (this.APIUrl + '/employee/' + val);
  }


  UploadPhoto(val:any) {
    return this.http.post (this.APIUrl + '/SaveFile', val);
  }

  getAllDepartmentNames(): Observable<any[]> {
    return this.http.get<any[]> (this.APIUrl + '/department/');
  }

  STATES = [
    {
      "State": "Alabama",
      "Abbrev": "Ala.",
      "Code": "AL"
    },
    {
      "State": "Alaska",
      "Abbrev": "Alaska",
      "Code": "AK"
    },
    {
      "State": "Arizona",
      "Abbrev": "Ariz.",
      "Code": "AZ"
    },
    {
      "State": "Arkansas",
      "Abbrev": "Ark.",
      "Code": "AR"
    },
    {
      "State": "California",
      "Abbrev": "Calif.",
      "Code": "CA"
    },
    {
      "State": "Colorado",
      "Abbrev": "Colo.",
      "Code": "CO"
    },
    {
      "State": "Connecticut",
      "Abbrev": "Conn.",
      "Code": "CT"
    },
    {
      "State": "Delaware",
      "Abbrev": "Del.",
      "Code": "DE"
    },
    {
      "State": "District of Columbia",
      "Abbrev": "D.C.",
      "Code": "DC"
    },
    {
      "State": "Florida",
      "Abbrev": "Fla.",
      "Code": "FL"
    },
    {
      "State": "Georgia",
      "Abbrev": "Ga.",
      "Code": "GA"
    },
    {
      "State": "Hawaii",
      "Abbrev": "Hawaii",
      "Code": "HI"
    },
    {
      "State": "Idaho",
      "Abbrev": "Idaho",
      "Code": "ID"
    },
    {
      "State": "Illinois",
      "Abbrev": "Ill.",
      "Code": "IL"
    },
    {
      "State": "Indiana",
      "Abbrev": "Ind.",
      "Code": "IN"
    },
    {
      "State": "Iowa",
      "Abbrev": "Iowa",
      "Code": "IA"
    },
    {
      "State": "Kansas",
      "Abbrev": "Kans.",
      "Code": "KS"
    },
    {
      "State": "Kentucky",
      "Abbrev": "Ky.",
      "Code": "KY"
    },
    {
      "State": "Louisiana",
      "Abbrev": "La.",
      "Code": "LA"
    },
    {
      "State": "Maine",
      "Abbrev": "Maine",
      "Code": "ME"
    },
    {
      "State": "Maryland",
      "Abbrev": "Md.",
      "Code": "MD"
    },
    {
      "State": "Massachusetts",
      "Abbrev": "Mass.",
      "Code": "MA"
    },
    {
      "State": "Michigan",
      "Abbrev": "Mich.",
      "Code": "MI"
    },
    {
      "State": "Minnesota",
      "Abbrev": "Minn.",
      "Code": "MN"
    },
    {
      "State": "Mississippi",
      "Abbrev": "Miss.",
      "Code": "MS"
    },
    {
      "State": "Missouri",
      "Abbrev": "Mo.",
      "Code": "MO"
    },
    {
      "State": "Montana",
      "Abbrev": "Mont.",
      "Code": "MT"
    },
    {
      "State": "Nebraska",
      "Abbrev": "Nebr.",
      "Code": "NE"
    },
    {
      "State": "Nevada",
      "Abbrev": "Nev.",
      "Code": "NV"
    },
    {
      "State": "New Hampshire",
      "Abbrev": "N.H.",
      "Code": "NH"
    },
    {
      "State": "New Jersey",
      "Abbrev": "N.J.",
      "Code": "NJ"
    },
    {
      "State": "New Mexico",
      "Abbrev": "N.M.",
      "Code": "NM"
    },
    {
      "State": "New York",
      "Abbrev": "N.Y.",
      "Code": "NY"
    },
    {
      "State": "North Carolina",
      "Abbrev": "N.C.",
      "Code": "NC"
    },
    {
      "State": "North Dakota",
      "Abbrev": "N.D.",
      "Code": "ND"
    },
    {
      "State": "Ohio",
      "Abbrev": "Ohio",
      "Code": "OH"
    },
    {
      "State": "Oklahoma",
      "Abbrev": "Okla.",
      "Code": "OK"
    },
    {
      "State": "Oregon",
      "Abbrev": "Ore.",
      "Code": "OR"
    },
    {
      "State": "Pennsylvania",
      "Abbrev": "Pa.",
      "Code": "PA"
    },
    {
      "State": "Rhode Island",
      "Abbrev": "R.I.",
      "Code": "RI"
    },
    {
      "State": "South Carolina",
      "Abbrev": "S.C.",
      "Code": "SC"
    },
    {
      "State": "South Dakota",
      "Abbrev": "S.D.",
      "Code": "SD"
    },
    {
      "State": "Tennessee",
      "Abbrev": "Tenn.",
      "Code": "TN"
    },
    {
      "State": "Texas",
      "Abbrev": "Tex.",
      "Code": "TX"
    },
    {
      "State": "Utah",
      "Abbrev": "Utah",
      "Code": "UT"
    },
    {
      "State": "Vermont",
      "Abbrev": "Vt.",
      "Code": "VT"
    },
    {
      "State": "Virginia",
      "Abbrev": "Va.",
      "Code": "VA"
    },
    {
      "State": "Washington",
      "Abbrev": "Wash.",
      "Code": "WA"
    },
    {
      "State": "West Virginia",
      "Abbrev": "W.Va.",
      "Code": "WV"
    },
    {
      "State": "Wisconsin",
      "Abbrev": "Wis.",
      "Code": "WI"
    },
    {
      "State": "Wyoming",
      "Abbrev": "Wyo.",
      "Code": "WY"
    }
  ]

}
