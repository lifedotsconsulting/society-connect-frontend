import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Flat {
    id?: string;
    number?: string;
    building?: string;
    type?: string;
}

@Injectable({
    providedIn: 'root'
})
export class FlatService {
    private apiUrl = `${environment.apiUrl}/flats`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<Flat[]> {
        return this.http.get<Flat[]>(this.apiUrl);
    }

    getById(id: string): Observable<Flat> {
        return this.http.get<Flat>(`${this.apiUrl}/${id}`);
    }

    create(flat: Flat): Observable<Flat> {
        return this.http.post<Flat>(this.apiUrl, flat);
    }

    update(id: string, flat: Flat): Observable<Flat> {
        return this.http.put<Flat>(`${this.apiUrl}/${id}`, flat);
    }

    delete(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
