import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardBodyComponent } from './board-body.component';

describe('BoardBodyComponent', () => {
  let component: BoardBodyComponent;
  let fixture: ComponentFixture<BoardBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
