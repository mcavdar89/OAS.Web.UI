import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-app-main',
  standalone:true,
  imports: [RouterOutlet,RouterLink, RouterLinkActive],
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.css']
})
export class AppMainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
