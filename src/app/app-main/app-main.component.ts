import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserDto } from '../models/user-dto.model';

@Component({
  selector: 'app-app-main',
  standalone:true,
  imports: [RouterOutlet,RouterLink, RouterLinkActive],
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.css']
})
export class AppMainComponent implements OnInit {

  private _authService: AuthService;
  userDto?:UserDto;
  constructor() { 
    this._authService = inject(AuthService);
  }

  ngOnInit() {
    this.userDto = this._authService.getLocalUser();
  }

}
