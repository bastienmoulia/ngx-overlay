import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxoTooltip } from './tooltip';

@Component({
  template: `<button ngxoTooltip="My Tooltip">Tooltip</button>`,
  imports: [NgxoTooltip],
})
class TestComponent {}

describe('NgxoTooltip', () => {
  let component: NgxoTooltip;
  let fixture: ComponentFixture<NgxoTooltip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent, NgxoTooltip],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxoTooltip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a ngxo-tooltip tag with the content of the attribute', () => {
    const tooltipElement = fixture.nativeElement.querySelector('ngxo-tooltip');
    expect(tooltipElement).toBeTruthy();
    expect(tooltipElement.textContent).toContain('My Tooltip');
  });
});
