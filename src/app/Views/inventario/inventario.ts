import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductosService } from '../../Services/productos';
import { Table } from '../../Components/table/table';

@Component({
  selector: 'app-inventario',
  imports: [Table],
  templateUrl: './inventario.html',
  styleUrl: './inventario.css',
})
export class Inventario implements OnInit {
  data: any[] = [];

  constructor(private productosService: ProductosService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.productosService.getProductos().subscribe((rows: any[]) => {
      this.data = rows;
      this.cdr.detectChanges();
    });
  }
}



