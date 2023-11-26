import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MotorcycleEditComponent } from './motorcycle-edit.component';

describe('MotorcycleEditComponent', () => {
  let component: MotorcycleEditComponent;
  let fixture: ComponentFixture<MotorcycleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotorcycleEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MotorcycleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
