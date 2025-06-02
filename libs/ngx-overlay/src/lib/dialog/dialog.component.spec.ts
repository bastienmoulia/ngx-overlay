import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxoDialogComponent } from './dialog.component';

describe('NgxoDialogComponent', () => {
  let component: NgxoDialogComponent;
  let fixture: ComponentFixture<NgxoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxoDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
