import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ClientesService } from '../../Services/clientes';
import { Table } from '../../Components/table/table';

@Component({
  selector: 'app-clientes',
  imports: [Table],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css',
})
export class Clientes implements OnInit {
  data: any[] = [];

  constructor(private clientesService: ClientesService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.clientesService.getClientes().subscribe((rows: any[]) => {
      this.data = rows;
      this.cdr.detectChanges();
    });
  }
}



