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
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannersComponent implements OnInit {
  @Input() control:FormControl | undefined;
  timeMer = '17:13:30';
  defaultOpenValue = new Date();
  date = null;
  inputValue = '';
  listOfData = [
    {
      key: 1,
      banner: 'John Brown',
      bannerName: '32',
      bannerDate: 'New York No. 1 Lake Park',
      bannerCreateBy: 'John Brown',
      bannerStatus: 'On',
    },
    
  ];
  constructor( private i18n: NzI18nService ) {}
  ngOnInit(): void {
    console.log('first time:', this.timeMer)
    this.i18n.setLocale(vi_VN);
    this.listOfData = new Array(100).fill(0).map((_, index) => ({
        key : index,
        banner :  `https://picsum.photos/id/${index}/200/100`,
        bannerName : 'Banner Kỷ niệm 20 năm MBAMC' + index,
        bannerDate : '23/08/2022 - 16:35',
        bannerCreateBy : 'Admin',
        bannerStatus : Math.floor(Math.random() * 10) % 2 == 0 ? 'pendding' : index % 2 != 0 ? 'reject' : 'approved'
    }));


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
