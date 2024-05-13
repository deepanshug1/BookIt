import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService) {}

  userSub: Subscription;
  isLoggedin: Boolean = false;
  isAdmin: Boolean = false;
  adminSub: Subscription;

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((res) => {
      if (res) {
        this.isLoggedin = true;
      } else {
        this.isLoggedin = false;
      }
    });

    this.adminSub = this.authService.isAdmin.subscribe((res) => {
      if (res) {
        this.isAdmin = res;
      } else {
        this.isAdmin = false;
      }
    });
  }

  onlogout() {
    this.authService.Logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.adminSub.unsubscribe();
  }
}
