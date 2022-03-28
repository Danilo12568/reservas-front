import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompradoresService } from '../compradores/services/compradores.service';
import { EventosService } from '../eventos/services/eventos.service';
import { ReservasService } from './services/reservas.service';
import { Eventos } from 'src/app/interfaces/eventos.interface';
import { Compradores } from 'src/app/interfaces/compradores.interface';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  formulario = new FormGroup({});
  formularioEvento = new FormGroup({});
  formularioComprador = new FormGroup({});
  searchFilter: string = '';


  eventos: Eventos[] = [];
  eventosFilter: Eventos[] = [];
  compradores: Compradores[] = [];

  constructor(
    private fb: FormBuilder,
    private reservasService: ReservasService,
    private eventosService: EventosService,
    private compradoresService: CompradoresService,
  ) { }

  ngOnInit(): void {
    this.initFormEvento();
    this.initFormComprador();
    this.getEventos();
    this.getCompradores();
  }

  /** Inicializa el formulario de eventos con sus valores por defecto y validaciones */
  initFormEvento = () => {
    this.formularioEvento = this.fb.group({
      id_evento: [{ disabled: true, value: '' }, [Validators.required]],
      descripcion: [{ disabled: true, value: '' }, [Validators.required]],
      lugar: [{ disabled: true, value: '' }, [Validators.required]],
      fecha: [{ disabled: true, value: '' }, [Validators.required]],
      boletas_disponibles: [{ disabled: true, value: '' }, [Validators.required]],
    });
  }

  /** Inicializa el formulario de eventos con sus valores por defecto y validaciones */
  initFormComprador = () => {
    this.formularioComprador = this.fb.group({
      id_comprador: [{ disabled: true, value: '' }, [Validators.required]],
      identificacion: [{ disabled: true, value: '' }, [Validators.required]],
      nombre: [{ disabled: true, value: '' }, [Validators.required]],
      correo: [{ disabled: true, value: '' }, [Validators.required]],
      telefono: [{ disabled: true, value: '' }, [Validators.required]],
    });
  }

  getEventos = () => {
    this.eventosService.getEventos().subscribe(res => {
      this.eventos = res;
    });
  }

  getCompradores = () => {
    this.compradoresService.getCompradores().subscribe(res => {
      this.compradores = res;
    })
  }

  guardarReserva = () => {
    let data = {
      evento: this.formularioEvento.value,
      comprador: this.formularioComprador.value,
    }
    
    this.reservasService.guardarReserva(data).subscribe(res => {
      alert('Guardado');
    });
  }

  autocompletarEvento = (value: string) => {
    const evento = this.eventos.find(elm => elm.descripcion === value);
    this.setValueEvento(evento ? evento : { id_evento: '', descripcion: '', lugar: '', fecha: '', boletas_disponibles: '' });
  }

  setValueEvento = (evento: any) => Object.keys(evento).forEach(elm =>
    this.formularioEvento.get(elm)?.setValue(evento[elm])
  );

  autocompletarComprador = (value: string) => {
    const comprador = this.compradores.find(elm => elm.identificacion === value);
    this.setValueComprador(comprador ? comprador : { id_comprador: '', identificacion: '', nombre: '', correo: '', telefono: '' });
  }

  setValueComprador = (comprador: any) => Object.keys(comprador).forEach(elm =>
    this.formularioComprador.get(elm)?.setValue(comprador[elm])
  );

}
