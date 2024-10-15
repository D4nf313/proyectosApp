import { Component, inject, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { ProyectosService } from '../../services/proyectos/proyectos.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editar-crear',
  templateUrl: './editar-crear.component.html',
  styleUrls: ['./editar-crear.component.css'],
})
export class EditarCrearComponent implements OnInit {
  tareasForm: FormGroup;
  private dataSubject = new BehaviorSubject<any>(null);
  banderaEditar: boolean = false;
  userId;
  private _snackBar = inject(MatSnackBar);
  constructor(
    private fb: FormBuilder,
    @Optional() public dialogRef: MatDialogRef<EditarCrearComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private proyectoService: ProyectosService
  ) {
    this.dataSubject.next(data);
    this.tareasForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      completed: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.dataSubject.subscribe((data) => {
      console.log(data);
      if (data?.tarea) {
        //editar
        this.tareasForm.patchValue({
          title: data.tarea.title,
          completed: String(this.data.tarea.completed),
        });
        this.banderaEditar = true;
      } else {
        // crear
        this.userId = data.userId;
        this.banderaEditar = false;
      }
    });
  }

  crearEditarTarea() {
    this.tareasForm.markAllAsTouched();
    if (this.tareasForm?.valid) {
      if (!this.banderaEditar) {
        const tarea = {
          userId: this.userId,
          title: this.tareasForm.get('title').value,
          completed: this.tareasForm.get('completed').value === 'true',
        };
        // crear
        this.proyectoService.crearTarea(tarea).subscribe((data: boolean) => {
          if (data) {
            this._snackBar.open(
              'Se ha creado la tarea exitosamente.',
              'Entendido',
              {
                duration: 3000, // Duración de 5 segundos
              }
            ),
              this.dialogRef.close(true);
          }
        });
      } else {
        // editar

        const tarea = {
          userId: this.data.tarea.userId,
          id: this.data.tarea.id,
          title: this.tareasForm.get('title').value,
          completed: this.tareasForm.get('completed').value === 'true',
        };
        this.proyectoService.editarTarea(tarea).subscribe((data: boolean) => {
          this._snackBar.open(
            'Se ha editado la tarea exitosamente.',
            'Entendido',
            {
              duration: 3000, // Duración de 5 segundos
            }
          ),
            this.dialogRef.close(true);
        });
      }
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
