import { Injectable } from '@angular/core';
import { GLOBAL } from 'src/app/app_config';
import { Article } from 'src/models/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor() { }
  public tab:Article[] = GLOBAL._DB.articles;
  
  saveArticle(ArticleToSave : Article) : Promise<void>
  {
    const objetToInsert = {...ArticleToSave,id:ArticleToSave.id ??Math.ceil(Math.random() *1000).toString(),date:ArticleToSave.date ??new Date().toISOString()};
    this.tab=[objetToInsert,...this.tab.filter(item=>item.id != objetToInsert.id)];
    return (new Promise (resolve=>resolve()));
}

  getArticleById(currentID:String):Promise<Article>
  {
   return new Promise(resolve=> resolve(this.tab.filter(item=> item.id===currentID)[0] ?? null));
  }

  DeleteById(id:String):Promise<void>{
    //return this.httpClient.delete<void>('mlink').toPromise();
    this.tab = [...this.tab.filter(item => item.id != id)];
    return new Promise(resolve =>resolve());
  }

  getAllArticles():Promise<Article[]> {
    //si j ai back
    //return this.httpClient.get<Member[]>('mlink').toPromise();
    return new Promise(resolve => resolve(this.tab));
  }
}
