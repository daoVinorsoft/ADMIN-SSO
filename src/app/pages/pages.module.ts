import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { SpinnerModule } from '../components/spinner/spinner.module';
import { IconsProviderModule } from '../icons-provider.module';
import { GroupModule } from './group/group.module';
import { PagesComponent } from './pages.component'; // <---
import { PageRoutingModule } from './pagesRouting.module';
import { RoleModule } from './role/role.module';
import { SytemTasksModule } from './system-tasks/sytem-tasks.module';
import { BannersModule } from './banner/banner.module';
import { UserModule } from './user/user.module'; // <---
import { UserGroupModule } from './userGroup/userGroup.module'; // <---



import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { Observable } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { UserReducer } from '../store/reducers/user.reducer';


@NgModule({
  imports: [
    CommonModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    SpinnerModule,
    PageRoutingModule,
    NzAvatarModule,
    NzDropDownModule,
    UserModule,
    RoleModule,
    GroupModule,
    UserGroupModule,
    SytemTasksModule,
    NzTabsModule,
    BannersModule
  ],
  
  declarations: [
    PagesComponent, // <---
  ],
  // providers: [Observable]
})
export class PagesModule {}
