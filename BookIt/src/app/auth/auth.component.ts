import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  constructor(private authService: AuthService) {}
  isLoginMode: boolean = true;
  error: Error = null;

  authObs: any;

  onSubmit(f: NgForm) {
    this.error = null;
    if (this.isLoginMode) {
      this.authObs = this.authService.Login(f.value.email, f.value.password);
    } else {
      this.authObs = this.authService.Signup(f.value.email, f.value.password);
    }

    this.authObs.subscribe(
      (response) => {
        sessionStorage.setItem('userId', response.id);
      },
      (errorMes) => {
        this.error = errorMes;
      }
    );
    f.reset();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
