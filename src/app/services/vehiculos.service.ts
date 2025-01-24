import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {
  private apiUrl = 'https://www.carnesag.cl/ngdrive/api/vehiculos.php';

  constructor(private http: HttpClient) { }

  // Método para obtener los vehículos
  getVehiculos(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }

  // Método para obtener vehículo por su ID
  getVehiculoById(id: string): Observable<any> {
    const apiUrl = `https://www.carnesag.cl/ngdrive/api/obtenerVehiculo.php?id=${id}`;
    return this.http.get<any>(apiUrl);
  }

  // Método para obtener los propietarios
  getPropietarios(): Observable<any> {
    const apiUrl = 'https://www.carnesag.cl/ngdrive/api/obtenerPropietarios.php';
    return this.http.get<any>(apiUrl);
  }

  // Método para contar la cantidad de vehículos
  getTotalVehiculos(): Observable<any> {
    const apiUrl = 'https://www.carnesag.cl/ngdrive/api/contarVehiculos.php';
    return this.http.get<any>(apiUrl);
  }

  // Método para agregar un vehículo
  addVehiculo(vehiculo: any): Observable<any> {
    const apiUrl = 'https://www.carnesag.cl/ngdrive/api/crearVehiculo.php';
    return this.http.post<any>(apiUrl, vehiculo);
  }

  // Método para editar un vehículo
  updateVehiculo(vehiculo: any): Observable<any> {
    const apiUrl = `https://www.carnesag.cl/ngdrive/api/editarVehiculo.php`;
    return this.http.put<any>(apiUrl, vehiculo);
  }


}