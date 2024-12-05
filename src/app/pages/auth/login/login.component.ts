import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LoginDto } from '../../../models/login-dto.model';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  frmLogin: FormGroup;

  authservice: AuthService;
  router: Router;
  constructor(private fb: FormBuilder) {

    this.authservice = inject(AuthService);
    this.router = inject(Router);

    this.frmLogin = this.fb.group({
      ePosta: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit() {
  }

  login(item: LoginDto) {
    this.authservice.login(item).subscribe(resp => {
      debugger;
      if (resp.isSuccess) {
        this.authservice.setLocalToken(resp.data);
        this.router.navigate([""]);
      } else {
        alert(resp.message);
      }
    });
  }





}
