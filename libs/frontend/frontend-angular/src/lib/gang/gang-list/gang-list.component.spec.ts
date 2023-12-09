import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GangListComponent } from './gang-list.component';

describe('GangListComponent', () => {
  let component: GangListComponent;
  let fixture: ComponentFixture<GangListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GangListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GangListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
