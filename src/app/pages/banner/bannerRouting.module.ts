import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BannersComponent } from './banner.component';
import { BannerCRUComponent } from './cru-banner/cru-banner.component';


export const routes: Routes = [
  {
    path: '',
    component: BannersComponent,
    children: [
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
