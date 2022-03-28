import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Eventos } from 'src/app/interfaces/eventos.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  ruta = environment.api;

  constructor(private http: HttpClient) { }

  guardarEvento = (data: any): Observable<any> => {
    return this.http.post<any>(`${this.ruta}/evento/guardar-evento`, data);
  }

  getEventos = (): Observable<Eventos[]> => {
    return this.http.get<Eventos[]>(`${this.ruta}/evento/traer-eventos`);
  }
}
