import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventsComponent } from './events/events.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { MembersComponent } from './members/members.component';
import { ToolsComponent } from './tools/tools.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'members'
  },
  {
    path: 'members',
    pathMatch: 'full',
    component: MembersComponent
  },
  {
    path: 'create',
    pathMatch: 'full',
    component: MemberFormComponent
  },
  {
    path: 'articles',
    pathMatch: 'full',
    component:  ArticlesComponent
  },
  {
    path: 'tools',
    pathMatch: 'full',
    component: ToolsComponent
  },
  {
    path: 'Events',
    pathMatch: 'full',
    component:  EventsComponent
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    component:  DashboardComponent
  },
  {
    path: 'members/:id/edit',
    pathMatch: 'full',
    component: MemberFormComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'members'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
