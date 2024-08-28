import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserServiceService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {


  formData!:FormGroup;
  router = inject(Router)
  constructor(private fb:FormBuilder,private userService:UserServiceService){}
  ngOnInit(): void {
      this.formData = this.fb.group({
        'email':['',[Validators.required,Validators.email]],
        'password':['',[Validators.required,]]
      })
  }

  login(){
    if(this.formData.valid){
      const userData = {
        email:this.formData.get('email')?.value,
        password:this.formData.get('password')?.value,
      }

      console.log(userData)
      this.userService.login(userData)
      .subscribe(
        (response) => {
          console.log('Registration successfull',response)
          this.router.navigate(['home'])
        },(error) => {
          console.log('Registration failed',error)
        }
      )
    }
   
  }
}
