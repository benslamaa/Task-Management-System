import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  signupForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
                      private fb: FormBuilder,
                      private authService: AuthService,
                      private router: Router
              ) {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value
      ? null : { 'passwordMismatch': true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);

    }
    this.authService.signup(this.signupForm.value).subscribe((res) => {
      console.log(res);
      if (res.id != null) {
        Swal.fire({
          title: 'Success!',
          text: 'Sign up successfully',
          icon: 'success',
          confirmButtonText: 'OK',
          timer: 5000
        }).then(() => {
          this.router.navigateByUrl('/login');
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to sign up',
          icon: 'error',
          confirmButtonText: 'Close',
          timer: 5000
        });
      }
    }, error => {
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred',
        icon: 'error',
        confirmButtonText: 'Close',
        timer: 5000
      });
    });

  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword') {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }



}
