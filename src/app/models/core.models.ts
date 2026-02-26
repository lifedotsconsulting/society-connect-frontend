export enum UserRole {
    Admin = 'Admin',
    Chairman = 'Chairman',
    DeputyChairman = 'Deputy Chairman',
    Secretory = 'Secretory',
    FlatOwner = 'FlatOwner',
    Tenant = 'Tenant'
}

export interface SocietyTheme {
    primaryColor: string;
    secondaryColor: string;
    tertiaryColor: string;
    logoUrl: string;
}

export interface Society {
    id: string;
    name: string;
    address: string;
    theme: SocietyTheme;
}

export interface Flat {
    id: string; // e.g., B403
    building: string;
    number: string;
}

export interface User {
    id: string;
    username: string; // Flat Number e.g., B403
    firstName: string;
    lastName: string;
    role: UserRole;
    societyId: string;
    flatId: string;
    phone: string;
}

export interface Vehicle {
    id: string;
    userId: string;
    registrationNumber: string;
    type: 'Car' | 'Bike';
}

export interface Complaint {
    id: string;
    userId: string;
    title: string;
    description: string;
    status: 'Open' | 'In Progress' | 'Resolved';
    dateCreated: Date;
}

export interface MaintenanceDue {
    id: string;
    userId: string;
    month: string;
    amount: number;
    status: 'Pending' | 'Paid';
    dueDate: Date;
}
