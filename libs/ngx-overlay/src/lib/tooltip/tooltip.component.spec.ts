import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxoTooltipComponent } from './tooltip.component';

describe('NgxoTooltipComponent', () => {
  let component: NgxoTooltipComponent;
  let fixture: ComponentFixture<NgxoTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxoTooltipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxoTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
