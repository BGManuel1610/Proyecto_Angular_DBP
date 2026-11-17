
import { Component } from '@angular/core';
import { ProveedoresService } from '../../Services/proveedores';

@Component({
  selector: 'app-proveedores',
  imports: [],
  templateUrl: './proveedores.html',
  styleUrl: './proveedores.css',
})
export class Proveedores {

constructor(public proveedoresService: ProveedoresService) {
this.proveedoresService.getProveedores().subscribe((data:any[]) => {
console.log(data);

})
}
}
