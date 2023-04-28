import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/modules/user/user-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sideBarOpen = true;

  constructor() { }

  ngOnInit() { 
    
  }


  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
