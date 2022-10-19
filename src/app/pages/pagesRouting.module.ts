import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { UserComponent } from './user/user.component'; // <---
import { RoleComponent } from './role/role.component';
import { GroupComponent } from './group/group.component';
import { SystemTasksComponent } from './system-tasks/system-tasks.component';
import { UserGroupComponent } from './userGroup/userGroup.component';
import { BannersComponent } from './banner/banner.component';
import { BannerCRUComponent } from './banner/cru-banner/cru-banner.component';

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
        path: 'banners',
        component: BannersComponent,
      },
      {
        path: 'tao-banner',
        component: BannerCRUComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
