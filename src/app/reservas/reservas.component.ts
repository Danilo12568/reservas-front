import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompradoresService } from '../compradores/services/compradores.service';
import { EventosService } from '../eventos/services/eventos.service';
import { ReservasService } from './services/reservas.service';
import { Eventos } from 'src/app/interfaces/eventos.interface';
import { Compradores } from 'src/app/interfaces/compradores.interface';
import { Reservas } from '../interfaces/reservas.interface';

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
  reservas: Reservas[] = [];
  boletas_disponibles!: number;

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
    this.getReservas()
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

  /** Inicializa el formulario de compradores con sus valores por defecto y validaciones */
  initFormComprador = () => {
    this.formularioComprador = this.fb.group({
      id_comprador: [{ disabled: true, value: '' }, [Validators.required]],
      identificacion: [{ disabled: true, value: '' }, [Validators.required]],
      nombre: [{ disabled: true, value: '' }, [Validators.required]],
      correo: [{ disabled: true, value: '' }, [Validators.required]],
      telefono: [{ disabled: true, value: '' }, [Validators.required]],
      nro_boletas: [{ disabled: true, value: '' }, [Validators.required]],
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

  getReservas = () => {
    this.reservasService.getReservas().subscribe(res => {
      this.reservas = res;
    })
  }

  guardarReserva = () => {
    this.formularioComprador.get('id_comprador')?.enable();
    this.formularioComprador.get('identificacion')?.enable();
    this.formularioComprador.get('nombre')?.enable();
    this.formularioComprador.get('correo')?.enable();
    this.formularioComprador.get('telefono')?.enable();

    let data = {
      evento: this.formularioEvento.value,
      comprador: this.formularioComprador.value,
    }

    console.log(data);
    
    this.reservasService.guardarReserva(data).subscribe(res => {
      this.formularioComprador.get('id_comprador')?.disable();
      this.formularioComprador.get('identificacion')?.disable();
      this.formularioComprador.get('nombre')?.disable();
      this.formularioComprador.get('correo')?.disable();
      this.formularioComprador.get('telefono')?.disable();
      alert('Guardado');
    });
  }

  autocompletarEvento = (value: string) => {
    const id = value.split('. ')[0];
    const texto = value.split('. ')[1];
    const datos_evento = this.eventos.find(elm => elm.id_evento === +id);
    console.log(this.reservas);
    const reservas = this.reservas.filter(elm => elm.id_evento == id);
    console.log(reservas);
    let boletas_vendidas = 0;
    for (let i = 0; i < reservas.length; i++) {
      boletas_vendidas += reservas[i].nro_boletas;
    }
    this.formularioEvento.get('boletas_disponibles')?.setValue(datos_evento?.boletas! - boletas_vendidas);
    const evento = this.eventos.find(elm => elm.descripcion === texto);
    this.setValueEvento(evento ? evento : { id_evento: '', descripcion: '', lugar: '', fecha: '', boletas_disponibles: '' });
  }

  setValueEvento = (evento: any) => Object.keys(evento).forEach(elm =>
    this.formularioEvento.get(elm)?.setValue(evento[elm])
  );

  autocompletarComprador = (value: string) => {
    const comprador = this.compradores.find(elm => elm.identificacion === value);
    this.formularioComprador.get('nro_boletas')?.enable();
    this.setValueComprador(comprador ? comprador : { id_comprador: '', identificacion: '', nombre: '', correo: '', telefono: '' });
  }

  setValueComprador = (comprador: any) => Object.keys(comprador).forEach(elm =>
    this.formularioComprador.get(elm)?.setValue(comprador[elm])
  );

}
