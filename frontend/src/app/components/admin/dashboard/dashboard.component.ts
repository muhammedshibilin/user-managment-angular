import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule,NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  users: any[] = [];
  filteredUsers: any[] = [];
  searchQuery: string = '';
  editUserId: number | null = null;
  editableUser: any = null; 
  selectedImageFile: File | null = null; 
  adminService = inject(AdminService);

  constructor() {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this.adminService.getUsers().subscribe(
      (data) => {
        this.users = data;
        this.filteredUsers = data;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }
  filterUsers(): void {
    this.filteredUsers = this.users.filter(user => 
      user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  
  editUser(user: any): void {
    this.editUserId = user.id; 
    this.editableUser = { ...user }; 
    this.selectedImageFile = null
  }

 
  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.editableUser.image_url = e.target.result; 
      };
      reader.readAsDataURL(file);
    }
  }

  saveUser(): void {
    console.log('save user')
    if (this.editUserId && this.editableUser) {
      this.adminService.updateUser(this.editUserId, this.editableUser, this.selectedImageFile).subscribe(
        (response) => {
          const index = this.users.findIndex(user => user.id === this.editUserId);
          if (index !== -1) {
            this.users[index] = { ...response }; 
            this.filteredUsers = [...this.users]; 
          }
          this.editUserId = null;
          this.editableUser = null;
          this.selectedImageFile = null;
        },
        (error) => {
          console.error('Error saving user details', error);
        }
      );
    }
  }

  cancelEdit(): void {
    this.editUserId = null; 
    this.editableUser = null;
    this.selectedImageFile = null;
  }

  

  deleteUser(user: any): void {
    console.log("ahiii user delete sucedssulll")
    this.adminService.deleteUser(user.id).subscribe(
      response => {
        console.log('User deleted successfully', response);
        localStorage.removeItem('authToken');
        this.loadUsers();
      },
      error => {
        console.error('Error deleting user', error);
      }
    );
  }
}