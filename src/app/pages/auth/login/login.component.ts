import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LoginDto } from '../../../models/login-dto.model';

@Component({
  selector: 'app-login',
  standalone:true,
  imports:[ReactiveFormsModule,InputTextModule,ButtonModule  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  frmLogin:FormGroup;
  constructor(private fb:FormBuilder) {
    this.frmLogin = this.fb.group({
      ePosta:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(2)]]
    });
   }

  ngOnInit() {
  }

  login(item:LoginDto){
    
  }





}
