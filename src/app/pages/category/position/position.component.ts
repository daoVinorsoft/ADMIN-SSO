import { Component, OnInit } from '@angular/core';
import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface DataItem {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  role: string;
}

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<DataItem> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<DataItem> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
  align: 'left' | 'right' | 'center';
}

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
})
export class PositionComponent implements OnInit {
  constructor(private message: NzMessageService) {}

  ngOnInit() {}

  listOfData: DataItem[] = [];
  listOfColumns: ColumnItem[] = [];

  isVisible = false;
  isOkLoading = false;
  idAccount = 0;

  isVisibleAdded = false;
  isOkLoadingAdded = false;

  form = new FormGroup({
    first_name: new FormControl('', [
      Validators.minLength(2),
      Validators.required,
    ]),
    last_name: new FormControl(''),
    email: new FormControl('', [Validators.email, Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.minLength(8),
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
      ),
    ]),
    role: new FormControl('', Validators.required),
  });
  showModalAdd() {
    this.isVisibleAdded = true;
  }

  showModal(id: number): void {}

  handleOk(): void {}

  submitForm(): void {}

  handleCancel(): void {
    this.isVisible = false;
    this.isVisibleAdded = false;
  }

  fetchAccounts() {}

  deleteAccount(id: number) {}
}
