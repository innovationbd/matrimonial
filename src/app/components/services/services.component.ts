import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {SharedService} from 'app/shared.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  test : Date = new Date();
  focus;
  focus1;
  isAdmin;

  constructor(private service:SharedService) { }

  ngOnInit(): void {
    this.isAdmin = this.service.isAdmin();
  }


}
