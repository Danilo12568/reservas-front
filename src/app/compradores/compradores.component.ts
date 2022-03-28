import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompradoresService } from './services/compradores.service';

@Component({
  selector: 'app-compradores',
  templateUrl: './compradores.component.html',
  styleUrls: ['./compradores.component.css']
})
export class CompradoresComponent implements OnInit {

  formulario = new FormGroup({});

  constructor(
    private compradoresService: CompradoresService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initFormReunion();
  }

  /** Inicializa el formulario de reunión con sus valores por defecto y validaciones */
  initFormReunion = () => {
    this.formulario = this.fb.group({
      identificacion: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
    });
  }

  guardarComprador = () => {
    this.compradoresService.guardarComprador(this.formulario.value).subscribe(res => {
      alert ('Listo');
    });
  }

}
