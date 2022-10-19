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
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CameraService } from 'src/app/@core/mock/camera.service';

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
  selector: 'app-view-camera',
  templateUrl: './view-camera.component.html',
  styleUrls: ['./view-camera.component.css'],
})
export class ViewCameraComponent implements OnInit {
  @Input() control: FormControl | undefined;
  listTest = [
    {
        'WAREHOUSE_CODE': "Code camera cấp 1",
        'WAREHOUSE_NAME': "Name camera cấp 1",
        'LIST_CAMERA': 
                    [
                        {
                            'CODE': "CODE camera cấp 2.1",
                            'NAME_CAM': "NAME_CAM camera cấp 2.1",
                            'ID_CAM': "ID_CAM camera cấp 2.1",
                            'STATUS': 0,
                        },
                        {
                            'CODE': "CODE camera cấp 2.2",
                            'NAME_CAM': "NAME_CAM camera cấp 2.2",
                            'ID_CAM': "ID_CAM camera cấp 2.2",
                            'STATUS': 'On',
                        }
                    ]
    },
    {
      'WAREHOUSE_CODE': "Code camera cấp 2",
      'WAREHOUSE_NAME': "Name camera cấp 2",
      'LIST_CAMERA':  []
  },
]


  listCameras: any;
  timeMer = '17:13:30';
  defaultOpenValue = new Date();
  date = null;
  isShowCamera: any;
  isShowHeader: any;
  formDataParamSort!: FormGroup;
  constructor(
    private i18n: NzI18nService,
    private cameraService: CameraService,
    private fb: FormBuilder,
  ) { 
    this.getListCameraByInfo()
  }
  ngOnInit(): void {
    console.log('first time:', this.timeMer)
    this.i18n.setLocale(vi_VN);
    this.formDataParamSort = this.fb.group({ 
      GROUP_CAMERA: ['a'],
      EMAIL: [null, [Validators.required]],
      EDIT_TIME: [null, [Validators.required]],
      USERNAME: [null, [Validators.required]],
      DATE_JOINED: [null, [Validators.required]],
     })
  }

  // ---------------------------Khai báo biến----------------------------------
  // Các biến liên quan đến form
  logTimer(time: Date): void {
    console.log(time && time.toTimeString());
  }

  getListCameraByInfo() {
    this.cameraService.getListCameraLevelByUser().subscribe(
      (res) => {
        this.listCameras = res
        // this.listCameras = this.listTest
      },
      (error) => {
        console.log('first error getListCameraByInfoCamera', error )
      }
    );

  }

  submitForm(): void {
    console.log('submit');
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  renderCamera(item: any) {
    this.isShowCamera = item
    console.log('renderCamera: ', this.isShowCamera);
  }

  // handle sort camera 
  openSortCamera(key: any): void {
    console.log('first openSortCamera', key)
    this.isShowHeader = key
    console.log('first this.isShowHeader', this.isShowHeader)
  }

  handleSort(): void {
    console.log('first handleSort')
    
  }

}
