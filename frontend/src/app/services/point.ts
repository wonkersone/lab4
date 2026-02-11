import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Point } from '../models/point.model';

@Injectable({
  providedIn: 'root'
})
export class PointService {
  private apiUrl = '/lab4-1.0/api/points';

  constructor(private http: HttpClient) { }

  getPoints(owner: string): Observable<Point[]> {
    return this.http.get<Point[]>(`${this.apiUrl}?owner=${owner}`);
  }

  addPoint(point: Point): Observable<Point> {
    return this.http.post<Point>(this.apiUrl, point);
  }

  clearPoints(owner: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}?owner=${owner}`);
  }
}
