import { Routes } from '@angular/router';
import { Clientes } from './Views/clientes/clientes';
import { Ventas } from './Views/ventas/ventas';
import { Inventario } from './Views/inventario/inventario';
import { Categorias } from './Views/categorias/categorias';
import { DetalleVentas } from './Views/detalle-ventas/detalle-ventas';
import { Login } from './Views/login/login';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'clientes', component: Clientes },
  { path: '', component: Clientes },
  { path: 'ventas', component: Ventas },
  { path: 'detalle-ventas', component: DetalleVentas },
  { path: 'inventario', component: Inventario },
  { path: 'productos', component: Inventario },
  { path: 'categorias', component: Categorias },
];


