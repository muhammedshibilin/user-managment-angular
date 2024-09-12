import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { AdminService } from '../service/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [NavbarComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  router = inject(Router)
  userForm: FormGroup;
  imageUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      image: [null] 
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedFile = file; 
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.userForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const userData = {
      name: this.userForm.get('name')?.value,
      email: this.userForm.get('email')?.value
    };

    this.adminService.createUser(userData, this.selectedFile).subscribe(
      response => {
        console.log('created successfully',response)
       this.router.navigate(['/admin/dashboard/users'])
      },
      error => {
        console.error('Error creating user', error);
      }
    );
  }
}
