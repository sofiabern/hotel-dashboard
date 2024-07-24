import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';


import { MatIconModule } from '@angular/material/icon';

// Components
import { AuthButtonsComponent } from './auth-buttons/auth-buttons.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { MobileNavMenuComponent } from './mobile-nav-menu/mobile-nav-menu.component';
import { UserGreetingComponent } from './user-greeting/user-greeting.component';

// Services
import { AuthApiService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ MatIconModule, AuthButtonsComponent, NavMenuComponent, MobileNavMenuComponent, UserGreetingComponent, AsyncPipe, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {
  isAuthenticated$: Observable<boolean>;
  isMobileMenuOpen = false;

  constructor(private authService: AuthApiService) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }




  openMobileMenu(): void {
    this.isMobileMenuOpen = true;
    document.body.classList.add('no-scroll');
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    document.body.classList.remove('no-scroll');
  }

}
