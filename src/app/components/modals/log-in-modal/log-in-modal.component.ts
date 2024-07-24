import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

// Services
import { AuthApiService } from '../../../auth/auth.service';

// Modal
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatError } from '@angular/material/form-field';

// Etc
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@Component({
  selector: 'app-log-in-modal',
  standalone: true,
  imports: [FormsModule, NgIf, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatError, MatProgressSpinnerModule],
  templateUrl: './log-in-modal.component.html',
  styleUrls: ['./log-in-modal.component.css']
})
export class LogInModalComponent {
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<LogInModalComponent>,
    private authService: AuthApiService,
    private router: Router
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitForm(form: NgForm): void {
    if (form.valid) {
      this.loading = true;
      this.authService.login(form.value).subscribe({
        next: () => {
          this.loading = false;
          this.dialogRef.close();
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.loading = false;
          console.error('Login failed', err);
        }
      });
    }
  }
}
