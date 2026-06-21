import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { WineModalEdit } from './wine-modal-edit';

describe('WineModalEdit', () => {
  let component: WineModalEdit;
  let fixture: ComponentFixture<WineModalEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WineModalEdit],
      providers: [
        provideRouter([]),
        MessageService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WineModalEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
