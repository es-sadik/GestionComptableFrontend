import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/modules/user/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public userService :UserService) { }

  ngOnInit(): void {
    
  }
  panelOpenState = true;
  
}
