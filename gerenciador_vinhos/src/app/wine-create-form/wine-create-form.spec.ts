import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineCreateForm } from './wine-create-form';

describe('WineCreateForm', () => {
  let component: WineCreateForm;
  let fixture: ComponentFixture<WineCreateForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WineCreateForm],
    }).compileComponents();

    fixture = TestBed.createComponent(WineCreateForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
