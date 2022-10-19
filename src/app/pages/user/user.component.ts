import { Component, Input, OnInit } from '@angular/core';
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
import { RoleData } from '../../@core/data/role';
import { GroupData } from '../../@core/data/group';
import { isTemplateRef } from 'ng-zorro-antd/core/util';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { AuthService } from 'src/app/@core/mock/auth.service';
import { UserService } from 'src/app/@core/mock/user.service';
import { Router } from '@angular/router';

interface DataItem {
  id: string;
  fullname: string;
  address: string;
  email: string;
  username: string;
  birthday: string;
  phone_number: string;
  createdAt: string;
  enabled: boolean;
}

interface ColumnItem {
  name: string;
  hidden: boolean;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<DataItem> | null;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @Input() control: FormControl | undefined;
  timeMer = '17:13:30';
  defaultOpenValue = new Date();
  date = null;
  formDataChangePass!: FormGroup;
  passwordVisible = false;
  constructor(
    private msg: NzMessageService,
    private i18n: NzI18nService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private service: UserData,
    private userService: UserService,
    private serviceRole: RoleData,
    private serviceGroup: GroupData,
    private serviceUserGroup: UserGroupData,
    private router: Router
  ) {
    this.getUserInfo();
  }

  // ---------------------------Khai báo biến----------------------------------

  // CÁC BIẾN LIÊN QUAN ĐẾN FORM
  formDataUser!: FormGroup;
  formEdit!: FormGroup;
  formAdd!: FormGroup;
  formAddGroup!: FormGroup;
  formAddRole!: FormGroup;
  pageSize: number = 15;
  pageIndex: number = 0;
  toTalData: number = 0;

  // CÁC BIẾN LIST DATA
  userInfo: any[] = [];
  listSelectedRole: any[] = [];
  listSelectedRoleData: any[] = [];
  listGroupUser: string[] = [];

  listGroup: any[] = [];
  listRole: any[] = [];
  listOfData: DataItem[] = [];
  listOfDisplayData: DataItem[] = [];
  selectedRoles: any[] = [];
  switchValue = false;

  listColumnGroup: any[] = [
    {
      name: 'STT',
    },
    {
      name: 'Tên nhóm',
    },
    {
      name: 'Trạng thái',
    },
  ];

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

  listUserGroupData: any[] = [
    { id: '1', name: 'Nhóm 1', description: 'Mô tả 1', active: true },
    { id: '2', name: 'Nhóm 2', description: 'Mô tả 2', active: true },
    { id: '3', name: 'Nhóm 3', description: 'Mô tả 3', active: true },
  ];

  listUserRoleData: any[] = [];

  columnsDisplay: ColumnItem[] = [
    {
      name: 'STT',
      hidden: false,
      listOfFilter: [],
      filterFn: null,
    },
    {
      name: 'Tên người dùng',
      hidden: false,
      listOfFilter: [],
      filterFn: null,
    },
    {
      name: 'Ngày sinh',
      hidden: false,
      listOfFilter: [],
      filterFn: null,
    },
    {
      name: 'SĐT',
      hidden: false,
      listOfFilter: [],
      filterFn: null,
    },
    {
      name: 'Địa chỉ',
      hidden: true,
      listOfFilter: [],
      filterFn: null,
    },
    {
      name: 'Email',
      hidden: true,
      listOfFilter: [],
      filterFn: null,
    },
    {
      name: 'Tên đăng nhập',
      hidden: false,
      listOfFilter: [],
      filterFn: null,
    },
    {
      name: 'Ngày tạo',
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
        list.some((enabled) => item.enabled === enabled),
    },
  ];
  listColumnsDisplay = [...this.columnsDisplay];

  // CÁC BIẾN LIÊN QUAN ĐẾN EVENT SHOW/HIDDEN MODAL
  isVisible = false;
  isVisibleDisplay = false;
  isVisibleSearch = false;
  isOkLoading = false;
  isShowSearch = false;
  isVisibleAdded = false;
  isVisibleAddGroup = false;
  isOkLoadingAdded = false;
  tab = 1;

  // CÁC BIẾN LIÊN QUAN ĐẾN DATA
  id = '';
  submitTime = '';
  enabledStatus = true;
  searchValue = '';
  unitText = '';
  positionText = '';
  visible = false;
  dateFormat = 'dd/MM/yyyy';

  // CÁC BIẾN REGEX
  phoneNumberRegex = /((09|03|07|08|05)+([0-9]{8})\b)/g;

  emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // https://www.regextester.com/93886

  //  ---------------------------Khai báo hàm----------------------------------

  // CÁC HÀM INIT
  ngOnInit(): void {
    this.formAdd = this.initFormAdd();
    this.formEdit = this.initFormEdit();
    this.formAddGroup = this.initFormAddGroup();
    this.formDataUser = this.fb.group({ 
      PHONE: [null, [Validators.required]],
      EMAIL: [null, [Validators.required]],
      EDIT_TIME: [null, [Validators.required]],
      USERNAME: [null, [Validators.required]],
      DATE_JOINED: [null, [Validators.required]],
     })
    
    this.formDataChangePass = this.fb.group({
      old_password: [null, [Validators.required]],
      new_password: [null, [Validators.required]],
      rePassword: [null, [Validators.required]],
    })
  }

  // CÁC HÀM VALIDATOR
  emailValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (!this.emailRegex.test(control.value)) {
      return { validated: true, error: true };
    }
    return {};
  };

  phoneNumberValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (!this.phoneNumberRegex.test(control.value)) {
      return { validated: true, error: true };
    }
    return {};
  };

  // CÁC KHỞI TẠO FORM
  initFormAdd = (): FormGroup => {
    return this.fb.group({
      fullname: [null, [Validators.required]],
      address: [null, [Validators.required]],
      email: [
        '',
        Validators.compose([Validators.required, this.emailValidator]),
      ],
      username: [null, [Validators.required]],
      birthday: ['', [Validators.required]],
      phone_number: [
        null,
        Validators.compose([Validators.required, this.phoneNumberValidator]),
      ],
      createdAt: [
        { value: new Date(), disabled: 'true' },
        [Validators.required],
      ],
      enabled: [true, Validators.required],
    });
  };

  initFormEdit = (): FormGroup => {
    return this.fb.group({
      fullname: [null, [Validators.required]],
      address: [null, [Validators.required]],
      email: [
        '',
        Validators.compose([Validators.required, this.emailValidator]),
      ],
      username: [null, [Validators.required]],
      birthday: ['', [Validators.required]],
      phone_number: [
        null,
        Validators.compose([Validators.required, this.phoneNumberValidator]),
      ],
      createdAt: [{ value: '', disabled: 'true' }],
      enabled: ['', Validators.required],
    });
  };

  initFormAddGroup = (): FormGroup => {
    return this.fb.group({
      user_id: [{ value: null, disabled: 'true' }, [Validators.required]],
      group_id: [null, [Validators.required]],
    });
  };

  // CÁC HÀM XỬ LÝ XỬ LÝ EVENT SHOW/HIDDEN FORM
  showFilter() {
    this.isShowSearch = !this.isShowSearch;
  }

  showDisplay() {
    this.isVisibleDisplay = !this.isVisibleDisplay;
  }

  showTab(i: number) {
    this.tab = i;
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
    // this.formAdd.reset();
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
    this.listGroupUser = [
      { id: '1', name: 'Nhóm 1', description: 'Mô tả 1', active: true },
      { id: '2', name: 'Nhóm 2', description: 'Mô tả 2', active: true },
    ].map((item) => item.id);

    this.service.fetchUser(id).subscribe((res) => {
      this.formEdit.setValue({
        fullname: res.fullname,
        address: res.address,
        email: res.email,
        username: res.username,
        birthday: new Date(res.birthday),
        phone_number: res.phone_number,
        createdAt: new Date(res.createdAt),
        enabled: res.enabled,
      });
      this.enabledStatus = res.enabled;

      this.isVisible = true;
    });
  }

  handleCancelDisplayModal(): void {
    this.isVisibleDisplay = false;
    this.listColumnsDisplay = this.columnsDisplay.filter(
      (item) => item.hidden === false
    );
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isVisibleAdded = false;
    this.isVisibleAddGroup = false;
    this.formAdd = this.initFormAdd();
    this.formEdit = this.initFormEdit();
    this.formAddGroup = this.initFormAddGroup();
  }

  // CÁC HÀM FETCH DATA
  fetchUsers() {
    this.service.fetchUsers().subscribe((res: any) => {
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

  fetchGroups() {
    this.serviceGroup.fetchGroups().subscribe((res: any) => {
      this.listGroup = res;
    });
  }

  fetchUserGroups() {
    this.serviceUserGroup.fetchUserGroups().subscribe((res: any) => {
      this.toTalData = res.length;
      this.listOfData = res;
      this.listOfDisplayData = [...res];
    });
  }

  // CÁC HÀM XỬ LÝ SUBMIT FORM
  AddUser(): void {
    this.isOkLoadingAdded = true;
    this.enabledStatus = true;

    if (this.formAdd.valid) {
      const formatData = {
        ...this.formAdd.value,
        createdAt: new Date().toDateString(),
        enabled: this.enabledStatus,
        birthday: this.formAdd.value.birthday.toDateString(),
      };

      this.service.createUser(formatData).subscribe(
        (res) => {
          console.log(res);
          this.fetchUsers();
          this.message.create(
            'success',
            'Thêm thông tin người dùng thành công'
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

  handleEditUser(): void {
    this.isOkLoading = true;

    console.log('jịidjịdjsdjsdjịđị',this.formDataUser.value);

    if (this.formDataUser.valid) {
      const formatData = {
        ...this.formDataUser.value,
      };

      const dataUser = {
        ...formatData,
        id: this.id,
        enabled: this.enabledStatus,
      };
      this.userService.editUserInfo(formatData).subscribe((res) => {
        console.log(res);
        // this.fetchUsers();
        this.message.create(
          'success',
          'Cập nhật thông tin người dùng thành công'
        );
        // this.isVisible = false;
        // this.isOkLoading = false;
        // this.formDataUser.reset();
      });
    } else {
      this.isOkLoading = false;
      Object.values(this.formDataUser.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  AddUserToGroup(): void {
    if (this.formAddGroup.valid) {
      this.message.create('success', 'Đã thêm người dùng vào nhóm');
      console.log(this.formAddGroup.value);
    }
  }

  AssignRole(): void {
    this.message.create('success', 'Đã cấp quyền cho người dùng này');
  }

  deleteUser(id: string) {
    this.service.deleteUser(id).subscribe(
      (res) => {
        this.fetchUsers();
        this.message.create('success', 'Đã xóa người dùng');
      },
      (error) => { }
    );
  }

  reset(): void {
    this.searchValue = '';
    this.isVisibleSearch = false;
    // this.search();
  }

  // Hàm tìm kiếm theo tên người dùng
  searchUser(): void {
    this.isVisibleSearch = false;
    this.listOfDisplayData = this.listOfData.filter((item: DataItem) => {
      if (item.fullname !== null) {
        return item.fullname.indexOf(this.searchValue) !== -1;
      } else {
        return false;
      }
    });
  }

  // CÁC HÀM XỬ LÝ EVENT ONCHANGE VỚI INPUT, SELECT, SWITCH, CHECKBOX ...
  handleSwitchEnabled(): void {
    this.enabledStatus = !this.enabledStatus;
  }

  onChangeSelectGroup(selectedGroup: []) {
    let listGroup = this.listGroup;
    let updatedListUserGroupData: any[] = [];
    listGroup.forEach((item) => {
      if (selectedGroup.every((id) => id != item.id) === false) {
        updatedListUserGroupData.push(item);
      } else {
      }
    });
    this.listUserGroupData = updatedListUserGroupData;
    this.listGroupUser = selectedGroup;
  }

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

  deleteSelectedGroup(group_id: string): void {
    console.log(group_id);
    let updatedListUserGroupData = this.listUserGroupData.filter(
      (item) => item.id != group_id
    );
    console.log(updatedListUserGroupData);
    this.listUserGroupData = updatedListUserGroupData;

    this.listGroupUser = this.listUserGroupData.map((item) => item.id);
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

  onChangeUnit(event: any) {
    this.unitText = event;
  }

  onChangePosition(event: any) {
    this.positionText = event;
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

  onChangeIndexPage(event: any) { }

  // Hàm xử lý convert any to string
  convertTime(dateString: string): string {
    let date = new Date(dateString);

    return date.toLocaleDateString('en-GB'); // format dateString to '25/03/2015'
  }

  convertEnabledToString(enabled: boolean): string {
    return enabled === true ? 'Hoạt động' : 'Khóa';
  }


// new code
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  logTimer(time: Date): void {
    console.log(time && time.toTimeString());
  }

  submitFormForgot(value: any): void {
    console.log('%cuser.component.ts line:641 ', 'color: #007acc;', this.formDataChangePass.value);
    this.userService.changePass(this.formDataChangePass.value).subscribe(
      (res) => {
        this.message.create('success', 'Cập nhật thông tin người dùng thành công. Vui lòng đăng nhập lại để tiếp tục sử dụng dịch vụ');
        setTimeout(() => {
          localStorage.removeItem('userToken');
          this.router.navigate(['/']);
        }, 3000);
      },
      (error) => {
          console.log('%cuser.component.ts line:657 error', 'color: #007acc;', error);
          this.message.create('error', 'Đã xảy ra lỗi, vui lòng thử lại!');
      }
    );
    this.formDataChangePass.reset();
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
  }

  getUserInfo() {
    this.userService.getUserInfo().subscribe((res: any) => {
      this.userInfo = [...res]
      console.log('first user infor:', this.userInfo[0])
      this.formDataUser.patchValue(this.userInfo[0])
      
      console.log('this.formDataUser', this.formDataUser.value)
    });
  }
}
