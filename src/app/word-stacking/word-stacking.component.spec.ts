import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordStackingComponent } from './word-stacking.component';

describe('WordStackingComponent', () => {
  let component: WordStackingComponent;
  let fixture: ComponentFixture<WordStackingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WordStackingComponent]
    });
    fixture = TestBed.createComponent(WordStackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
