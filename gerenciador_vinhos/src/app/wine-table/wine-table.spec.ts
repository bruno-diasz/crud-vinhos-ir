import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { MessageService, ConfirmationService } from 'primeng/api';
import { WineTable } from './wine-table';

describe('WineTable', () => {
  let component: WineTable;
  let fixture: ComponentFixture<WineTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WineTable],
      providers: [provideRouter([]), provideHttpClient(), MessageService, ConfirmationService]
    }).compileComponents();

    fixture = TestBed.createComponent(WineTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
