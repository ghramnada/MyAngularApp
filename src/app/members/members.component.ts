import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Member } from 'src/models/Member';
import { MemberService } from 'src/services/member.service';
import { GLOBAL } from '../app_config';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  //dataSource:Member[]
  dataSource : MatTableDataSource<Member>;
  displayedColumns: string[] = ['cin', 'name', 'createdDate','CV','type', 'icon'];
  //il faut instancier les services dans constructor
  constructor(private MemberService: MemberService ,private router: Router,private dialog: MatDialog) { 
    //this.dataSource = this.MemberService.tab
    //on a utiliser Mathtabledatasource car filter n utilise que tab de type matTable
    //pour acceder au donnée de mattable : materialTable.data
    this.dataSource= new MatTableDataSource(this.MemberService.tab);
  }
  //se charge automatiquement lorsque on lance le composant 
  ngOnInit(): void {}
  
  fetchDataSource(): void{
    this.MemberService.getAllMembers().then((tab) => {this.dataSource = new MatTableDataSource(tab)});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  OnRemove(id : String):void{
    //1-ouvrir la boite de dialogue 
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '400px',
      width: '600px',
    });
    //2-attendre le retour de l utilisateur 
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
         //3-if retour = confirm  efface
        this.MemberService.DeleteById(id).then(()=>{this.fetchDataSource()});
    }
    });
    
  }
}

