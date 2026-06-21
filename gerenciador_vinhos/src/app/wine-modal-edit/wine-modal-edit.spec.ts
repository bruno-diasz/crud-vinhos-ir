import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineModalEdit } from './wine-modal-edit';

describe('WineModalEdit', () => {
  let component: WineModalEdit;
  let fixture: ComponentFixture<WineModalEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WineModalEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(WineModalEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
