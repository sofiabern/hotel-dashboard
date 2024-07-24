import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

// Services
import { AuthApiService } from '../../../auth/auth.service';



@Component({
  selector: 'app-user-greeting',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './user-greeting.component.html',
  styleUrl: './user-greeting.component.css'
})
export class UserGreetingComponent {
  userName$: Observable<string | null>;
  isAuthenticated$: Observable<boolean>;

  constructor(private authApiService: AuthApiService) {
    this.userName$ = this.authApiService.currentUsername$;
    this.isAuthenticated$ = this.authApiService.isAuthenticated$;
  }

}
