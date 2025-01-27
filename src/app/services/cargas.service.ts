import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargasService {
  private apiUrl = 'https://www.carnesag.cl/ngdrive/api/obtenerCargas.php';

  constructor(private http: HttpClient) { }

  obtenerCargas(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }

  // cargas.service.ts
  obtenerGastoMes(): Observable<any> {
    const apiUrl = 'https://www.carnesag.cl/ngdrive/api/gastosMes.php';
    return this.http.get<any>(apiUrl);
  }


}
