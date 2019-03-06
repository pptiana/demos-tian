import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CronSelectComponent } from './cron-select.component';

describe('CronSelectComponent', () => {
  let component: CronSelectComponent;
  let fixture: ComponentFixture<CronSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CronSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CronSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
