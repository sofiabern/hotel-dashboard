import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ComponentType } from '@angular/cdk/portal';
import { SignUpModalComponent } from '../../modals/sign-up-modal/sign-up-modal.component';
import { LogInModalComponent } from '../../modals/log-in-modal/log-in-modal.component';
import { AuthApiService } from '../../../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderComponent } from '../../loader/loader.component';


@Component({
  selector: 'app-auth-buttons',
  standalone: true,
  imports: [AsyncPipe, MatProgressSpinnerModule, LoaderComponent],
  templateUrl: './auth-buttons.component.html',
  styleUrls: ['./auth-buttons.component.css']
})
export class AuthButtonsComponent {
  isAuthenticated$: Observable<boolean>;
  loading = false;

  constructor(public dialog: MatDialog, private authService: AuthApiService) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  openDialog(component: ComponentType<SignUpModalComponent | LogInModalComponent>): void {
    this.dialog.open(component, {
      disableClose: false
    });
  }

  openSignUpDialog(): void {
    this.openDialog(SignUpModalComponent);
  }

  openLogInDialog(): void {
    this.openDialog(LogInModalComponent);
  }

  logOut(): void {
    this.loading = true;
    this.authService.logout().subscribe({
      next: () => {
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        console.error(error);
      }
    });
  }
}
