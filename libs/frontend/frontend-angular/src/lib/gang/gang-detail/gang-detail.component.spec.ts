import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GangDetailComponent } from './gang-detail.component';

describe('GangDetailComponent', () => {
  let component: GangDetailComponent;
  let fixture: ComponentFixture<GangDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GangDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GangDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
