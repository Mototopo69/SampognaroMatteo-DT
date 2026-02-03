import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryFormComponent } from './delivery-form';

describe('DeliveryForm', () => {
  let component: DeliveryFormComponent;
  let fixture: ComponentFixture<DeliveryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
