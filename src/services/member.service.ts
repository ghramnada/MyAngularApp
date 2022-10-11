import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from 'src/app/app_config';
import { Member } from 'src/models/Member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private  httpClient:HttpClient) { }
  public tab:Member[] = GLOBAL._DB.members;
  saveMember(MemberToSave : Member) : Promise<void>
  {
    // si j'ai partie back 
    //return this.httpClient.post<Member>('linktoRestAPI',MemberToSave).toPromise();
    //ajout manuelle de elet ds base 
    //return (new Promise (resolve=>resolve()))
    //const ObjectTosubmit = {...MemberToSave,id:Math.ceil(Math.random() *1000).toString(),createdDate:new Date().toISOString()};
    
    const objetToInsert = {...MemberToSave,id:MemberToSave.id ??Math.ceil(Math.random() *1000).toString(),createdDate:MemberToSave.createdDate ??new Date().toISOString()};
    this.tab=[objetToInsert,...this.tab.filter(item=>item.id != objetToInsert.id)];
    //what is resolve used for 
    return (new Promise (resolve=>resolve()));
}
  getMemberById(currentID:String):Promise<Member>
  {
    //la requete si on a le backend
    //return this.httpClient.get<Member>('lien').toPromise();
    return new Promise(resolve=> resolve(

    this.tab.filter(item=> item.id===currentID)[0] ?? null));
    //the resolve methods will call then and pass it s param as inputs to then 
  }

  DeleteById(id:String):Promise<void>{
    //return this.httpClient.delete<void>('mlink').toPromise();
    this.tab = [...this.tab.filter(item => item.id != id)];
    return new Promise(resolve =>resolve());
  }

  getAllMembers():Promise<Member[]> {
    //si j ai back
    //return this.httpClient.get<Member[]>('mlink').toPromise();
    return new Promise(resolve => resolve(this.tab));
  }
}
