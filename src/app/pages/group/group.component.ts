import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { NzTableFilterFn, NzTableFilterList } from 'ng-zorro-antd/table';

import { GroupData } from '../../@core/data/group';
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
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private service: GroupData,
    private serviceRole: RoleData
  ) {
    this.fetchRoles();
    this.fetchGroups();
  }

  // ---------------------------Khai báo biến----------------------------------

  // Các biến liên quan đến form
  formEdit!: FormGroup;
  formAdd!: FormGroup;
  pageSize: number = 15;
  pageIndex: number = 0;
  toTalData: number = 0;

  listSelectedRole: any[] = [];
  listSelectedRoleData: any[] = [];
  listRole: any[] = [];
  listGroupUser: string[] = [];
  listOfData: DataItem[] = [];
  listOfDisplayData: DataItem[] = [];
  listUserRoleData: any[] = [];
  selectedRoles: any[] = [];
  switchValue = false;
  columnsDisplay: ColumnItem[] = [
    {
      name: 'STT',
      hidden: false,
      listOfFilter: [],
      filterFn: null,
    },
    {
      name: 'Tên nhóm',
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
  listColumnRole: any[] = [
    {
      name: 'STT',
    },
    {
      name: 'Tên quyền',
    },
    {
      name: 'Trạng thái',
    },
  ];

  // Các biến liên quan đến việc handleCancel, handleShow
  isVisible = false;
  isVisibleDisplay = false;
  isVisibleSearch = false;
  isOkLoading = false;
  isShowSearch = false;
  isVisibleAdded = false;
  isOkLoadingAdded = false;
  tab = 1;

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

  showTab(i: number) {
    this.tab = i;
  }

  showDisplay() {
    this.isVisibleDisplay = !this.isVisibleDisplay;
  }

  showModalAdd() {
    this.isVisibleAdded = true;
    this.listGroupUser = [];
    this.selectedRoles = [];
    this.listUserRoleData = this.listRole.map((role) => {
      if (this.selectedRoles.every((item) => item != role.id) === false) {
        return { ...role, selected: true };
      } else {
        return { ...role, selected: false };
      }
    });
    this.listSelectedRoleData = this.listUserRoleData.filter(
      (item) => item.selected === true
    );
  }

  handleSwitchActive(): void {
    this.activeStatus = !this.activeStatus;
  }

  showModalEdit(id: string): void {
    this.id = id;
    this.selectedRoles = ['1', '2']; // có id user (id) thì fetch data trả về mảng các id role của id user đó
    this.listUserRoleData = this.listRole.map((role) => {
      if (this.selectedRoles.every((item) => item != role.id) === false) {
        return { ...role, selected: true };
      } else {
        return { ...role, selected: false };
      }
    });
    this.listSelectedRoleData = this.listUserRoleData.filter(
      (item) => item.selected === true
    );
    console.log(this.listUserRoleData);
    this.service.fetchGroup(id).subscribe((res) => {
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

  EditGroup(): void {
    this.isOkLoading = true;

    console.log(this.formEdit.value);
    // console.log(this.formEdit.valid);

    if (this.formEdit.valid) {
      console.log(this.formEdit.value);

      const dataGroup = {
        ...this.formEdit.value,
        id: this.id,
        active: this.activeStatus,
      };
      this.service.editGroup(dataGroup, this.id).subscribe((res) => {
        console.log(res);
        this.fetchRoles();
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

  // Function Add Role
  // Chức năng: Lấy thông tin từ form và gửi lên server
  // Đầu vào: thông tin form nhập từ browser
  AddGroup(): void {
    this.isOkLoadingAdded = true;
    console.log(this.formAdd.value);
    if (this.formAdd.valid) {
      const formatData = {
        ...this.formAdd.value,
        active: this.activeStatus,
      };

      this.service.createGroup(formatData).subscribe(
        (res) => {
          console.log(res);
          this.fetchGroups();
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

  AssignRole(): void {
    this.message.create('success', 'Đã cấp quyền cho nhóm người dùng này');
  }

  // Xử lý sự kiện khi click vào button Hủy / Tắt modal
  handleCancel(): void {
    this.isVisible = false;
    this.isVisibleAdded = false;
    this.formAdd = this.initForm();
    this.formEdit = this.initForm();
  }

  fetchGroups() {
    this.service.fetchGroups().subscribe((res: any) => {
      this.toTalData = res.length;
      this.listOfData = res;
      this.listOfDisplayData = [...res];
    });
  }

  fetchRoles() {
    this.serviceRole.fetchRoles().subscribe((res: any) => {
      this.listRole = res;
    });
  }

  // Function Delete Role
  // Chức năng: Xoá người dùng
  // Đầu vào: id (string): Mã người dùng
  deleteGroup(id: string) {
    // let checkRole = this.listUserRole.findIndex((item) => (item.role_id = id));
    // // check xem role có đang được sử dụng bởi người dùng hay không
    // console.log(checkRole);
    // if (checkRole != -1) {
    //   this.message.create(
    //     'warning',
    //     'Không thể xóa vai trò này vì nó đang được sử dụng bởi người dùng'
    //   );
    // } else {
    this.service.deleteGroup(id).subscribe(
      (res) => {
        this.fetchGroups();
        this.message.create('success', 'Đã xóa nhóm người dùng');
      },
      (error) => {}
    );
  }

  // Hàm Hủy tìm kiếm
  reset(): void {
    this.searchValue = '';
    this.isVisibleSearch = false;
    // this.search();
  }

  // Hàm tìm kiếm theo tên người dùng
  searchGroup(): void {
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

  onChangeSwitchRole(role_id: string): void {
    if (this.selectedRoles.indexOf(role_id) === -1) {
      let updatedListUserRoleData = this.listUserRoleData.map((item) => {
        if (item.id === role_id) {
          return { ...item, selected: true };
        } else {
          return item;
        }
      });

      this.selectedRoles.push(role_id);
      this.listUserRoleData = updatedListUserRoleData;
      this.listSelectedRoleData = this.listUserRoleData.filter(
        (item) => item.selected === true
      );
    } else {
      this.listUserRoleData = this.listUserRoleData.map((item) => {
        if (item.id === role_id) {
          return { ...item, selected: false };
        } else {
          return item;
        }
      });
      this.selectedRoles = this.selectedRoles.filter((item) => item != role_id);
      this.listSelectedRoleData = this.listUserRoleData.filter(
        (item) => item.selected === true
      );
    }
  }

  deleteSelectedRole(role_id: string): void {
    this.listUserRoleData = this.listUserRoleData.map((item) => {
      if (item.id === role_id) {
        return { ...item, selected: false };
      } else {
        return item;
      }
    });
    this.selectedRoles = this.selectedRoles.filter((item) => item != role_id);
    this.listSelectedRoleData = this.listUserRoleData.filter(
      (item) => item.selected === true
    );
  }

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
