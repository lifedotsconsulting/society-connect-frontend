import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { User, UserRole, Society } from '../models';
import { ThemeService } from './theme.service';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
    public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

    // User Data

    constructor(private themeService: ThemeService, private userService: UserService) {
        this.checkInitialLogin();
    }

    get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    get currentSociety(): Society | null {
        const user = this.currentUserValue;
        if (!user || !user.society) return null;
        return user.society as any;
    }

    async login(username: string, password: string): Promise<User> {
        try {
            const payload = {
                username: username.toUpperCase(),
                password: password,
                deviceId: 'dummy-device-id' // Ideally fetch actual device ID here
            };

            const response = await firstValueFrom(
                this.userService.login(payload)
            );

            const user = response.user;

            // Successful login
            localStorage.setItem('currentUser', JSON.stringify(user));
            if (user.society) {
                localStorage.setItem('currentSociety', JSON.stringify(user.society));
            }
            localStorage.setItem('authTokens', JSON.stringify(response.tokens));
            // Setting device lock in local storage to match existing structure, although backend handles this
            if (user.flatId) {
                localStorage.setItem(`device_lock_${user.flatId}`, username.toUpperCase());
            }

            this.applyUserSocietyTheme(user);
            this.currentUserSubject.next(user);
            return user;
        } catch (error: any) {
            let errorMsg = 'LOGIN.ERRORS.SERVER_ERROR';

            if (error.error && error.error.message) {
                // Use specific backend message if you have it localized or just pass it directly
                // We will map known statuses to translation keys to match prior behavior
                if (error.status === 401) errorMsg = 'LOGIN.ERRORS.INVALID_PASS';
                else if (error.status === 403) errorMsg = 'LOGIN.ERRORS.DEVICE_LOCKED';
                else if (error.status === 404) errorMsg = 'LOGIN.ERRORS.NOT_FOUND';
                else errorMsg = error.error.message;
            } else if (error.status === 401) {
                errorMsg = 'LOGIN.ERRORS.INVALID_PASS';
            } else if (error.status === 403) {
                errorMsg = 'LOGIN.ERRORS.DEVICE_LOCKED';
            } else if (error.status === 404) {
                errorMsg = 'LOGIN.ERRORS.NOT_FOUND';
            }

            throw errorMsg;
        }
    }

    updateCurrentUser(user: User) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        if (user.society) {
            localStorage.setItem('currentSociety', JSON.stringify(user.society));
        }
        this.currentUserSubject.next(user);
    }

    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentSociety');
        this.currentUserSubject.next(null);
    }

    private checkInitialLogin() {
        const storedUser = localStorage.getItem('currentUser');
        const storedSociety = localStorage.getItem('currentSociety');

        if (storedUser) {
            const user: User = JSON.parse(storedUser);
            if (storedSociety) {
                user.society = JSON.parse(storedSociety);
            }
            this.applyUserSocietyTheme(user);
            this.currentUserSubject.next(user);
        }
    }

    private applyUserSocietyTheme(user: User) {
        if (!user || !user.society || !user.society.theme) return;

        let themeData = user.society.theme;
        if (typeof themeData === 'string') {
            try {
                themeData = JSON.parse(themeData as string);
            } catch (e) {
                console.warn('Could not parse society theme', e);
                return;
            }
        }

        if (themeData) {
            this.themeService.setTheme(themeData as any);
        }
    }
}
