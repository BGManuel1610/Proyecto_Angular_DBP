import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoriasService {
  private readonly url = 'http://localhost:3000/api/v1/categorias';
  constructor(private http: HttpClient) {}
  getCategorias(): Observable<any[]> { return this.http.get<any[]>(this.url); }
  getCategoriaById(id: number): Observable<any> { return this.http.get<any>(`${this.url}/${id}`); }
  crearCategoria(data: any): Observable<any> { return this.http.post<any>(this.url, data); }
  actualizarCategoria(id: number, data: any): Observable<any> { return this.http.put<any>(`${this.url}/${id}`, data); }
  eliminarCategoria(id: number): Observable<any> { return this.http.delete<any>(`${this.url}/${id}`); }
}
