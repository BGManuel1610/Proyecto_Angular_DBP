import { Component, ChangeDetectorRef } from '@angular/core';
import { DetalleVentasService } from '../../Services/detalle-ventas';
import { Table } from '../../Components/table/table';

@Component({
  selector: 'app-detalle-ventas',
  imports: [Table],
  templateUrl: './detalle-ventas.html',
  styleUrl: './detalle-ventas.css',
})
export class DetalleVentas {
  data: any[] = [];
  ventaId = '';

  constructor(private detalleVentasService: DetalleVentasService, private cdr: ChangeDetectorRef) {}

  cargar(): void {
    const id = Number(this.ventaId);
    if (!Number.isInteger(id) || id <= 0) return;
    this.detalleVentasService.getDetallesPorVenta(id).subscribe((rows: any[]) => {
      this.data = rows;
      this.cdr.detectChanges();
    });
  }
}



