import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MotorcycleDetailComponent } from './motorcycle-detail.component';

describe('MotorcycleDetailComponent', () => {
  let component: MotorcycleDetailComponent;
  let fixture: ComponentFixture<MotorcycleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MotorcycleDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MotorcycleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
