import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from "../user-profile/user-profile.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CommonModule, UserProfileComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private store: Store) {}

 
}