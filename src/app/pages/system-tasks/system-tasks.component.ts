/**
 * @author [daoNguyen]
 * @email [daonds@vinorsoft.com ]
 * @create date 2022-09-20 16:27:30
 * @modify date 2022-09-20 16:27:30
 * @desc [description]
 */
import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableFilterFn, NzTableFilterList } from 'ng-zorro-antd/table';

import { GroupData } from '../../@core/data/group';
import { RoleData } from '../../@core/data/role';
import { NzI18nService, vi_VN } from 'ng-zorro-antd/i18n';
import { FormControl } from '@angular/forms';

interface DataItem {
  id: string;
  name: string;
  description: string;
  active: boolean;
}

interface ColumnItem {
  name: string;
  hidden: boolean;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<DataItem> | null;
}

@Component({
  selector: 'app-system-tasks',
  templateUrl: './system-tasks.component.html',
  styleUrls: ['./system-tasks.component.css'],
})
export class SystemTasksComponent implements OnInit {
  @Input() control:FormControl | undefined;
  timeMer = '17:13:30';
  defaultOpenValue = new Date();
  date = null;
  constructor( private i18n: NzI18nService ) {}
  ngOnInit(): void {
    console.log('first time:', this.timeMer)
    this.i18n.setLocale(vi_VN);
   }

  // ---------------------------Khai báo biến----------------------------------
  // Các biến liên quan đến form
  logTimer(time: Date): void {
    console.log(time && time.toTimeString());
  }

  submitForm(): void {
    console.log('submit');
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

}
