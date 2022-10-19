import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './module-import.guard';

import { AuthData } from './data/auth';
import { UserData } from './data/user';
import { RoleData } from './data/role';
import { GroupData } from './data/group';
import { UserGroupData } from './data/userGroup';

import { AuthService } from './mock/auth.service';
import { UserService } from './mock/user.service';
import { RoleService } from './mock/role.service';
import { GroupService } from './mock/group.service';
import { UserGroupService } from './mock/userGroup.service';

import { TokenInterceptorService } from './mock/token.service';

const DATA_SERVICES = [
  { provide: AuthData, useClass: AuthService },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true,
  },
  { provide: UserData, useClass: UserService },
  { provide: RoleData, useClass: RoleService },
  { provide: GroupData, useClass: GroupService },
  { provide: UserGroupData, useClass: UserGroupService },
];

export const CORE_PROVIDERS = [...DATA_SERVICES];

@NgModule({
  imports: [CommonModule],
  exports: [],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [...CORE_PROVIDERS],
    };
  }
}
