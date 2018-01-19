import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewShippingComponent } from './new-shipping.component';

describe('NewShippingComponent', () => {
  let component: NewShippingComponent;
  let fixture: ComponentFixture<NewShippingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewShippingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
