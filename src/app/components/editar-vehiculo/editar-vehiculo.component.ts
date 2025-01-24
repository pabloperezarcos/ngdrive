import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehiculosService } from '../../services/vehiculos.service';

@Component({
  selector: 'app-editar-vehiculo',
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-vehiculo.component.html',
  styleUrl: './editar-vehiculo.component.scss'
})
export class EditarVehiculoComponent implements OnInit {
  vehiculo: any = {
    patente: '',
    dv: '',
    marca: '',
    modelo: '',
    anno: null,
    nro_motor: '',
    nro_chasis: '',
    estado: 'operativa',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehiculosService: VehiculosService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.obtenerVehiculo(id);
    }
  }

  obtenerVehiculo(id: string): void {
    this.vehiculosService.getVehiculoById(id).subscribe({
      next: (data) => {
        if (data.success) {
          this.vehiculo = data.data;
        } else {
          alert('Vehículo no encontrado');
          this.router.navigate(['/vehiculos']);
        }
      },
      error: (error) => {
        console.error('Error al obtener el vehículo:', error);
        alert('Error al cargar el vehículo');
      },
    });
  }

  editarVehiculo(): void {
    this.vehiculosService.updateVehiculo(this.vehiculo).subscribe({
      next: (response) => {
        alert('Vehículo actualizado exitosamente');
        this.router.navigate(['/vehiculos']);
      },
      error: (error) => {
        console.error('Error al actualizar el vehículo:', error);
        alert('Hubo un error al actualizar el vehículo');
      },
    });
  }
}