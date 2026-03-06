import { User } from './user.model';

export interface SocietyMember extends User {
    societyRole: string;
}
