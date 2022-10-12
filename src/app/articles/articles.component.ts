import { analyzeAndValidateNgModules, isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Article } from 'src/models/Article';
import { ArticleService } from 'src/services/article.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articleBuffer : any;
  dataSource : Article[];
  displayedColumns: string[] = ['id', 'type', 'titre','lien','sourcePdf', 'date','auteur','actions'];
  constructor(private ArticleService : ArticleService, private dialog: MatDialog) { 
    this.dataSource= this.ArticleService.tab;

  }

  ngOnInit(): void {
  }

  fetchDataSource(): void{
    this.ArticleService.getAllArticles().then((tab) => {this.dataSource = tab});
  }

  OnRemove(id : String):void{
    //1-ouvrir la boite de dialogue 
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });
    //2-attendre le retour de l utilisateur 
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
         //3-if retour = confirm  efface
        this.ArticleService.DeleteById(id).then(()=>{this.fetchDataSource()});
    }
    });
    
  }

  edit(articleId : String):void{
    let dialogRef;
    this.ArticleService.getArticleById(articleId).then((articleTofind)=>{this.articleBuffer = articleTofind;
      console.log(articleTofind);
    dialogRef = this.dialog.open(FormDialogComponent, {
      height: '400px',
      width: '250px',
      data: {id:articleId, lien:this.articleBuffer.lien, sourcePdf:this.articleBuffer.sourcePdf, titre:this.articleBuffer.titre, type:this.articleBuffer.type, date:this.articleBuffer.date}});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchDataSource();
    })  })
  };

  add():void{
    let dialogRef = this.dialog.open(FormDialogComponent, {
      height: '400px',
      width: '250px',
      data: {lien:"", sourcePdf:"", titre:"", type:""}});
    dialogRef.afterClosed().subscribe(result => {
      this.fetchDataSource();
    })
  }
};
