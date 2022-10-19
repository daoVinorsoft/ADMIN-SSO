import { Component } from '@angular/core';
import { SpinnerService } from '../components/spinner/spinner.service';
import { NzPlacementType } from 'ng-zorro-antd/dropdown';
import { Store } from '@ngrx/store';
import { State } from '../store/models/state.model';

import { Observable } from 'rxjs';
import { UserInfor } from '../store/models/user.model'
import { UserModule } from './user/user.module';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent {
  isCollapsed = false;

  constructor(
    private spinner: SpinnerService,
    private store: Store<State>,
  ) {
  }
  
  loading$ = this.spinner.loading$;

  ngOnInit(): void {
    console.log('first store', this.store.select('userState'))
  }



  Position: NzPlacementType[] = ['bottomLeft'];

  logout() {
    localStorage.removeItem('userToken');
    window.location.href = '/auth/login';
  }
}
