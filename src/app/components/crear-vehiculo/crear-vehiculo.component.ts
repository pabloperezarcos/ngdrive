import { Component, OnInit } from '@angular/core';
import { VehiculosService } from '../../services/vehiculos.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-crear-vehiculo',
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-vehiculo.component.html',
  styleUrl: './crear-vehiculo.component.scss'
})
export class CrearVehiculoComponent implements OnInit {

  vehiculo = {
    patente: '',
    dv: '',
    marca: '',
    modelo: '',
    anno: null,
    nro_motor: '',
    nro_chasis: '',
    estado: 'operativa',
    propietario_id_propietario: null
  };

  propietarios: any[] = [];

  ngOnInit(): void {
    this.cargarPropietarios();
  }

  constructor(private vehiculosService: VehiculosService, private router: Router) { }

  cargarPropietarios(): void {
    this.vehiculosService.getPropietarios().subscribe({
      next: (response) => {
        this.propietarios = response.data;
      },
      error: (error) => {
        console.error('Error al cargar propietarios:', error);
      },
    });
  }

  crearVehiculo(): void {
    this.vehiculosService.addVehiculo(this.vehiculo).subscribe({
      next: (response) => {
        console.log('Vehículo creado:', response);
        alert('Vehículo creado exitosamente');
        this.router.navigate(['/vehiculos']);
      },
      error: (error) => {
        console.error('Error al crear el vehículo:', error);
        alert('Hubo un error al crear el vehículo');
      },
    });
  }
}