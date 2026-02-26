import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './models/core.models';
import { Router } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { LanguageService } from './services/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'MENU.DASHBOARD', url: '/folder/dashboard', icon: 'grid' },
    { title: 'MENU.MEMBERS', url: '/folder/members', icon: 'people' },
    { title: 'MENU.COMMITTEE', url: '/folder/committee', icon: 'ribbon' },
    { title: 'MENU.MAINTENANCE', url: '/folder/maintenance', icon: 'card' },
    { title: 'MENU.EVENTS', url: '/folder/events', icon: 'calendar' },
    { title: 'MENU.COMPLAINTS', url: '/folder/complaints', icon: 'warning' },
    { title: 'MENU.VEHICLES', url: '/folder/vehicles', icon: 'car' },
    { title: 'MENU.CONTACTS', url: '/folder/contacts', icon: 'call' },
    { title: 'MENU.SETTINGS', url: '/settings', icon: 'settings' },
  ];

  currentUser: User | null = null;
  societyName: string = '';
  societyLogo: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    public themeService: ThemeService,
    public languageService: LanguageService
  ) {
    this.themeService.initializeTheme();
    this.languageService.initLanguage();
  }
  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      const society = this.authService.currentSociety;
      if (society) {
        this.societyName = society.name;
        this.societyLogo = society.theme.logoUrl;
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
