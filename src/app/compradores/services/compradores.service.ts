import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Compradores } from 'src/app/interfaces/compradores.interface';

@Injectable({
  providedIn: 'root'
})
export class CompradoresService {

  ruta = environment.api;

  constructor(private http: HttpClient) { }

  guardarComprador = (data: any): Observable<any> => {
    return this.http.post<any>(`${this.ruta}/comprador/guardar-comprador`, data);
  }

  getCompradores = (): Observable<Compradores[]> => {
    return this.http.get<Compradores[]>(`${this.ruta}/comprador/traer-compradores`);
  }
}
