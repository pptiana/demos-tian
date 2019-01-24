import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebssshComponent } from './websssh.component';

describe('WebssshComponent', () => {
  let component: WebssshComponent;
  let fixture: ComponentFixture<WebssshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebssshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebssshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
