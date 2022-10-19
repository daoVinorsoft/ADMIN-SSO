import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewCameraComponent } from './view-camera.component';


describe('SystemTasksComponent', () => {
  let component: ViewCameraComponent;
  let fixture: ComponentFixture<ViewCameraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCameraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
