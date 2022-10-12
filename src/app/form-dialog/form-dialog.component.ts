import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Article } from 'src/models/Article';
import { Member } from 'src/models/Member';
import { ArticleService } from 'src/services/article.service';

export interface DialogData {
  id : String,
  type : String,
  titre : String,
  lien : String,
  sourcePdf : String,
  date : String,
}
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css']
})
export class FormDialogComponent implements OnInit {
  Item : any;
  constructor( 
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private articleService : ArticleService)
  {
    /*if(data.id)
    {
      this.articleService.getArticleById(data.id).then((item)=>{data.id = item.id; data.lien = item.lien; data.sourcePdf = item.sourcePdf ; data.titre = item.titre ; data.type = item.type,data.date = item.date; data.date = item.date})
    }*/
  }
  saveClick(): void{
    const ObjectTosubmit = {...this.Item, ...this.data};
    this.articleService.saveArticle(ObjectTosubmit).then(()=>{});
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }
}
  


