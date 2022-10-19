import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { UserComponent } from './user/user.component'; // <---
import { RoleComponent } from './role/role.component';
import { GroupComponent } from './group/group.component';
import { SystemTasksComponent } from './system-tasks/system-tasks.component';
import { UserGroupComponent } from './userGroup/userGroup.component';
import { ViewCameraComponent } from './view-camera/view-camera.component';

export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'user',
        component: UserComponent,
      },
      {
        path: 'role',
        component: RoleComponent,
      },
      {
        path: 'group',
        component: GroupComponent,
      },
      {
        path: 'system-tasks',
        component: SystemTasksComponent,
      },
      {
        path: 'view-camera',
        component: ViewCameraComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
