import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  formData!:FormGroup;
  selectedFile:File | null = null;

  constructor(private fb:FormBuilder,private userService:UserServiceService){}

  router = inject(Router)

ngOnInit(): void {
  this.formData = this.fb.group({
    name:['',[Validators.required,Validators.minLength(5)]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]],
    confirmPassword:['',Validators.required],
    imageUrl:['']

  },{Validators:this.passwordMatchValidator})

}
passwordMatchValidator(form:FormGroup){
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password&&confirmPassword&&password.value === confirmPassword.value?null:{mismatch:true}
  }

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0] as File;
  }

  register(){
    if(this.formData.valid&&this.selectedFile){
      const formData = new FormData();
      formData.append('name',this.formData.get('name')?.value)
      formData.append('email',this.formData.get('email')?.value)
      formData.append('password',this.formData.get('password')?.value)
      formData.append('image',this.selectedFile,this.selectedFile.name)

      this.userService.register(formData)
      .subscribe(
        (response) => {
          console.log('Registration successfull',response)
          this.router.navigate(['login'])
        },(error) => {
          console.log('Registration failed',error)
        }
      )
    }
  }
}
