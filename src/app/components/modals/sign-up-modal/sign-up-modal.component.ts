import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

// Services
import { AuthApiService } from '../../../auth/auth.service';

// Material
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatError } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@Component({
  selector: 'app-sign-up-modal',
  standalone: true,
  imports: [ FormsModule, NgIf, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, MatIconModule, MatError, MatProgressSpinnerModule ],
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})
export class SignUpModalComponent {
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<SignUpModalComponent>,
    private authService: AuthApiService,
    private router: Router
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitForm(signUpForm: NgForm): void {
    if (signUpForm.valid) {
      this.loading = true;
      this.authService.signupAndLogin(signUpForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.dialogRef.close();
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.loading = false;
          console.error('Signup failed', err);
        }
      });
    }
  }
}
