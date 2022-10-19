import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzTableFilterFn, NzTableFilterList } from 'ng-zorro-antd/table';

import { NzMessageService } from 'ng-zorro-antd/message';
import { RoleData } from '../../@core/data/role';

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
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private service: RoleData
  ) {
    this.fetchRoles();
  }

  // ---------------------------Khai báo biến----------------------------------
  listUserRole = [
    { id: '1', user_id: '1', role_id: '1' },
    { id: '2', user_id: '2', role_id: '1' },
    { id: '3', user_id: '3', role_id: '2' },
    { id: '4', user_id: '4', role_id: '3' },
    { id: '5', user_id: '5', role_id: '1' },
    { id: '6', user_id: '1', role_id: '2' },
    { id: '7', user_id: '2', role_id: '3' },
    { id: '8', user_id: '3', role_id: '2' },
  ];
  // Các biến liên quan đến form
  formEdit!: FormGroup;
  formAdd!: FormGroup;
  pageSize: number = 15;
  pageIndex: number = 0;
  toTalData: number = 0;

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
      name: 'Tên quyền ',
      hidden: false,
      listOfFilter: [],
      filterFn: null,
    },
    {
      name: 'Mô tả',
      hidden: false,
      listOfFilter: [],
      filterFn: null,
    },
    {
      name: 'Trạng thái',
      hidden: false,

      listOfFilter: [
        { text: 'Hoạt động', value: true },
        { text: 'Khóa', value: false },
      ],
      filterFn: (list: boolean[], item: DataItem) =>
        list.some((active) => item.active === active),
    },
  ];
  listColumnsDisplay = [...this.columnsDisplay];

  // Các biến liên quan đến việc handleCancel, handleShow
  isVisible = false;
  isVisibleDisplay = false;
  isVisibleSearch = false;
  isOkLoading = false;
  isShowSearch = false;
  isVisibleAdded = false;
  isOkLoadingAdded = false;

  // Các biến liên quan đến data
  id = '';

  activeStatus = true;
  searchValue = '';

  visible = false;

  //  ---------------------------Khai báo biến----------------------------------

  // Hàm khởi tạo form
  initForm = (): FormGroup => {
    return this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      active: [true, [Validators.required]],
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
    this.service.fetchRole(id).subscribe((res) => {
      this.formEdit.setValue({
        name: res.name,
        description: res.description,
        active: res.active,
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

  EditRole(): void {
    this.isOkLoading = true;

    console.log(this.formEdit.value);
    // console.log(this.formEdit.valid);

    if (this.formEdit.valid) {
      console.log(this.formEdit.value);

      const dataRole = {
        ...this.formEdit.value,
        id: this.id,
        active: this.activeStatus,
      };
      this.service.editRole(dataRole, this.id).subscribe((res) => {
        console.log(res);
        this.fetchRoles();
        this.message.create(
          'success',
          'Cập nhật thông tin quyền hệ thống thành công'
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

  // Function Add Role
  // Chức năng: Lấy thông tin từ form và gửi lên server
  // Đầu vào: thông tin form nhập từ browser
  submitForm(): void {
    this.isOkLoadingAdded = true;

    if (this.formAdd.valid) {
      const formatData = {
        ...this.formAdd.value,
        active: this.activeStatus,
      };

      this.service.createRole(formatData).subscribe(
        (res) => {
          console.log(res);
          this.fetchRoles();
          this.message.create(
            'success',
            'Thêm thông tin quyền hệ thống thành công'
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

  fetchRoles() {
    this.service.fetchRoles().subscribe((res: any) => {
      this.toTalData = res.length;
      this.listOfData = res;
      this.listOfDisplayData = [...res];
    });
  }

  // Function Delete Role
  // Chức năng: Xoá người dùng
  // Đầu vào: id (string): Mã người dùng
  deleteRole(id: string) {
    let checkRole = this.listUserRole.findIndex((item) => (item.role_id = id));
    // check xem role có đang được sử dụng bởi người dùng hay không
    console.log(checkRole);
    if (checkRole != -1) {
      this.message.create(
        'warning',
        'Không thể xóa quyền hệ thống này vì nó đang được sử dụng bởi người dùng'
      );
    } else {
      this.service.deleteRole(id).subscribe(
        (res) => {
          this.fetchRoles();
          this.message.create('success', 'Đã xóa quyền hệ thống');
        },
        (error) => {}
      );
    }
  }

  // Hàm Hủy tìm kiếm
  reset(): void {
    this.searchValue = '';
    this.isVisibleSearch = false;
    // this.search();
  }

  // Hàm tìm kiếm theo tên người dùng
  searchRole(): void {
    this.isVisibleSearch = false;
    this.listOfDisplayData = this.listOfData.filter((item: DataItem) => {
      if (item.name !== null) {
        return item.name.indexOf(this.searchValue) !== -1;
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
    // this.service.fetchRole(this.pageIndex - 1).subscribe((res) => {
    //   this.listOfData = res;
    //   this.listOfDisplayData = [...res];
    // });
  }
}
