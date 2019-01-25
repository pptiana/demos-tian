import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleClockComponent } from './simple-clock.component';

describe('SimpleClockComponent', () => {
  let component: SimpleClockComponent;
  let fixture: ComponentFixture<SimpleClockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleClockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
