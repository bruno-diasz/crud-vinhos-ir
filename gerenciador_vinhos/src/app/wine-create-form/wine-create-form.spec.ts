import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { WineCreateForm } from './wine-create-form';

describe('WineCreateForm', () => {
  let component: WineCreateForm;
  let fixture: ComponentFixture<WineCreateForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WineCreateForm],
      providers: [provideRouter([]), MessageService]
    }).compileComponents();

    fixture = TestBed.createComponent(WineCreateForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
