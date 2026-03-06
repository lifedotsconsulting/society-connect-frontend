import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SocietyMember } from '../models';

@Injectable({
    providedIn: 'root'
})
export class SocietyMemberService {
    private apiUrl = `${environment.apiUrl}/society-members`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<SocietyMember[]> {
        return this.http.get<SocietyMember[]>(this.apiUrl);
    }

    getById(id: string): Observable<SocietyMember> {
        return this.http.get<SocietyMember>(`${this.apiUrl}/${id}`);
    }

    create(member: SocietyMember): Observable<SocietyMember> {
        return this.http.post<SocietyMember>(this.apiUrl, member);
    }

    update(id: string, member: Partial<SocietyMember>): Observable<SocietyMember> {
        return this.http.put<SocietyMember>(`${this.apiUrl}/${id}`, member);
    }

    delete(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
