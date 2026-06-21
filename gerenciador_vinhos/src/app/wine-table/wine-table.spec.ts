import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineTable } from './wine-table';

describe('WineTable', () => {
  let component: WineTable;
  let fixture: ComponentFixture<WineTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WineTable],
    }).compileComponents();

    fixture = TestBed.createComponent(WineTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
