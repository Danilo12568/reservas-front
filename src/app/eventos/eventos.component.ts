import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventosService } from './services/eventos.service';

// Alertify
declare let alertify: any;

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  formulario = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private eventosService: EventosService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  /** Inicializa el formulario de eventos con sus valores por defecto y validaciones */
  initForm = () => {
    this.formulario = this.fb.group({
      descripcion: ['', [Validators.required]],
      lugar: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      boletas: ['', [Validators.required]],
    });
  }

  guardarEvento = () => {
    console.log(this.formulario.value);
    this.eventosService.guardarEvento(this.formulario.value).subscribe(res => {
      alertify.success('Se guardaron el evento exitosamente');
    });
  }

}
