import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {
  private apiUrl = 'https://www.carnesag.cl/ngdrive/api/vehiculos.php';

  constructor(private http: HttpClient) { }

  // Método para obtener los vehículos
  getVehiculos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

}
