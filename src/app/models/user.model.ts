import { Society } from './society.model';
import { UserRole } from './user-role.enum';

export interface User {
    id: string;
    username: string; // Flat Number e.g., B403
    name: String;
    firstName: string;
    lastName: string;
    role: UserRole;
    society: Society;
    flatId: string;
    phone: string;
}
