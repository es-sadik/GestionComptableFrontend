import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/modules/user/user-auth.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  constructor(public userAuthService : UserAuthService) { }

  ngOnInit(): void {
    
  }

}
