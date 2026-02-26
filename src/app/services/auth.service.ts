import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserRole, Society } from '../models/core.models';
import { ThemeService } from './theme.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
    public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

    // Mock Societies
    private mockSocieties: Society[] = [
        {
            id: 'soc_01', name: 'Sunrise Apartments', address: '123 Main St',
            theme: { primaryColor: '#3880ff', secondaryColor: '#3dc2ff', tertiaryColor: '#5260ff', logoUrl: 'assets/logo_sunrise.png' }
        },
        {
            id: 'soc_02', name: 'Moonlight Towers', address: '456 Oak Avenue',
            theme: { primaryColor: '#2dd36f', secondaryColor: '#ffc409', tertiaryColor: '#eb445a', logoUrl: 'assets/logo_moonlight.png' }
        }
    ];

    // Mock Users
    private mockUsers: User[] = [
        { id: 'u_01', username: 'A101', firstName: 'John', lastName: 'Admin', role: UserRole.Admin, societyId: 'soc_01', flatId: 'A101', phone: '1234567890' },
        { id: 'u_02', username: 'B403', firstName: 'Jane', lastName: 'Owner', role: UserRole.FlatOwner, societyId: 'soc_01', flatId: 'B403', phone: '0987654321' },
        { id: 'u_03', username: 'C202', firstName: 'Bob', lastName: 'Chairman', role: UserRole.Chairman, societyId: 'soc_02', flatId: 'C202', phone: '1122334455' }
    ];

    constructor(private themeService: ThemeService) {
        this.checkInitialLogin();
    }

    get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    get currentSociety(): Society | null {
        const user = this.currentUserValue;
        if (!user) return null;
        return this.mockSocieties.find(s => s.id === user.societyId) || null;
    }

    login(username: string, password: string): Promise<User> {
        return new Promise((resolve, reject) => {
            // Mock logic: Password must be 'password123'
            if (password !== 'password123') {
                return reject('LOGIN.ERRORS.INVALID_PASS');
            }

            const user = this.mockUsers.find(u => u.username.toUpperCase() === username.toUpperCase());
            if (!user) {
                return reject('LOGIN.ERRORS.NOT_FOUND');
            }

            // Device lock logic: only one device per flat
            const registeredDeviceUser = localStorage.getItem(`device_lock_${user.flatId}`);
            if (registeredDeviceUser && registeredDeviceUser !== username.toUpperCase()) {
                return reject('LOGIN.ERRORS.DEVICE_LOCKED');
            }

            // Successful login
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem(`device_lock_${user.flatId}`, username.toUpperCase());

            this.applyUserSocietyTheme(user);
            this.currentUserSubject.next(user);
            resolve(user);
        });
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    private checkInitialLogin() {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            const user: User = JSON.parse(storedUser);
            this.applyUserSocietyTheme(user);
            this.currentUserSubject.next(user);
        }
    }

    private applyUserSocietyTheme(user: User) {
        const society = this.mockSocieties.find(s => s.id === user.societyId);
        if (society) {
            this.themeService.setTheme(society.theme);
        }
    }
}
