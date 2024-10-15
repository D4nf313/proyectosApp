import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";

@Component({
    selector: 'dialog-eliminar',
    templateUrl: 'dialog-eliminar-tarea.html',
    styleUrl: 'dialog-eliminar.css',
    standalone: true,
    imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
export class DialogEliminar {
    readonly dialogRef = inject(MatDialogRef<DialogEliminar>);


    confirmacion(){
      this.dialogRef.close(true);
    }
  }
  
  