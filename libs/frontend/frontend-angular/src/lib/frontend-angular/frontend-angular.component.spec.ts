import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrontendAngularComponent } from './frontend-angular.component';

describe('FrontendAngularComponent', () => {
  let component: FrontendAngularComponent;
  let fixture: ComponentFixture<FrontendAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontendAngularComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FrontendAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
