import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '', component: IndexComponent, children: [
      { path: '', component: UsersComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class AdminRoutingModule { }
