import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { SystemTasksComponent } from './system-tasks.component';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@NgModule({
  imports: [
    NzTimePickerModule,
    CommonModule,
    NzTableModule,
    NzTagModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzMessageModule,
    NzFormModule,
    NzSelectModule,
    ReactiveFormsModule,
    FormsModule,
    NzDropDownModule,
    NzGridModule,
    NzDatePickerModule,
    NzInputModule,
    NzSwitchModule,
    NzPopconfirmModule,
    NzTabsModule,
    NzPaginationModule,
  ],
  declarations: [SystemTasksComponent],
  exports: [SystemTasksComponent],
})
export class SytemTasksModule {}

