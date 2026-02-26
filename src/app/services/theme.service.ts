import { Injectable } from '@angular/core';
import { SocietyTheme } from '../models/core.models';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private darkModeStatus = false;

    constructor() { }

    public initializeTheme() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'dark') {
            this.setDarkMode(true);
        } else if (savedTheme === 'light') {
            this.setDarkMode(false);
        } else {
            // No saved preference, use system preference
            this.setDarkMode(prefersDark.matches);
        }

        // Optional: listen for system theme changes if no saved preference
        prefersDark.addEventListener('change', (mediaQuery) => {
            if (!localStorage.getItem('theme')) {
                this.setDarkMode(mediaQuery.matches);
            }
        });
    }

    public toggleTheme() {
        this.setDarkMode(!this.darkModeStatus);
    }

    public setDarkMode(isDark: boolean) {
        this.darkModeStatus = isDark;
        document.documentElement.classList.toggle('ion-palette-dark', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    public setTheme(theme: SocietyTheme) {
        document.documentElement.style.setProperty('--ion-color-primary', theme.primaryColor);
        document.documentElement.style.setProperty('--ion-color-secondary', theme.secondaryColor);
        document.documentElement.style.setProperty('--ion-color-tertiary', theme.tertiaryColor);
    }

    public get isDark(): boolean {
        return this.darkModeStatus;
    }
}
