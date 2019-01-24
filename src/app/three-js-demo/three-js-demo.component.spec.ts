import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeJsDemoComponent } from './three-js-demo.component';

describe('ThreeJsDemoComponent', () => {
  let component: ThreeJsDemoComponent;
  let fixture: ComponentFixture<ThreeJsDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeJsDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeJsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
