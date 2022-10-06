import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'src/models/Member';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
  form : any;
  currentID: any;
  Item: any ;
  constructor(private memberService:MemberService, private router: Router,private activatedRoute:ActivatedRoute) {}
  

  initForm():void
{ 
  
  this.form=new FormGroup({
    cin : new FormControl(null, [Validators.required]),
    name : new FormControl(null, [Validators.required]),
    type : new FormControl(null, [Validators.required]),
    cv : new FormControl(null, [Validators.required]),
  });
  
}
initForm1(item:Member):void
{ 
  
  this.form=new FormGroup({
    cin : new FormControl(item.cin, [Validators.required]),
    name : new FormControl(item.name, [Validators.required]),
    type : new FormControl(item.type, [Validators.required]),
    CV : new FormControl(item.CV, [Validators.required]),
  });
  
}
ONSUB():void{
  console.log(this.form.value);
  //const ObjectTosubmit = this.form.value;
  const ObjectTosubmit = {...this.Item, ...this.form.value}
  this.memberService.saveMember(ObjectTosubmit).then(()=>{this.router.navigate(['./members'])}) //reception du contenu du thread 
                                               //action post reception du retour du thread 
}
ngOnInit(): void {
  this.initForm();
  //1- recuperer l id de l elet a partir de son id 
  this.currentID = this.activatedRoute.snapshot.params.id;
  //2- si li d a une valeur recup l elet a partir de son id  getMemberbyId()
  if(!!this.currentID)
  {
    this.memberService.getMemberById(this.currentID).then(
      (MembertoFind)=>{
        this.Item = MembertoFind;
        this.initForm1(MembertoFind);
      }
      
    );
  }
  else this.initForm();
  //3-si on n'a pas id => apppeler initForm()
    //initialisation de l objet 
}
}

