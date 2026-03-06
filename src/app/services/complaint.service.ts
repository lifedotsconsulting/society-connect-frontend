import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Complaint {
    id?: string;
    userId?: string;
    flatNumber?: string;
    title?: string;
    description?: string;
    status?: string;
    createdAt?: Date;
}

@Injectable({
    providedIn: 'root'
})
export class ComplaintService {
    private apiUrl = `${environment.apiUrl}/complaints`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<Complaint[]> {
        return this.http.get<Complaint[]>(this.apiUrl);
    }

    getById(id: string): Observable<Complaint> {
        return this.http.get<Complaint>(`${this.apiUrl}/${id}`);
    }

    create(complaint: Complaint): Observable<Complaint> {
        return this.http.post<Complaint>(this.apiUrl, complaint);
    }

    update(id: string, complaint: Complaint): Observable<Complaint> {
        return this.http.put<Complaint>(`${this.apiUrl}/${id}`, complaint);
    }

    delete(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
