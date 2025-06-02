import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxoDialog } from './dialog';

describe('NgxoDialog', () => {
  let component: NgxoDialog;
  let fixture: ComponentFixture<NgxoDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxoDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxoDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
