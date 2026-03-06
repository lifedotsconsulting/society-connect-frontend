import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Society } from '../models';

@Injectable({
    providedIn: 'root'
})
export class SocietyService {
    private apiUrl = `${environment.apiUrl}/societies`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<Society[]> {
        return this.http.get<Society[]>(this.apiUrl);
    }

    getById(id: string): Observable<Society> {
        return this.http.get<Society>(`${this.apiUrl}/${id}`);
    }

    create(society: Society): Observable<Society> {
        return this.http.post<Society>(this.apiUrl, society);
    }

    update(id: string, society: Partial<Society>): Observable<Society> {
        return this.http.put<Society>(`${this.apiUrl}/${id}`, society);
    }

    delete(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
