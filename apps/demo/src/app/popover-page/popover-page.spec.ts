import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverPage } from './popover-page';

describe('PopoverPage', () => {
  let component: PopoverPage;
  let fixture: ComponentFixture<PopoverPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopoverPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
