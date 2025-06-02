import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogPage } from './dialog-page';

describe('DialogPage', () => {
  let component: DialogPage;
  let fixture: ComponentFixture<DialogPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
