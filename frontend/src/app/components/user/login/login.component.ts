  import { Component, OnInit } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
  import { Router } from '@angular/router';
  import { Store } from '@ngrx/store';
  import { Observable } from 'rxjs';
  import { selectIsLoggedIn } from '../../../store/user/user.selectors';
  import * as UserActions from '../../../store/user/user.actions';

  @Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent implements OnInit {
    formData!: FormGroup;
    isLoggedIn$: Observable<boolean>;

    constructor(
      private fb: FormBuilder,
      private router: Router,
      private store: Store
    ) {
      this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    }

    ngOnInit(): void {
      this.formData = this.fb.group({
        'email': ['', [Validators.required, Validators.email]],
        'password': ['', [Validators.required]]
      });

      this.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.router.navigate(['home']);
        }
      });
    }

    login() {
      console.log("loginin'")
      if (this.formData.valid) {
        console.log('form vaid blockiiiilll')
      
        this.store.dispatch(UserActions.login({ 
          email: this.formData.get('email')?.value, 
          password: this.formData.get('password')?.value 
        }));
        
      }
    }
  }