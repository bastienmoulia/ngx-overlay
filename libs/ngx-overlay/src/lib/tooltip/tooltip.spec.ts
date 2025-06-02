import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxoTooltip } from './tooltip';

describe('NgxoTooltip', () => {
  let component: NgxoTooltip;
  let fixture: ComponentFixture<NgxoTooltip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxoTooltip],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxoTooltip);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('interestId', 'myInterestId');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
