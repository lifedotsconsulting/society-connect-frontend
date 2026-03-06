import { SocietyTheme } from './society-theme.model';

export interface Society {
    id: string;
    name: string;
    address: string;
    theme: SocietyTheme;
}
