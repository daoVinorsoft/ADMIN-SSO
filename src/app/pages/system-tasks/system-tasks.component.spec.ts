import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemTasksComponent } from './system-tasks.component';

describe('SystemTasksComponent', () => {
  let component: SystemTasksComponent;
  let fixture: ComponentFixture<SystemTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
