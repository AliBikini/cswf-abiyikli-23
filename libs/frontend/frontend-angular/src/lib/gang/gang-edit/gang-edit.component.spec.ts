import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GangEditComponent } from './gang-edit.component';

describe('GangEditComponent', () => {
  let component: GangEditComponent;
  let fixture: ComponentFixture<GangEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GangEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GangEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
