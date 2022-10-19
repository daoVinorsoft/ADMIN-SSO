import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { NzTableFilterFn, NzTableFilterList } from 'ng-zorro-antd/table';

import { UserGroupData } from '../../@core/data/userGroup';
import { UserData } from '../../@core/data/user';
import { GroupData } from '../../@core/data/group';

interface DataItem {
  id: string;
  user_id: string;
  group_id: string;
}

interface ColumnItem {
  name: string;
  hidden: boolean;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<DataItem> | null;
}

@Component({
  selector: 'app-user-group',
  templateUrl: './userGroup.component.html',
  styleUrls: ['./userGroup.component.scss'],
})
export class UserGroupComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private service: UserGroupData,
    private serviceUser: UserData,
    private serviceGroup: GroupData
  ) {
    this.fetchUserGroups();
    this.fetchUsers();
    this.fetchGroups();
  }

  // ---------------------------Khai báo biến----------------------------------

  // Các biến liên quan đến form
  formEdit!: FormGroup;
  formAdd!: FormGroup;
  pageSize: number = 15;
  pageIndex: number = 0;
  toTalData: number = 0;

  listGroup: any[] = [];
  listUser: any[] = [];

  listOfData: DataItem[] = [];
  listOfDisplayData: DataItem[] = [];
  switchValue = false;
  columnsDisplay: ColumnItem[] = [
    {
      name: 'STT',
      hidden: false,
      listOfFilter: [],
      filterFn: null,
    },
    {
      name: 'Mã người dùng',
      hidden: false,
      listOfFilter: [],
      filterFn: null,
    },
    {
      name: 'Mã nhóm',
      hidden: false,
      listOfFilter: [],
      filterFn: null,
    },
  ];
  listColumnsDisplay = [...this.columnsDisplay];

  // Các biến liên quan đến việc handleCancel, handleShow
  isVisible = false;
  isVisibleDisplay = false;
  isVisibleSearchUser = false;
  isVisibleSearchGroup = false;
  isOkLoading = false;
  isShowSearch = false;
  isVisibleAdded = false;
  isOkLoadingAdded = false;

  // Các biến liên quan đến data
  id = '';

  activeStatus = true;
  searchValue = '';
  searchField = '';
  visible = false;

  //  ---------------------------Khai báo biến----------------------------------

  // Hàm khởi tạo form

  initForm = (): FormGroup => {
    return this.fb.group({
      user_id: [null, [Validators.required]],
      group_id: [null, [Validators.required]],
    });
  };

  //onInit()
  ngOnInit(): void {
    this.formAdd = this.initForm();
    this.formEdit = this.initForm();
  }

  // Functions

  showFilter() {
    this.isShowSearch = !this.isShowSearch;
  }

  showDisplay() {
    this.isVisibleDisplay = !this.isVisibleDisplay;
  }

  showModalAdd() {
    this.isVisibleAdded = true;
    // this.formAdd.reset();
  }

  handleSwitchActive(): void {
    this.activeStatus = !this.activeStatus;
  }

  showModalEdit(id: string): void {
    this.id = id;
    this.service.fetchUserGroup(id).subscribe((res) => {
      this.formEdit.setValue({
        user_id: res.user_id,
        group_id: res.group_id,
      });
      this.activeStatus = res.active;

      this.isVisible = true;
    });
  }

  handleCancelDisplayModal(): void {
    this.isVisibleDisplay = false;
    this.listColumnsDisplay = this.columnsDisplay.filter(
      (item) => item.hidden === false
    );
  }

  EditUserGroup(): void {
    this.isOkLoading = true;

    console.log(this.formEdit.value);
    // console.log(this.formEdit.valid);

    if (this.formEdit.valid) {
      console.log(this.formEdit.value);

      const dataUserGroup = {
        ...this.formEdit.value,
        id: this.id,
      };
      this.service.editUserGroup(dataUserGroup, this.id).subscribe((res) => {
        console.log(res);
        this.fetchUserGroups();
        this.message.create(
          'success',
          'Cập nhật thông tin nhóm người dùng thành công'
        );
        this.isVisible = false;
        this.isOkLoading = false;
        this.formEdit.reset();
      });
    } else {
      console.log(this.formEdit.value);
      this.isOkLoading = false;
      Object.values(this.formEdit.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  // Function Add UserGroup
  // Chức năng: Lấy thông tin từ form và gửi lên server
  // Đầu vào: thông tin form nhập từ browser
  submitForm(): void {
    this.isOkLoadingAdded = true;
    console.log(this.formAdd.value);
    if (this.formAdd.valid) {
      this.service.createUserGroup(this.formAdd.value).subscribe(
        (res) => {
          console.log(res);
          this.fetchUserGroups();
          this.message.create(
            'success',
            'Thêm thông tin nhóm người dùng thành công'
          );
          this.isVisibleAdded = false;
          this.isOkLoadingAdded = false;
          this.formAdd.reset();
        },
        (error) => {
          console.log('error', error);
        }
      );
    } else {
      Object.values(this.formAdd.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  // Xử lý sự kiện khi click vào button Hủy / Tắt modal
  handleCancel(): void {
    this.isVisible = false;
    this.isVisibleAdded = false;
    this.formAdd = this.initForm();
    this.formEdit = this.initForm();
  }
  fetchUsers() {
    this.serviceUser.fetchUsers().subscribe((res: any) => {
      this.listUser = res;
      console.log(this.listUser);
    });
  }
  fetchGroups() {
    this.serviceGroup.fetchGroups().subscribe((res: any) => {
      this.listGroup = res;
    });
  }
  fetchUserGroups() {
    this.service.fetchUserGroups().subscribe((res: any) => {
      this.toTalData = res.length;
      this.listOfData = res;
      this.listOfDisplayData = [...res];
    });
  }

  // Function Delete UserGroup
  // Chức năng: Xoá người dùng
  // Đầu vào: id (string): Mã người dùng
  deleteUserGroup(id: string) {
    this.service.deleteUserGroup(id).subscribe(
      (res) => {
        this.fetchUserGroups();
        this.message.create('success', 'Đã xóa nhóm người dùng');
      },
      (error) => {}
    );
  }

  // Hàm Hủy tìm kiếm
  reset(): void {
    this.searchValue = '';
    this.isVisibleSearchUser = false;
    this.isVisibleSearchGroup = false;
    // this.search();
  }

  // Hàm tìm kiếm theo tên người dùng
  search(field: string): void {
    this.isVisibleSearchUser = false;
    this.isVisibleSearchGroup = false;
    this.listOfDisplayData = this.listOfData.filter((item: DataItem) => {
      if (field === 'user') {
        if (item.user_id !== null) {
          return item.user_id.indexOf(this.searchValue) !== -1;
        } else {
          return false;
        }
      } else if (field === 'group') {
        if (item.group_id !== null) {
          return item.group_id.indexOf(this.searchValue) !== -1;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });
  }

  // Function xử lý hiển thị các trường trên bảng dữ liệu
  // Đầu vào: status (boolean) của cột,
  //          text (string): className của cột
  //          index (number): Vị trí cột trong mảng columns
  onSwitchDisplay(status: boolean, text: any, index: number) {
    var cl = document.getElementsByClassName(text);
    if (!status) {
      for (let i = 0; i < cl.length; i++) {
        cl[i].classList.add('tabCol');
      }
    } else {
      for (let i = 0; i < cl.length; i++) {
        cl[i].classList.remove('tabCol');
      }
    }
    this.columnsDisplay[index].hidden = !status;
  }

  // Function xử lý sự kiện chuyển trang
  // Đầu vào: event (number): số trang được chọn
  // Chức năng: lấy dữ liệu từ API với số trang được chọn
  onChangeIndexPage(event: any) {
    // this.pageIndex = event;
    // this.service.fetchUserGroup(this.pageIndex - 1).subscribe((res) => {
    //   this.listOfData = res;
    //   this.listOfDisplayData = [...res];
    // });
  }
}
