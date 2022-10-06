import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog'
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  public title = "Are you sure !";
  public message = "do u really want to delete";
  public confirm = "confirm";
  public cancel = "cancel";
  //forçage de type : transform component to bte de dialog
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>) { }

  ngOnInit(): void {
  }

}
